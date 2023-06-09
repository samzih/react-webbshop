import Nav from "./Nav";
import Cart from "./Cart";
import Login from "./Login";
import "../component-styling/Header.css";

function Header() {
  return (
    <header>
      <div id="header">
        <h1>KJOSK</h1>
        <div id="right-content">
          <Login />
          <Cart  />
        </div>
      </div>
      <Nav />
    </header>
  );
}

export default Header;
