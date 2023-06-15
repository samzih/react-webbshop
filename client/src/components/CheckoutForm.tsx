import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Form, Input } from "antd";
import { useUserContext } from "../context/UserContext";
import { UserContext } from "../context/UserContext";
import { useOrderContext } from "../context/OrderContext";
import { useCartContext } from "../context/CartContext";
import "../Styling/Checkout.css";

type SizeType = Parameters<typeof Form>[0]["size"];

interface CheckoutFormProps {
  setSubmittable: Dispatch<SetStateAction<boolean>>;
}

function CheckoutForm({ setSubmittable }: CheckoutFormProps) {
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  const { order, setOrder } = useOrderContext();
  const { loginUser }: UserContext = useUserContext();
  const { cart } = useCartContext();

  const [form] = Form.useForm();
  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        if (loginUser && cart.length >= 1) {
          setSubmittable(false);
        }
      },
      () => {
        setSubmittable(true);
      }
    );
  }, [values]);

  return (
    <div className="form">
      <Form
        form={form}
        name="validateOnly"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{
          gata: order.deliveryAddress.street,
          postnummer: order.deliveryAddress.zipcode,
          stad: order.deliveryAddress.city,
          land: order.deliveryAddress.country,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
        style={{ maxWidth: 600 }}
      >
        {loginUser ? (
          <>
            <Form.Item label="Namn">
              <span className="name">{`${loginUser.firstName} ${loginUser.lastName}`}</span>
            </Form.Item>

            <Form.Item label="Email">
              <span className="email">{loginUser.email}</span>
            </Form.Item>

            <Form.Item
              help
              name="gata"
              htmlFor="street"
              label="Gata"
              rules={[{ required: true }]}
            >
              <div>
                <Input
                  className="inputstreet"
                  name="street"
                  type="text"
                  autoComplete="address-line1"
                  onChange={(e) =>
                    setOrder({
                      ...order,
                      deliveryAddress: {
                        ...order.deliveryAddress,
                        street: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </Form.Item>

            <Form.Item
              help
              name="postnummer"
              htmlFor="postal"
              label="Postnr"
              rules={[{ required: true, min: 5 }]}
            >
              <Input
                className="inputzip"
                name="postal"
                type="text"
                autoComplete="postal-code"
                onChange={(e) =>
                  setOrder({
                    ...order,
                    deliveryAddress: {
                      ...order.deliveryAddress,
                      zipcode: e.target.value,
                    },
                  })
                }
              />
            </Form.Item>

            <Form.Item
              help
              name="stad"
              htmlFor="city"
              label="Stad"
              rules={[{ required: true }]}
            >
              <Input
                className="inputcity"
                name="city"
                type="text"
                autoComplete="address-level2"
                onChange={(e) =>
                  setOrder({
                    ...order,
                    deliveryAddress: {
                      ...order.deliveryAddress,
                      city: e.target.value,
                    },
                  })
                }
              />
            </Form.Item>

            <Form.Item
              help
              name="land"
              htmlFor="country"
              label="Land"
              rules={[{ required: true }]}
            >
              <Input
                className="inputcountry"
                name="country"
                type="text"
                autoComplete="country-name"
                onChange={(e) =>
                  setOrder({
                    ...order,
                    deliveryAddress: {
                      ...order.deliveryAddress,
                      country: e.target.value,
                    },
                  })
                }
              />
            </Form.Item>
          </>
        ) : (
          <p>Du måste logga in för att komma vidare.</p>
        )}
      </Form>
    </div>
  );
}

export default CheckoutForm;
