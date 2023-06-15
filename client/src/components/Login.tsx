import "../component-styling/RegisterForm.css";
import { Alert, Button, Typography, Form, Input, Modal } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { UserOutlined, AndroidOutlined } from "@ant-design/icons";
import { useUserContext } from "../context/UserContext";
import RegisterForm from "./RegisterForm";
import "../component-styling/Header.css";

const { Title, Text } = Typography;
function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
    setLoginSuccess(false);
  };

  const handleOk = async () => {
    const user = { email, password };
    const response = await fetchLoginUser(user);
    // console.log(response);
    if (
      typeof response === "string" &&
      response === "Wrong password or username"
    ) {
      setErrorMessage(response);
      setLoginSuccess(false);
    } else {
      setErrorMessage("");
      form.resetFields();
      setIsModalOpen(true);
    }

    if (loginUser?.firstName) {
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setErrorMessage("");
  };

  const { fetchLoginUser, logoutUser, loginUser } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [form] = Form.useForm();

  // Signs you out from the header
  const handleClick = () => {
    logoutUser();
    window.location.href = "/";
  };

  return (
    <div className="HandleUserContainer">
      <div className="LoginAndRegisterContainer">
        {loginUser && loginUser.firstName ? (
          <>
            {loginUser?.isAdmin ? (
              <>
                <Link to={"/admin"}>
                  <AndroidOutlined className="adminIcon" />
                </Link>
              </>
            ) : (
              <p className="userIcon" onClick={showModal}>
                <UserOutlined />
              </p>
            )}
            <Text className="LogoutAction" onClick={handleClick}>
              Logga ut
            </Text>
          </>
        ) : (
          <Button className="headerbtn" type="text" onClick={showModal}>
            <UserOutlined /> <span className="logintext">Logga in</span>
          </Button>
        )}
        <RegisterForm />
      </div>
      <Modal
        title="Inloggning"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {errorMessage && !loginSuccess && (
          <Alert message={errorMessage} type="error" showIcon />
        )}
        {loginSuccess && <p>Välkommen {loginUser?.firstName}</p>}
        <Form form={form}>
          {loginUser && loginUser.firstName ? (
            <Title>Välkommen {loginUser.firstName}!</Title>
          ) : (
            <>
              <Form.Item
                name="email"
                label="E-postadress"
                rules={[{ required: true, message: "Ange din E-postadress" }]}
              >
                <Input
                  placeholder="Johan36@hotmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Lösenord"
                rules={[{ required: true, message: "Ange ditt lösenord" }]}
              >
                <Input.Password
                  placeholder="******"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
            </>
          )}

          {loginUser && loginUser.firstName ? (
            <Button onClick={logoutUser} type="text">
              Logga ut
            </Button>
          ) : null}
        </Form>
      </Modal>
    </div>
  );
}

export default Login;
