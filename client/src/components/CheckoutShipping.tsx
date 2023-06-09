import { useState, useEffect } from "react";
import { Card, Divider, RadioChangeEvent } from "antd";
import { Input, Radio, Space } from "antd";
import { useShippingContext } from "../context/CheckoutShippingContext";
import { useCartContext } from "../context/CartContext";
import { useOrderContext } from "../context/OrderContext";

function CheckoutShipping() {
  const { shipping, calcDelivery, value, setValue } = useShippingContext();
  const { totalSum } = useCartContext();
  const { order, setOrder } = useOrderContext();

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
      <Radio.Group  onChange={onChange} value={value}>
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
        <p>Totalpris: {totalSum + value.price} </p>
      </Radio.Group>
    </div>
  );
}

export default CheckoutShipping;
