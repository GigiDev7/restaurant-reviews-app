import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./FallbackErrorBoundary.tsx";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <AuthContextProvider>
        <ErrorBoundary FallbackComponent={Fallback}>
          <App />
        </ErrorBoundary>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
