import Nav from "../Nav/Nav";
import CartHeader from "../CartHeader/CartHeader";
import Login from "../Login/Login";
import { Button, Space } from "antd";

import "./Header.css";

function Header() {
  return (
    <header>
      <div id="header">
        <h1>KJOSK</h1>

        <div id="right-content">
          <Login />
          <CartHeader />
        </div>
      </div>
      <Nav />
    </header>
  );
}

export default Header;
