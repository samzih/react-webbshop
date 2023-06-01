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

  const handleClick = () => {
    const user = { email, password };
    fetchLoginUser(user);
  };

  return (
    <div className="HandleUserContainer">
      <p className="userIcon">
        <UserOutlined />
      </p>
      <div className="LoginAndRegisterContainer">
        {!loginUser ? (
          <Button type="primary" onClick={showDrawer}>
            Log In
          </Button>
        ) : (
          <Button type="primary" onClick={showDrawer}>
            {loginUser.firstName}
          </Button>
        )}
        <RegisterForm />
      </div>
      <Drawer
        title="Log in"
        width={420}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <form>
          {!loginUser ? (
            <>
              <input
                type="text"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="lösenord"
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          ) : (
            <p>Welcome {loginUser.firstName}</p>
          )}
          {loginUser ? (
            <Button onClick={logoutUser} type="primary">
              Logga ut
            </Button>
          ) : (
            <Button onClick={handleClick} type="primary">
              Login
            </Button>
          )}
        </form>
      </Drawer>
    </div>
  );
}

export default Login;
