import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import i18n from "./lib/i18n";
import { LocalizationProvider } from "@/context/LocalizationContext";
import { initializeRTLSupport } from "@/lib/rtl";
import App from "./App.tsx";
import "./index.css";

// Initialize RTL support
initializeRTLSupport(i18n.language);

createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18n}>
    <LocalizationProvider>
      <App />
    </LocalizationProvider>
  </I18nextProvider>
);
