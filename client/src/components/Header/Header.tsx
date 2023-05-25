import Nav from "../Nav/Nav";
import CartHeader from "../CartHeader/CartHeader";
import Login from "../Login/Login";
import { Button, Space } from "antd";

function Header() {
  return (
    <header>
      <h1>Logo</h1>

      <div>
        <Login />
        <CartHeader />
      </div>
      <Nav />
    </header>
  );
}

export default Header;
