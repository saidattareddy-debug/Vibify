import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App";

// NOTE: @tanstack/react-query was previously wired up here but never actually
// used anywhere in src/. Removing it saves ~28KB (decoded) from the homepage
// JS payload. Add it back wrapped around <App /> only if you adopt useQuery.

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const rootElement = document.getElementById("root");

// react-snap prerenders static HTML; hydrate it when present, otherwise mount fresh.
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
