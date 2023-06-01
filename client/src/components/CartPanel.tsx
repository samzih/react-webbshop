import { Button, Drawer, Space } from "antd";
import { NavLink } from "react-router-dom";
import CartItem from "./CartItem";
import { useCartContext } from "../context/CartContext";
import { useState } from "react";
import type { DrawerProps } from "antd/es/drawer";
type Props = {
  cartItemCount: number;
  open: boolean;
  close: () => void;
};

function CartPanel(props: Props) {
  const [placement] = useState<DrawerProps["placement"]>("right");

  return (
    <div>
      <Drawer
        title="KUNDVAGN"
        placement={placement}
        width={500}
        onClose={props.close}
        open={props.open}
        extra={
          <Space>
            <NavLink to="./checkout">
              <Button
                type="primary"
                disabled={props.cartItemCount <= 0}
                onClick={props.close}
              >
                Gå till kassan
              </Button>
            </NavLink>
          </Space>
        }
      >
        <CartItem />
      </Drawer>
    </div>
  );
}

export default CartPanel;
