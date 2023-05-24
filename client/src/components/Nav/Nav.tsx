import { useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";

function Nav() {
  const [current, setCurrent] = useState("start");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <a href="/" target="">
          Startsida
        </a>
      ),
      key: "start",
    },
    {
      label: (
        <a href="/" target="">
          Produkter
        </a>
      ),
      key: "produkter",
    },
    {
      label: (
        <a href="/" target="">
          Om oss
        </a>
      ),
      key: "about",
    },
    {
      label: (
        <a href="/" target="">
          Kontakt
        </a>
      ),
      key: "kontakt",
    },
  ];
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
}

export default Nav;
