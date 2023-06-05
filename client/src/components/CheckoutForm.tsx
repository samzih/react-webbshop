import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Form, Input } from "antd";
import { useUserContext } from "../context/UserContext";
import { UserContext } from "../context/UserContext";

type SizeType = Parameters<typeof Form>[0]["size"];

interface CheckoutFormProps {
  setSubmittable: Dispatch<SetStateAction<boolean>>;
}

function CheckoutForm({setSubmittable}: CheckoutFormProps) {
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  const { loginUser }: UserContext = useUserContext();

  const [form] = Form.useForm();

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        // console.log("Alla inputfält är ifyllda!");
        setSubmittable(false);
      },
      () => {
        // console.log("Alla inputfält är inte ifyllda...");
        setSubmittable(true);
      },
    );
  }, [values]);

  return (
    <Form
      form={form}
      name="validateOnly"
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

          <Form.Item help name="gata" htmlFor="street" label="Gata" rules={[{ required: true }]}>
            <Input name="street" type="text" autoComplete="address-line1" />
          </Form.Item>

          <Form.Item help name="postnummer" htmlFor="postal" label="Postnummer" rules={[{ required: true, min: 5 }]}>
            <Input name="postal" type="text" autoComplete="postal-code"/>
          </Form.Item>

          <Form.Item help name="stad" htmlFor="city" label="Stad" rules={[{ required: true }]}>
            <Input name="city" type="text" autoComplete="address-level2"/>
          </Form.Item>

          <Form.Item help name="land" htmlFor="country" label="Land" rules={[{ required: true }]}>
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
