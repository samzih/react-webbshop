import React, { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import LoginButton from "../LoginButton/LoginButton";
import { useUserContext } from "../../context/UserContext";
import RegisterForm from "../RegisterForm/RegisterForm";
function Login() {
  const { handleEmail, handlePassword, fetchLoginUser } = useUserContext();
  const [expandLogin, setExpandLogin] = useState(false);

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
          <input type="text" placeholder="email" onChange={handleEmail} />
          <input
            type="text"
            placeholder="Efternamn"
            onChange={handlePassword}
          />
          <LoginButton />
        </form>
      )}
      <RegisterForm />
    </div>
  );
}

export default Login;
