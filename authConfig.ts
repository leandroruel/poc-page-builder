// msalConfig.ts
import { Configuration, PopupRequest } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_CLIENT_ID,
    authority: import.meta.env.VITE_AUTHORITY,
    redirectUri: import.meta.env.VITE_REDIRECT_URI || "http://localhost:5173", // URI para redirecionamento após login
    postLogoutRedirectUri: import.meta.env.VITE_POST_LOGOUT_REDIRECT_URI || "http://localhost:5173", // URI após logout
  },
  cache: {
    cacheLocation: "sessionStorage", // ou "localStorage" se preferir
    storeAuthStateInCookie: false,
  },
};

export const loginRequest: PopupRequest = {
  scopes: ["User.Read", "email", "profile"],
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};

console.log(msalConfig, import.meta.env)
// MSAL1.0 code
// import { Configuration, PopupRequest } from "@azure/msal-browser";

// // Config object to be passed to Msal on creation
// export const msalConfig: Configuration = {
//   auth: {
//     clientId: import.meta.env.REACT_APP_CLIENT_ID,
//     authority: import.meta.env.REACT_APP_AUTHORITY,
//     redirectUri: import.meta.env.REACT_APP_REDIRECT_URI,
//     postLogoutRedirectUri: import.meta.env.REACT_APP_POST_LOGOUT_REDIRECT_URI,
//   },
// } as any;

// // Add here scopes for id token to be used at MS Identity Platform endpoints.
// export const loginRequest: PopupRequest = {
//   scopes: ["email", "profile", "User.Read"],
// };

// // Adicione aqui os endpoints para os serviços da API do MS Graph que você deseja usar.
// export const graphConfig = {
//   graphMeEndpoint: import.meta.env.REACT_APP_GRAPH_ME_ENDPOINT,
// };
