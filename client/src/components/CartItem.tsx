import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button, List } from "antd";
import { useCartContext } from "../context/CartContext";
import "../Styling/CartItem.css";
import "../Styling/CartPanel.css";

function CartItem() {
  const {
    cart,
    removeItem,
    increaseCartQuantity,
    decreaseCartQuantity,
    totalSum,
  } = useCartContext();
  const handleClick = (id: number) => {
    removeItem(id);
  };

  return (
    <div>
      <List
        className="cartItem"
        itemLayout="horizontal"
        size="large"
        dataSource={cart}
        renderItem={(cartItem) => (
          <List.Item key={cartItem.product._id}>
            <div className="cartContentLeftside">
              <img alt="example" src={cartItem.product.image} width={120} />
              <Link
                className="content"
                to={`/${cartItem.product._id}`}
                key={cartItem.product._id}
              >
                <List.Item.Meta
                  style={{ width: 200 }}
                  title={cartItem.product.title}
                  description={
                    cartItem.product.price * cartItem.quantity + " kr"
                  }
                />
              </Link>
            </div>

            <div className="cartContentRightside">
              <DeleteOutlined
                onClick={() => handleClick(cartItem.product._id)}
                style={{
                  fontSize: 23,
                  justifyContent: "center",
                  padding: "0.5rem 0 1rem 0",
                }}
              />
              <p>Antal:</p>
              <div className="decreaseIncreaseBtnContainer">
                <Button
                  type="text"
                  className="decreasebtn"
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
                  type="text"
                  className="increasebtn"
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
              </div>
            </div>
          </List.Item>
        )}
      />
      <h3>{`Totalsumma: ${totalSum} kr`}</h3>
    </div>
  );
}

export default CartItem;
