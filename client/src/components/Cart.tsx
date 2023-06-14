import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Badge } from "antd";
import { useCartContext } from "../context/CartContext";
import CartPanel from "./CartPanel";

// Rendering the cart and all its children components
function Cart() {
  const [open, setOpen] = useState(false);
  const { cart } = useCartContext();

  const showPanel = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  let cartItemCount = 0;
  cart.forEach((item) => (cartItemCount += item.quantity));

  return (
    <div>
      <Badge className="shoppingcart" offset={[0, 13]} count={cartItemCount}>
        <ShoppingCartOutlined style={{ fontSize: 50 }} onClick={showPanel} />
      </Badge>
      <CartPanel cartItemCount={cartItemCount} open={open} close={onClose} />
    </div>
  );
}

export default Cart;
