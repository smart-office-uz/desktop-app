import ReactDOM from "react-dom/client";

import * as Sentry from "@sentry/react";
import posthog from "posthog-js";

posthog.init("phc_P0XzDRzY68en9vVIFZdOp1PVAU7c85tIGESiP2mu89p", {
  api_host: "https://us.i.posthog.com",
  person_profiles: "always", // or 'always' to create profiles for anonymous users as well
});

Sentry.init({
  dsn: "https://f8119f98d7fa95eca8e1202033239387@o4508652864864256.ingest.de.sentry.io/4508652868862032",
  integrations: [Sentry.replayIntegration()],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  tracePropagationTargets: ["https://smart-office.uz/"],
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
