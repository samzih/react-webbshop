import React, { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
function Login() {
  const [expandLogin, setExpandLogin] = useState(false);
  const [expandRegister, setExpandRegister] = useState(false);
  const [login, setLogin] = useState(false);

  // MÅSTE TYPA UPP DET
  async function registerForm(e: any) {
    e.preventDefault();
    console.log(e);
    const form = e.target;
    console.log(form);
    const firstName = form.elements.firstName.value;
    const lastName = form.elements.lastName.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch {
      console.log(Error);
    }
  }

  return (
    <div>
      <UserOutlined />
      <div>
        <p onClick={() => setExpandLogin((prevState) => !prevState)}>
          Logga in
        </p>
        <p onClick={() => setExpandRegister((prevState) => !prevState)}>
          Registrera
        </p>
      </div>
      {expandLogin && (
        <form>
          Logga in
          <input type="text" />
          <input type="text" />
        </form>
      )}
      {expandRegister && (
        <form method="post" onSubmit={registerForm}>
          <label>
            <h4>registera här</h4>
            <input name="firstName" placeholder="Förnamn" />
          </label>
          <label>
            <input name="lastName" placeholder="Efternamn" />
          </label>
          <label>
            <input name="email" placeholder="mejladress" />
          </label>
          <label>
            <input name="password" type="password" placeholder="lösenord" />
          </label>
          <button type="submit">Submit form</button>
        </form>
      )}
    </div>
  );
}

export default Login;
