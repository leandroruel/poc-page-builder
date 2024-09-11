import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { Button, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { loginRequest } from "../../../../authConfig";

export const SignInButton = () => {
  const { instance } = useMsal();
  const [visible, setVisible] = useState(false);

  const handleLogin = (loginType: string) => {
    setVisible(false);

    if (loginType === "popup") {
      instance.loginPopup(loginRequest);
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="loginPopup" onClick={() => handleLogin("popup")}>
        Sign in using Popup
      </Menu.Item>
      <Menu.Item key="loginRedirect" onClick={() => handleLogin("redirect")}>
        Sign in using Redirect
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        visible={visible}
        onVisibleChange={(flag) => setVisible(flag)}
      >
        <Button type="primary" onClick={(e) => e.preventDefault()}>
          Login <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};
