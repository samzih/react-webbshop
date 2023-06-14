import { useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import "../component-styling/Nav.css";

function Nav() {
  // const [current, setCurrent] = useState("start");

  // const onClick: MenuProps["onClick"] = (e) => {
  //   console.log("click ", e);
  //   // setCurrent(e.key);
  // };

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
        <a href="/" target="">
          <div className="links">Om oss</div>
        </a>
      ),
      key: "about",
    },
    {
      label: (
        <a href="/" target="">
          <div className="links">Kontakt</div>
        </a>
      ),
      key: "kontakt",
    },
  ];
  return (
    <Menu
      // onClick={onClick}
      // selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
}

export default Nav;
