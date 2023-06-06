import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button, List, Space } from "antd";
import { Card } from "antd";
import { useCartContext } from "../context/CartContext";
import "../component-styling/CartItem.css";

function CartItem() {
  const { Meta } = Card;
  const { cart, removeItem, increaseCartQuantity, decreaseCartQuantity } =
    useCartContext();
  const handleClick = (id: number) => {
    removeItem(id);
  };
  const { totalSum } = useCartContext();

  return (
    <div>
      <List
        itemLayout="horizontal"
        size="large"
        dataSource={cart}
        renderItem={(cartItem) => (
          <List.Item key={cartItem.product._id}>
            <div className="cartContentLeftside">
              <img alt="example" src={cartItem.product.image} width={120} />
              <Link to={`/${cartItem.product._id}`} key={cartItem.product._id}>
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
//   const ButtonGroup = Button.Group;
//   const { totalSum } = useCartContext();
//   return (
//     <div>
//       {cart.map((cartItem) => (
//         <div key={cartItem.product._id}>
//           <Card
//             bordered
//             size="small"
//             hoverable
//             style={{
//               width: 200,
//               padding: 10,
//               margin: 10,
//               pointerEvents: "none",
//             }}
//             cover={<img alt="example" src={cartItem.product.image} />}
//           >
//             <div style={{ pointerEvents: "auto" }}>
//               <Link to={`/${cartItem.product._id}`} key={cartItem.product._id}>
//                 {cartItem.product.title && (
//                   <Meta
//                     title={cartItem.product.title}
//                     description={
//                       cartItem.product.price * cartItem.quantity + " kr"
//                     }
//                   />
//                 )}
//               </Link>
//             </div>

//             <DeleteOutlined
//               onClick={() => handleClick(cartItem.product._id)}
//               style={{ pointerEvents: "auto" }}
//             />

//             <ButtonGroup style={{ pointerEvents: "auto" }}>
//               <Button
//                 type="primary"
//                 size="small"
//                 shape="circle"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   decreaseCartQuantity(cartItem.product);
//                 }}
//                 disabled={cartItem.quantity <= 1}
//               >
//                 -
//               </Button>
//               <p>{cartItem.quantity}</p>
//               <Button
//                 type="primary"
//                 size="small"
//                 shape="circle"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   increaseCartQuantity(cartItem.product);
//                 }}
//                 disabled={cartItem.quantity >= cartItem.product.inStock}
//               >
//                 +
//               </Button>
//             </ButtonGroup>
//           </Card>
//         </div>
//       ))}
//       <p>{`Totalsumma: ${totalSum} kr`}</p>
//     </div>
//   );
// }

// export default CartItem;
