import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { Badge, Button, Drawer, Space } from "antd";
import type { DrawerProps } from "antd/es/drawer";
import { Card } from "antd";
import { useCartContext } from "../../context/CartContext";

function CartHeader() {
  const [open, setOpen] = useState(false);
  const [placement] = useState<DrawerProps["placement"]>("right");
  const { Meta } = Card;
  const {
    cart,
    removeItem,
    increaseCartQuantity,
    decreaseCartQuantity,
    totalSum,
  } = useCartContext();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleClick = (id: number) => {
    removeItem(id);
  };

  const ButtonGroup = Button.Group;

  return (
    <div>
      <>
        <Space>
          <div>
            <ShoppingCartOutlined style={{ fontSize: 50 }} onClick={showDrawer} />
            <Badge count={1}>
              <span />
            </Badge>
          </div>
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
                    description={
                      cartItem.product.price * cartItem.quantity + " kr"
                    }
                  />
                  <DeleteOutlined
                    onClick={() => handleClick(cartItem.product._id)}
                  />

                  <ButtonGroup>
                    <Button
                      type="primary"
                      size="small"
                      shape="circle"
                      onClick={(e) => {
                        e.preventDefault();
                        decreaseCartQuantity(cartItem.product);
                      }}
                      disabled={cartItem.quantity <= 1}
                    >
                      -
                    </Button>
                    <p>{cartItem.quantity}</p>
                    <Button
                      type="primary"
                      size="small"
                      shape="circle"
                      onClick={(e) => {
                        e.preventDefault();
                        increaseCartQuantity(cartItem.product);
                      }}
                      disabled={cartItem.quantity >= cartItem.product.inStock}
                    >
                      +
                    </Button>
                  </ButtonGroup>
                </Card>
              </Link>
              <p>{"Totalsumma: " + totalSum}</p>
            </div>
          ))}
        </Drawer>
      </>
    </div>
  );
}

export default CartHeader;
