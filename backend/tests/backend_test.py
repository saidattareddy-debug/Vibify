"""Backend API tests for Vibify marketing site.

Covers: /api/contact, /api/booking, /api/newsletter, /api/submissions, /api/stats
"""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://vibify-bold.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="session")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ------------- Health -------------
class TestHealth:
    def test_root(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert "message" in data


# ------------- Contact -------------
class TestContact:
    def test_create_contact_valid(self, client):
        payload = {
            "name": "TEST_Contact User",
            "email": f"test_contact_{uuid.uuid4().hex[:8]}@example.com",
            "company": "TEST Co",
            "message": "Hello, please reach out.",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["type"] == "contact"
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["company"] == payload["company"]
        assert data["message"] == payload["message"]
        assert "id" in data and isinstance(data["id"], str)
        assert "created_at" in data

    def test_contact_invalid_email_422(self, client):
        r = client.post(f"{API}/contact", json={
            "name": "TEST", "email": "not-an-email", "message": "hi"
        })
        assert r.status_code == 422

    def test_contact_missing_fields_422(self, client):
        r = client.post(f"{API}/contact", json={"email": "a@b.com"})
        assert r.status_code == 422


# ------------- Booking -------------
class TestBooking:
    def test_create_booking_valid(self, client):
        payload = {
            "name": "TEST_Booking",
            "email": f"test_book_{uuid.uuid4().hex[:8]}@example.com",
            "company": "TEST",
            "goal": "Launch a campaign in Q1",
        }
        r = client.post(f"{API}/booking", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["type"] == "booking"
        assert data["goal"] == payload["goal"]
        assert data["email"] == payload["email"]

    def test_booking_invalid_email_422(self, client):
        r = client.post(f"{API}/booking", json={
            "name": "TEST", "email": "bad-email", "goal": "x"
        })
        assert r.status_code == 422


# ------------- Newsletter -------------
class TestNewsletter:
    def test_newsletter_subscribe_and_idempotent(self, client):
        email = f"test_news_{uuid.uuid4().hex[:8]}@example.com"
        r1 = client.post(f"{API}/newsletter", json={"email": email})
        assert r1.status_code == 200, r1.text
        d1 = r1.json()
        assert d1["type"] == "newsletter"
        assert d1["email"] == email
        first_id = d1["id"]

        # second call - should not duplicate
        r2 = client.post(f"{API}/newsletter", json={"email": email})
        assert r2.status_code == 200
        d2 = r2.json()
        assert d2["email"] == email
        assert d2["id"] == first_id, "Newsletter not idempotent: new id returned"

        # verify only one document exists
        rl = client.get(f"{API}/submissions", params={"type": "newsletter"})
        assert rl.status_code == 200
        count = sum(1 for x in rl.json() if x["email"] == email)
        assert count == 1, f"Expected 1 newsletter row for {email}, got {count}"

    def test_newsletter_invalid_email_422(self, client):
        r = client.post(f"{API}/newsletter", json={"email": "invalid"})
        assert r.status_code == 422


# ------------- Submissions list / Stats -------------
class TestSubmissionsAndStats:
    def test_list_and_filter(self, client):
        # seed one of each
        em1 = f"test_l_c_{uuid.uuid4().hex[:6]}@example.com"
        em2 = f"test_l_b_{uuid.uuid4().hex[:6]}@example.com"
        em3 = f"test_l_n_{uuid.uuid4().hex[:6]}@example.com"
        client.post(f"{API}/contact", json={"name": "TEST", "email": em1, "message": "m"})
        client.post(f"{API}/booking", json={"name": "TEST", "email": em2, "goal": "g"})
        client.post(f"{API}/newsletter", json={"email": em3})

        r_all = client.get(f"{API}/submissions")
        assert r_all.status_code == 200
        all_items = r_all.json()
        assert isinstance(all_items, list)
        assert len(all_items) >= 3

        r_c = client.get(f"{API}/submissions", params={"type": "contact"})
        assert r_c.status_code == 200
        contacts = r_c.json()
        assert all(x["type"] == "contact" for x in contacts)
        assert any(x["email"] == em1 for x in contacts)

        r_b = client.get(f"{API}/submissions", params={"type": "booking"})
        assert all(x["type"] == "booking" for x in r_b.json())

        r_n = client.get(f"{API}/submissions", params={"type": "newsletter"})
        assert all(x["type"] == "newsletter" for x in r_n.json())

    def test_stats(self, client):
        r = client.get(f"{API}/stats")
        assert r.status_code == 200
        data = r.json()
        for key in ("total", "contact", "booking", "newsletter"):
            assert key in data
            assert isinstance(data[key], int)
        assert data["total"] >= data["contact"] + data["booking"] + data["newsletter"] - 0
        # total must equal sum (no other types)
        assert data["total"] == data["contact"] + data["booking"] + data["newsletter"]
