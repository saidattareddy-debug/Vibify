import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

export const submitContact = (data) => api.post("/contact", data).then((r) => r.data);
export const submitBooking = (data) => api.post("/booking", data).then((r) => r.data);
export const submitNewsletter = (email) => api.post("/newsletter", { email }).then((r) => r.data);
export const getSubmissions = (type) =>
  api.get("/submissions", { params: type ? { type } : {} }).then((r) => r.data);
export const getStats = () => api.get("/stats").then((r) => r.data);
