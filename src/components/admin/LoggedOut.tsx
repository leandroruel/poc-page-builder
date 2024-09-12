import { Result, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function LoggedOut() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Result
        icon={<LogoutOutlined style={{ color: "#1890ff" }} />}
        title="Você foi desconectado"
        subTitle="Obrigado por usar nossa aplicação. Esperamos vê-lo novamente em breve!"
        extra={
          <Link to="/">
            <Button type="primary">Voltar para o Login</Button>
          </Link>
        }
      />
    </div>
  );
}
