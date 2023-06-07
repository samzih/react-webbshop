import { Card, Descriptions } from "antd";
import { useOrderContext } from "../context/OrderContext";
import { useCartContext } from "../context/CartContext";
import { useUserContext } from "../context/UserContext";
import { UserContext } from "../context/UserContext";
function ConfirmationCard() {
  const { order } = useOrderContext();
  console.log(order);
  const { totalSum } = useCartContext();
  const { loginUser }: UserContext = useUserContext();
  if (!loginUser) return null;

  const cartItem = JSON.parse(localStorage.getItem("cart"));
  console.log(cartItem);
  if (!cartItem) return null;
  return (
    <div>
      <div>
        <h2>Tack för din beställning</h2>
        <h3>Beräknad leverans: </h3>
      </div>
      <h2>Orderbekräftelse</h2>

      <Card style={{ width: "80%" }}>
        <Descriptions title="Ordernummer: ">
          <Descriptions.Item label="Namn: ">
            {loginUser.firstName + " " + loginUser.lastName}
          </Descriptions.Item>
          <Descriptions.Item label="Produkter: ">
            {" "}
            {cartItem.map((item) => (
              <div key={item.product._id}>
                <p>{item.product.title}</p>
                <p>x{item.quantity}</p>
              </div>
            ))}
          </Descriptions.Item>
          <Descriptions.Item label="Fraktsätt: ">
            Hangzhou, Zhejiang
          </Descriptions.Item>
          <Descriptions.Item label="Leveransadress: ">
            {order.deliveryAddress.street +
              " " +
              order.deliveryAddress.zipcode +
              " " +
              order.deliveryAddress.city +
              " " +
              order.deliveryAddress.country}
          </Descriptions.Item>

          <Descriptions.Item label="Totalpris: " style={{ fontSize: 56 }}>
            {totalSum + "frakt"}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}

export default ConfirmationCard;
