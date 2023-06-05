import { useState } from "react";
import { Card, Divider, RadioChangeEvent } from "antd";
import { Input, Radio, Space } from "antd";
import { useShippingContext } from "../context/CheckoutShippingContext";

function CheckoutShipping() {
  const { shipping, calcDelivery } = useShippingContext();
  const [value, setValue] = useState(shipping[0]);
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <div>
      {shipping.map((shipping) => (
        <div key={shipping._id}>
          <Card>
            <Radio.Group onChange={onChange} value={value}>
              <Space direction="vertical">
                <Card>
                  <Radio value={shipping}>{shipping.company}</Radio>
                  <p>Pris: {shipping.price} kr</p>
                  <p>Leveransdatum: {calcDelivery(shipping)} </p>
                </Card>
              </Space>
            </Radio.Group>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default CheckoutShipping;
