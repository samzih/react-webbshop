import { Card, Descriptions } from "antd";
import { useEffect } from "react";
import { useOrderContext } from "../context/OrderContext";
import { useCartContext } from "../context/CartContext";
import { useUserContext } from "../context/UserContext";
import { UserContext } from "../context/UserContext";
import { useShippingContext } from "../context/CheckoutShippingContext";
import { BsFillCartCheckFill } from "react-icons/Bs";
import "../component-styling/ConfirmationCard.css";
function ConfirmationCard() {
  const { order, orderNr } = useOrderContext();
  console.log(order);
  // const { totalSum } = useCartContext();
  const { value, calcDelivery } = useShippingContext();
  const { loginUser }: UserContext = useUserContext();
  const cartItem = JSON.parse(localStorage.getItem("cart"));
  const { orderItems, totalSum } = order;

  console.log("This is my orderItems:", orderItems);
  console.log("Detta är mina varukorgitems:", cartItem);
  console.log(order.orderItems);

  if (!loginUser) return null;
  console.log(cartItem);
  if (!cartItem) return null;
  return (
    <div className="confirmContainer">
      <div className="confimMessage">
        <BsFillCartCheckFill style={{ fontSize: "50px" }} />
        <h2>Tack för din beställning!</h2>
        <h3>Beräknad leverans: {calcDelivery(value)}</h3>
        <h2>Ordernummer: {orderNr} </h2>
      </div>

      <Card style={{ width: "80%" }}>
        <Descriptions title="Din order ">
          <Descriptions.Item label="Namn: ">
            {loginUser.firstName + " " + loginUser.lastName}
          </Descriptions.Item>
          <Descriptions.Item label="Leveransadress: ">
            {order.deliveryAddress.street} <br />
            {order.deliveryAddress.zipcode} {order.deliveryAddress.city} <br />
            {order.deliveryAddress.country}
          </Descriptions.Item>

          <Descriptions.Item label="Pris: " style={{ fontSize: 56 }}>
            {"Order: " + totalSum + " kr"} <br />
            {"Frakt: " + value.price + " kr"}
          </Descriptions.Item>

          <Descriptions.Item label="Produkter: ">
            {" "}
            <ul style={{ listStyleType: "none" }}>
              {orderItems.map((item) => (
                <div key={item.product._id}>
                  <li>
                    {item.product.title} <br /> x{item.quantity}
                  </li>
                  <br />
                </div>
              ))}
            </ul>
          </Descriptions.Item>
          <Descriptions.Item label="Fraktsätt: ">
            {value.company}
          </Descriptions.Item>
          <Descriptions.Item label="Totalpris: " style={{ fontSize: 56 }}>
            {totalSum + value.price} kr
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}

export default ConfirmationCard;
