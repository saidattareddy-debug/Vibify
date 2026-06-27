# Contact Page And Email Delivery Design

## Goal

Add a dedicated `/contact` page to the frontend and make contact submissions both:

1. send an email notification to the business inbox
2. save the submission in Mongo so the existing admin dashboard continues to work

## Current State

- The frontend currently has a modal contact form used from the landing, about, and service pages.
- The frontend routes currently include `/`, `/about`, `/services/:slug`, and `/admin`.
- The backend currently exposes `/api/contact`, `/api/booking`, `/api/newsletter`, `/api/submissions`, and `/api/stats`.
- Contact submissions are currently stored in Mongo but do not send an email.

## Proposed Architecture

### Frontend

- Add a dedicated `/contact` route in the React router.
- Add a new `Contact` page component that uses the existing site shell:
  - `Navbar`
  - `Footer`
  - `Seo`
- Replace the existing navbar/footer contact links that point to `/#footer` with `/contact`.
- Keep the current modal contact dialog intact unless small internal reuse becomes useful during implementation.

### Backend

- Keep a single contact submission endpoint at `/api/contact`.
- Extend the backend contact flow so one request performs both responsibilities:
  1. send an email notification
  2. save the submission in Mongo
- Keep the stored data shape compatible with the existing `Submission` model so the admin dashboard continues to display contact records without schema changes.

## Data Flow

1. User opens `/contact`.
2. User fills out the form with:
   - name
   - email
   - company
   - message
3. Frontend validates required fields and posts to `/api/contact`.
4. Backend validates the payload.
5. Backend sends an email to the configured inbox.
6. Backend stores the submission in Mongo.
7. Backend returns success.
8. Frontend shows a success state and clears or resets the form.

## Email Delivery Design

The user requested Nodemailer, but the current application backend is FastAPI/Python. To preserve the approved single-endpoint design without introducing a second runtime just for mail delivery, the backend will implement SMTP-based email sending directly in Python.

This keeps the user-facing behavior equivalent to a Nodemailer-backed contact flow:

- the submission sends an email
- the same submission is persisted
- the frontend only makes one request

### Required Environment Variables

- `CONTACT_SMTP_HOST`
- `CONTACT_SMTP_PORT`
- `CONTACT_SMTP_USERNAME`
- `CONTACT_SMTP_PASSWORD`
- `CONTACT_SMTP_FROM`
- `CONTACT_TO_EMAIL`
- `CONTACT_SMTP_USE_TLS`

Optional:

- `CONTACT_REPLY_TO_EMAIL`

## Backend Failure Handling

### Validation failure

- Return `422` from the existing request model validation path.

### Email send failure

- Return an error response.
- Do not save the submission to Mongo.
- Reason: if the email was not delivered, the user should not get a success response that implies the team has been notified.

### Mongo save failure after successful email

- Return an error response indicating the message was emailed but not stored.
- Log this clearly so the issue can be fixed quickly.

### Missing SMTP configuration

- Return a server error with a clear internal log message.
- Frontend should show a user-safe fallback error message such as:
  - "We couldn't send your message right now. Please try again shortly."

## Frontend Page Design

### Route

- Add `/contact`

### Page structure

- Intro/hero block with clear heading and supporting copy
- Main contact form
- Secondary trust/support section, such as:
  - expected response time
  - collaboration note
  - direct email/contact line if desired

### Form behavior

- Reuse the same field structure as the current contact dialog to keep the backend contract stable.
- Show inline validation for required fields.
- Disable submit while request is in flight.
- Show success state after successful submit.
- Show error state if the request fails.

### Navigation updates

- Update `Navbar` contact link from `/#footer` to `/contact`
- Update `Footer` contact link from `/#footer` to `/contact`

## Testing Plan

### Frontend

- Route test for `/contact`
- Form validation behavior
- Successful submission flow
- Error state rendering

### Backend

- `/api/contact` success path
- email failure path
- persistence failure path if practical to test cleanly

### Regression

- Existing admin page still displays contact submissions
- Existing modal contact flow should continue to work if left in place

## Implementation Notes

- Prefer minimal schema changes to avoid disrupting the admin dashboard.
- Keep the existing `/api/contact` contract stable for current callers.
- Avoid introducing a second backend service just for mail delivery.

## Scope Boundaries

Included:

- dedicated contact page
- navigation updates
- email delivery on contact submission
- Mongo persistence on contact submission
- frontend success/error UX

Not included:

- booking email notifications
- newsletter email notifications
- background job/queue infrastructure
- full CRM integration

## Open Decision Already Resolved

- Contact submission should both send an email and save to Mongo.
- A single backend endpoint should own both actions.
