import { useState } from "react";
import { Form, Input, Select } from "antd";
import { useUserContext } from "../context/UserContext";
import { UserContext } from "../context/UserContext";

type SizeType = Parameters<typeof Form>[0]["size"];

function CheckoutForm() {
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  const { loginUser }: UserContext = useUserContext();

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
      {loginUser ? (
        <>
          <Form.Item label="E-mail">
            <Input value={loginUser.email} />
          </Form.Item>

          <Form.Item label="Förnamn">
            <Input value={loginUser.firstName} />
          </Form.Item>

          <Form.Item label="Efternamn">
            <Input value={loginUser.lastName} />
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
        </>
      ) : (
        <p>
          Du måste logga in för att komma vidare.
          <p />
        </p>
      )}
    </Form>
  );
}

export default CheckoutForm;
