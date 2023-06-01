import { useState } from "react";
import { Card, Divider, RadioChangeEvent } from "antd";
import { Input, Radio, Space } from "antd";

function CheckoutShipping() {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <div>
      <Card>
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            <Card>
              <Radio value={1}>DHL</Radio>
              <p>jdhsdfsdf hfsj dsfsdf sd fdsf sd ffs ds </p>
            </Card>

            <Card>
              <Radio value={2}>PostNord</Radio>
            </Card>
            <Card>
              <Radio value={3}>Instabox</Radio>
            </Card>
          </Space>
        </Radio.Group>
      </Card>
    </div>
  );
}

export default CheckoutShipping;
