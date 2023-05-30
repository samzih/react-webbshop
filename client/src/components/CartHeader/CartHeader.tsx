import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { Button, Drawer, Space } from "antd";
import type { DrawerProps } from "antd/es/drawer";
import { Card } from "antd";
import { useCartContext } from "../../context/CartContext";

function CartHeader() {
  const [open, setOpen] = useState(false);
  const [placement] = useState<DrawerProps["placement"]>("right");
  const { Meta } = Card;
  const { cart, removeItem } = useCartContext();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleClick = (id: number) => {
    removeItem(id);
  };

  return (
    <div>
      <>
        <Space>
          <ShoppingCartOutlined onClick={showDrawer} />
        </Space>
        <Drawer
          title="KUNDVAGN"
          placement={placement}
          width={500}
          onClose={onClose}
          open={open}
          extra={
            <Space>
              <NavLink to="./cart">
                <Button type="primary" onClick={onClose}>
                  Gå till kassan
                </Button>
              </NavLink>
            </Space>
          }
        >
          {cart.map((cartItem) => (
            <div key={cartItem.product._id}>
              <Link to={`/${cartItem.product._id}`} key={cartItem.product._id}>
                <Card
                  bordered
                  size="small"
                  hoverable
                  style={{ width: 200, padding: 10, margin: 10 }}
                  cover={<img alt="example" src={cartItem.product.image} />}
                >
                  <Meta
                    title={cartItem.product.title}
                    description={cartItem.product.price + " kr"}
                  />
                  <DeleteOutlined
                    onClick={() => handleClick(cartItem.product._id)}
                  />
                </Card>
              </Link>
            </div>
          ))}
        </Drawer>
      </>
    </div>
  );
}

export default CartHeader;
