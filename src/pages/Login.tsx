// LoginComponent.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Space,
  Divider,
  message,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  GithubOutlined,
  TwitterOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { useMsal, useAccount } from "@azure/msal-react";
import { loginRequest } from "../../authConfig"; // Assegure-se de importar isso

const { Content } = Layout;
const { Title, Text } = Typography;

export default function LoginComponent() {
  const [loading, setLoading] = useState(false);
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0]);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem('msal.interaction.status') === 'interaction_in_progress') {
      console.log("Clearing previous interaction status from session storage.");
      sessionStorage.removeItem('msal.interaction.status');
    }
  }, []);

  // Remova o login automático para evitar conflitos
  useEffect(() => {
    if (account) {
      console.log("Usuário já está logado.");
      navigate("/dashboard"); // Opcional: redirecione se já estiver logado
    }
  }, [account, navigate]);

  const handleLogin = async (values: any) => {
    setLoading(true);
    setError(null);

    try {
      // Verifique se não há outra interação em progresso
      if (inProgress === "none") {
        const result = await instance.loginPopup({
          ...loginRequest,
          loginHint: values.username, // Opcional: preenche o hint do login
        });

        console.log("Login bem-sucedido", result);
        message.success("Login realizado com sucesso!");
        navigate("/dashboard"); // Redirecione após o login bem-sucedido
      } else {
        message.warning("Já existe uma interação de login em andamento. Por favor, aguarde.");
      }
    } catch (error: any) {
      console.error("Falha no login", error);
      if (error.errorCode === "user_cancelled") {
        setError("O login foi cancelado. Por favor, tente novamente.");
      } else if (error.errorCode === "access_denied") {
        setError("Acesso negado. Verifique suas credenciais e tente novamente.");
      } else {
        setError("Ocorreu um erro durante o login. Por favor, tente novamente.");
      }
      message.error(error.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: "400px", padding: "20px" }}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div style={{ textAlign: "center" }}>
              <Title level={2}>Bem-vindo de Volta</Title>
              <Text type="secondary">Por favor, faça login na sua conta</Text>
            </div>

            <Form
              name="normal_login"
              initialValues={{ remember: true }}
              onFinish={handleLogin}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Por favor, insira seu Nome de Usuário!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Nome de Usuário"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Por favor, insira sua Senha!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Senha"
                  size="large"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Manter-me conectado</Checkbox>
                </Form.Item>

                <a style={{ float: "right" }} href="#">
                  Esqueceu a senha?
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  size="large"
                  loading={loading}
                  disabled={loading} // Desabilita enquanto carrega
                >
                  Entrar
                </Button>
              </Form.Item>
            </Form>

            {error && <Text type="danger">{error}</Text>}

            <Divider plain>Ou entre com</Divider>

            <Space style={{ width: "100%", justifyContent: "center" }}>
              <Button icon={<GithubOutlined />} size="large" />
              <Button icon={<TwitterOutlined />} size="large" />
              <Button icon={<GoogleOutlined />} size="large" />
            </Space>

            <div style={{ textAlign: "center" }}>
              <Text type="secondary">
                Não possui uma conta? <a href="#">Inscreva-se</a>
              </Text>
            </div>
          </Space>
        </div>
      </Content>
    </Layout>
  );
}
