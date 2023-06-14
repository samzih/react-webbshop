import { useEffect } from "react";
import { Card, RadioChangeEvent, Typography } from "antd";
import { Radio, Space } from "antd";
import { useShippingContext } from "../context/CheckoutShippingContext";
import { useCartContext } from "../context/CartContext";
import { useOrderContext } from "../context/OrderContext";
import "../component-styling/Checkout.css";

function CheckoutShipping() {
  const { shipping, calcDelivery, value, setValue } = useShippingContext();
  const { totalSum } = useCartContext();
  const { order, setOrder } = useOrderContext();
  const { Title } = Typography;
  useEffect(() => {
    setValue(shipping[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    setOrder({ ...order, shippingMethod: e.target.value._id });
  };

  return (
    <div className="shipping">
      <Radio.Group onChange={onChange} value={value}>
        {shipping.map((shipping) => (
          <div key={shipping._id}>
            <Card className="shippingcard">
              <Space direction="vertical">
                <Card className="shippinginnercard">
                  <Radio value={shipping}>{shipping.company}</Radio>
                  <p>Pris: {shipping.price} kr</p>
                  <p>Leveransdatum: {calcDelivery(shipping)} </p>
                </Card>
              </Space>
            </Card>
          </div>
        ))}
        <Space direction="vertical">
          <Card>
            <Title level={4}>Totalpris: {totalSum + value.price} kr </Title>
          </Card>
        </Space>
      </Radio.Group>
    </div>
  );
}

export default CheckoutShipping;
