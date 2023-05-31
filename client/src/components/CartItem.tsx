import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { Card } from "antd";
import { useCartContext } from "../context/CartContext";

function CartItem() {
  const { Meta } = Card;
  const { cart, removeItem, increaseCartQuantity, decreaseCartQuantity } =
    useCartContext();
  const handleClick = (id: number) => {
    removeItem(id);
  };

  const ButtonGroup = Button.Group;

  return (
    <div>
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
                description={cartItem.product.price * cartItem.quantity + " kr"}
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
        </div>
      ))}
    </div>
  );
}

export default CartItem;
