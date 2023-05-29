import { ShoppingCartOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
function CartHeader() {
  return (
    <div>
      <NavLink to="/cart">
        <ShoppingCartOutlined />
      </NavLink>
    </div>
  );
}

export default CartHeader;
