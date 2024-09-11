import { useMsal, useAccount } from "@azure/msal-react";
import { InteractionStatus, InteractionRequiredAuthError } from "@azure/msal-browser";
import { useCallback } from "react";
import { loginRequest } from "../../authConfig";

export const useAuth = () => {
  const { instance, inProgress, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});

  const login = useCallback(async () => {
    if (inProgress === InteractionStatus.None) {
      try {
        await instance.loginPopup(loginRequest);
      } catch (error) {
        console.error("Login failed", error);
      }
    }
  }, [instance, inProgress]);

  const logout = useCallback(() => {
    instance.logoutPopup();
  }, [instance]);

  const getToken = useCallback(async () => {
    if (!account) {
      throw new Error("No account logged in");
    }

    const request = {
      ...loginRequest,
      account: account
    };

    try {
      return await instance.acquireTokenSilent(request);
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        return instance.acquireTokenPopup(request);
      }
      throw error;
    }
  }, [instance, account]);

  return { isAuthenticated: !!account, login, logout, getToken };
};