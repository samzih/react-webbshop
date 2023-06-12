import { useState, useEffect } from "react";
import { Card, Divider, RadioChangeEvent, Typography } from "antd";
import { Input, Radio, Space } from "antd";
import { useShippingContext } from "../context/CheckoutShippingContext";
import { useCartContext } from "../context/CartContext";
import { useOrderContext } from "../context/OrderContext";

function CheckoutShipping() {
  const { shipping, calcDelivery, value, setValue } = useShippingContext();
  const { totalSum } = useCartContext();
  const { order, setOrder } = useOrderContext();
  const { Title } = Typography;
  useEffect(() => {
    setValue(shipping[0]);
  }, []);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    setOrder({ ...order, shippingMethod: e.target.value._id });
  };

  return (
    <div>
      <Radio.Group onChange={onChange} value={value}>
        {shipping.map((shipping) => (
          <div key={shipping._id}>
            <Card>
              <Space direction="vertical">
                <Card>
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
