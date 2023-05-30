import React, { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useUserContext } from "../../context/UserContext";
import RegisterForm from "../RegisterForm/RegisterForm";
function Login() {
  const { fetchLoginUser } = useUserContext();
  const [expandLogin, setExpandLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    const user = { email, password };
    fetchLoginUser(user);
  };

  return (
    <div>
      <UserOutlined />
      <div>
        <p onClick={() => setExpandLogin((prevState) => !prevState)}>
          Logga in
        </p>
      </div>
      {expandLogin && (
        <form>
          <input
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Efternamn"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} type="primary">
            Login
          </Button>
        </form>
      )}
      <RegisterForm />
    </div>
  );
}

export default Login;
