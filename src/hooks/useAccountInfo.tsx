import { useState, useEffect, useCallback } from 'react';
import { useMsal } from "@azure/msal-react";
import { AccountInfo } from "@azure/msal-browser";

interface ExtendedAccountInfo extends AccountInfo {
  photoUrl?: string;
}

export const useAccountInfo = () => {
  const { instance, accounts } = useMsal();
  const [accountInfo, setAccountInfo] = useState<ExtendedAccountInfo | null>(null);

  const fetchUserPhoto = useCallback(async (account: AccountInfo) => {
    const request = {
      scopes: ["User.Read"],
      account: account,
    };

    try {
      const response = await instance.acquireTokenSilent(request);
      const graphResponse = await fetch("https://graph.microsoft.com/v1.0/me/photo/$value", {
        headers: {
          Authorization: `Bearer ${response.accessToken}`,
        },
      });

      if (graphResponse.ok) {
        const blob = await graphResponse.blob();
        const photoUrl = URL.createObjectURL(blob);
        return photoUrl;
      }
    } catch (error) {
      console.error("Error fetching user photo:", error);
    }
    return null;
  }, [instance]);

  useEffect(() => {
    const updateAccountInfo = async () => {
      if (accounts.length > 0) {
        const account = accounts[0];
        const photoUrl = await fetchUserPhoto(account);
        setAccountInfo({ ...account, photoUrl: photoUrl || undefined });
      } else {
        setAccountInfo(null);
      }
    };

    updateAccountInfo();
  }, [accounts, fetchUserPhoto]);

  const refreshAccountInfo = useCallback(async () => {
    if (accountInfo) {
      const photoUrl = await fetchUserPhoto(accountInfo);
      setAccountInfo(prev => prev ? { ...prev, photoUrl: photoUrl || undefined } : null);
    }
  }, [accountInfo, fetchUserPhoto]);

  return { accountInfo, refreshAccountInfo };
};