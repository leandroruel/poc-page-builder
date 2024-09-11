import { Button, Layout } from "antd";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { Link } from "react-router-dom";
import SignInSignOutButton from "@/components/ui/common/SignInSignOutButton";

export function Home() {
  return (
    <>
      <AuthenticatedTemplate>
        <Layout>
          welcome
          <Link to={"/profile"}>button</Link>
        </Layout>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <div>example</div>
        <SignInSignOutButton />
      </UnauthenticatedTemplate>
    </>
  );
}
