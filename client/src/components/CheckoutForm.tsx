import { useState } from "react";
import { Button, Form, Input, Radio, Select } from "antd";
import { useUserContext } from "../context/UserContext";

type SizeType = Parameters<typeof Form>[0]["size"];

function CheckoutForm() {
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  const { fetchLoginUser } = useUserContext();

  const user = fetchLoginUser;
  console.log(user);

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize as SizeType}
      style={{ maxWidth: 600 }}
    >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="E-mail">
        <Input />
      </Form.Item>
      <Form.Item label="Förnamn">
        <Input />
      </Form.Item>
      <Form.Item label="Efternamn">
        <Input />
      </Form.Item>
      <Form.Item label="Gata">
        <Input />
      </Form.Item>
      <Form.Item label="Postnummer">
        <Input />
      </Form.Item>
      <Form.Item label="Stad">
        <Input />
      </Form.Item>
      <Form.Item label="Land">
        <Select>
          <Select.Option value="demo">Sverige</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Button">
        <Button>Button</Button>
      </Form.Item>
    </Form>
  );
}

export default CheckoutForm;
