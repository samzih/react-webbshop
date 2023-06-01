import { PlusOutlined } from "@ant-design/icons";
import "../component-styling/RegisterForm.css";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";

import React, { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { useUserContext } from "../context/UserContext";
import RegisterForm from "./RegisterForm";
import "../component-styling/Login.css";
function Login() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const { fetchLoginUser, logoutUser, loginUser } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [form] = Form.useForm();

  const handleClick = () => {
    const user = { email, password };
    fetchLoginUser(user);
    if (user.email) {
      form.resetFields();
      onClose();
    }
  };

  return (
    <div className="HandleUserContainer">
      <p className="userIcon">
        <UserOutlined />
      </p>
      <div className="LoginAndRegisterContainer">
        {loginUser && loginUser.firstName ? (
          <Button type="primary" onClick={showDrawer}>
            {loginUser.firstName}
          </Button>
        ) : (
          <Button type="primary" onClick={showDrawer}>
            Logga in
          </Button>
        )}
        <RegisterForm />
      </div>
      <Drawer
        title="Logga in"
        width={420}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Avbryt</Button>
          </Space>
        }
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
          ) : (
            <Button onClick={handleClick} type="primary">
              Logga in
            </Button>
          )}
        </Form>
      </Drawer>
    </div>
  );
}

export default Login;
