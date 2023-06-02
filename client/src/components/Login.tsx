import { PlusOutlined } from "@ant-design/icons";
import "../component-styling/RegisterForm.css";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Typography,
  Form,
  Input,
  Row,
  Select,
  Modal,
  Space,
} from "antd";

import React, { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { useUserContext } from "../context/UserContext";
import RegisterForm from "./RegisterForm";
import "../component-styling/Login.css";
const { Title, Text } = Typography;
function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const user = { email, password };
    fetchLoginUser(user);
    if (loginUser && loginUser.firstName) {
      form.resetFields();
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { fetchLoginUser, logoutUser, loginUser } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [form] = Form.useForm();

  const handleClick = () => {};

  return (
    <div className="HandleUserContainer">
      <div className="LoginAndRegisterContainer">
        {loginUser && loginUser.firstName ? (
          <>
            <p className="userIcon" onClick={showModal}>
              <UserOutlined />
            </p>
            <Text className="LogoutAction" onClick={logoutUser}>
              Logga ut
            </Text>
          </>
        ) : (
          <Button type="primary" onClick={showModal}>
            <UserOutlined /> Logga in
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
        <Form form={form}>
          {loginUser && loginUser.firstName ? (
            <p>Welcome {loginUser.firstName}</p>
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
            <Button onClick={logoutUser} type="primary">
              Logga ut
            </Button>
          ) : null}
        </Form>
      </Modal>
    </div>
  );
}

export default Login;
