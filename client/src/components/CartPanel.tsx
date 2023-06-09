import { Button, Drawer, Space } from "antd";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { useState } from "react";
import type { DrawerProps } from "antd/es/drawer";
type Props = {
  cartItemCount: number;
  open: boolean;
  close: () => void;
};

function CartPanel(props: Props) {
  const [placement] = useState<DrawerProps["placement"]>("right");
  const navigate = useNavigate();

  function checkCart() {
    if (props.cartItemCount >= 0) {
      navigate("/checkout");
      props.close();
    }
  }

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
            <Button
              type="primary"
              disabled={props.cartItemCount <= 0}
              onClick={checkCart}
            >
              Gå till kassan
            </Button>
          </Space>
        }
      >
        <CartItem />
      </Drawer>
    </div>
  );
}

export default CartPanel;
