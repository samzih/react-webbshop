import type { MenuProps } from "antd";
import { Menu } from "antd";
import "../component-styling/Nav.css";

function Nav() {
  const items: MenuProps["items"] = [
    {
      label: (
        <a href="/" target="">
          <div className="links">Startsida</div>
        </a>
      ),
      key: "start",
    },
    {
      label: (
        <a href="/about" target="">
          <div className="links">Om oss</div>
        </a>
      ),
      key: "about",
    },
    {
      label: (
        <a href="/contact" target="">
          <div className="links">Kontakt</div>
        </a>
      ),
      key: "kontakt",
    },
  ];
  return <Menu mode="horizontal" items={items} />;
}

export default Nav;
