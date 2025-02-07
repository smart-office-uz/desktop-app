import ReactDOM from "react-dom/client";

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://f8119f98d7fa95eca8e1202033239387@o4508652864864256.ingest.de.sentry.io/4508652868862032",
});

// providers
import Providers from "./app/providers";

// components
import { Toaster } from "./app/components/sonner";

// styles
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <>
    <Providers />
    <Toaster />
  </>,
  // </React.StrictMode>,
);
