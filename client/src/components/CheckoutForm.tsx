import { useState } from "react";
import { Form, Input } from "antd";
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
          <Form.Item label="Namn">
            <span>{`${loginUser.firstName} ${loginUser.lastName}`}</span>
          </Form.Item>

          <Form.Item label="Email">
            <span>{loginUser.email}</span>
          </Form.Item>

          <Form.Item htmlFor="street" label="Gata">
            <Input name="street" type="text" autoComplete="address-line1"/>
          </Form.Item>

          <Form.Item htmlFor="postal" label="Postnummer">
            <Input name="postal" type="text" autoComplete="postal-code"/>
          </Form.Item>

          <Form.Item htmlFor="city" label="Stad">
            <Input name="city" type="text" autoComplete="address-level2"/>
          </Form.Item>

          <Form.Item htmlFor="country" label="Land">
            <Input name="country" type="text" autoComplete="country-name"/>
          </Form.Item>
        </>
      ) : (
        <p>
          Du måste logga in för att komma vidare.
        </p>
      )}
    </Form>
  );
}

export default CheckoutForm;
