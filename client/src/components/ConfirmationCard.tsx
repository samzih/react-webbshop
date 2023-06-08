import { Card, Descriptions } from "antd";
import { useOrderContext } from "../context/OrderContext";
import { useCartContext } from "../context/CartContext";
import { useUserContext } from "../context/UserContext";
import { UserContext } from "../context/UserContext";
import { useShippingContext } from "../context/CheckoutShippingContext";
function ConfirmationCard() {
  const { order, orderNr } = useOrderContext();
  console.log(order);
  const { totalSum } = useCartContext();
  const { value, calcDelivery } = useShippingContext();
  const { loginUser }: UserContext = useUserContext();
  if (!loginUser) return null;
  setTimeout(() => {
    localStorage.removeItem("cart");
  }, 2000);
  const cartItem = JSON.parse(localStorage.getItem("cart"));
  console.log(cartItem);
  if (!cartItem) return null;
  return (
    <div>
      <div>
        <h2>Tack för din beställning</h2>
        <h3>Beräknad leverans: {calcDelivery(value)}</h3>
      </div>
      <h2>Ordernummer: {orderNr} </h2>

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
              {cartItem.map((item) => (
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
            {totalSum + value.price}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}

export default ConfirmationCard;
