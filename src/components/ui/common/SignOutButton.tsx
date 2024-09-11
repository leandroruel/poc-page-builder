import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { Button, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

export const SignOutButton = () => {
  const { instance } = useMsal();
  const [visible, setVisible] = useState(false);

  const handleLogout = (logoutType: string) => {
    setVisible(false);

    if (logoutType === "popup") {
      instance.logoutPopup({
        mainWindowRedirectUri: "/",
      });
    } else if (logoutType === "redirect") {
      instance.logoutRedirect();
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="logoutPopup" onClick={() => handleLogout("popup")}>
        Logout using Popup
      </Menu.Item>
      <Menu.Item key="logoutRedirect" onClick={() => handleLogout("redirect")}>
        Logout using Redirect
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
        <Button icon={<UserOutlined />} shape="circle" />
      </Dropdown>
    </div>
  );
};
