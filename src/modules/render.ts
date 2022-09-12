import React from "react";
import { createRoot } from "react-dom/client";

export function render(children: React.ReactNode) {
  const rootEl = document.getElementById("root");
  if (rootEl) {
    createRoot(rootEl).render(children);
  }
}
