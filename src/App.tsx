import React from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "../authConfig";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const msalInstance = new PublicClientApplication(msalConfig);
const queryClient = new QueryClient();

const App: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <MsalProvider instance={msalInstance}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </MsalProvider>
  );
};

export default App;