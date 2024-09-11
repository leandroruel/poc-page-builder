import { Button, Card, Layout, Typography, message } from "antd";
import { LoginOutlined, WindowsOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../../../authConfig'
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title } = Typography;

export const SSOLogin = () => {
    const [loading, setLoading] = useState(false)
    const { instance } = useMsal()
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)
  
    const handleLogin = async (values: any) => {
      setLoading(true)
      setError(null)
  
      try {
        const result = await instance.loginPopup({
          ...loginRequest,
          loginHint: values.username
        })
        
        console.log("Login successful", result)
        message.success('Login successful!')
        navigate('/dashboard') // Redirect to dashboard after successful login
      } catch (error: any) {
        console.error("Login failed", error)
        if (error.errorCode === "user_cancelled") {
          setError("Login was cancelled. Please try again.")
        } else if (error.errorCode === "access_denied") {
          setError("Access denied. Please check your credentials and try again.")
        } else {
          setError("An error occurred during login. Please try again.")
        }
        message.error(error.toString())
      } finally {
        setLoading(false)
      }
    }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card style={{ width: "100%", maxWidth: 400 }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <WindowsOutlined
              style={{ fontSize: 48, color: "#0078d4", marginBottom: 16 }}
            />
            <Title level={2}>Login with Microsoft</Title>
          </div>
          <Button
            type="primary"
            icon={<LoginOutlined />}
            size="large"
            block
            onClick={handleLogin}
            loading={loading}
          >
            {loading ? "Logging in..." : "Sign in with Microsoft"}
          </Button>
        </Card>
      </Content>
    </Layout>
  );
};
