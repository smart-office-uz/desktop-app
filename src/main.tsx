import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";

// providers
import Providers from "./app/providers";

// components
import { Toaster } from "./app/components/sonner";

// styles
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <ErrorBoundary fallback={<div>Something went wrong!</div>}>
    <Providers />
    <Toaster />
  </ErrorBoundary>
  // </React.StrictMode>,
);
