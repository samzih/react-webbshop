import React, { useState } from "react";
import { Button, message, Spin, Steps, theme } from "antd";
import CartItem from "../components/CartItem";
import CheckoutForm from "../components/CheckoutForm";
import CheckoutShipping from "../components/CheckoutShipping";
import { useOrderContext } from "../context/OrderContext";
import { useShippingContext } from "../context/CheckoutShippingContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Loader from "../components/Loader";
import { NavLink } from "react-router-dom";

function Checkout() {
  const { order, setOrder } = useOrderContext();
  const [submittable, setSubmittable] = useState(true);
  const [spin, setSpin] = useState(false);
  const { shipping } = useShippingContext();

  const steps = [
    {
      title: "Kundvagn",
      content: <CartItem />,
    },
    {
      title: "Personuppgifter",
      content: <CheckoutForm setSubmittable={setSubmittable} />,
    },
    {
      title: "Fraktsätt",
      content: <CheckoutShipping />,
    },
  ];

  const completeOrder = () => {
    //message.success("Processing complete!")

    setSpin(true);

    const cartItem = localStorage.getItem("cart");
    const orderItems: any[] = cartItem ? JSON.parse(cartItem) : [];

    // let orderItems = useLocalStorage("cart", "")
    setOrder({ ...order, orderItems: orderItems });

    sendOrder(order);
  };

  async function sendOrder(order: any) {
    const { deliveryAddress, orderItems, shippingMethod } = order;

    let updatedOrderItems = orderItems.map((item) => {
      const {
        product: { _id },
        ...rest
      } = item;
      return {
        ...rest,
        product: _id,
      };
    });

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderItems: updatedOrderItems,
          deliveryAddress,
          shippingMethod,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch {
      console.log(Error);
    }
  }

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);

    if (current === 1) {
      setOrder({ ...order, shippingMethod: shipping[0]._id });
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <div
      style={{
        margin: 90,
      }}
    >
      <Steps current={current} items={items} />
      <Spin spinning={spin} tip="Vänligen vänta..." size="large">
        <div style={contentStyle}>{steps[current].content}</div>
      </Spin>
      <div style={{ marginTop: 24 }}>
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Föregående | Gå tillbaka
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button
            type="primary"
            disabled={current > steps.length - 3 && submittable}
            onClick={() => next()}
          >
            Nästa | Fortsätt
          </Button>
        )}
        {current === steps.length - 1 && (
          <NavLink to="/confirmation">
            <Button type="primary" onClick={completeOrder}>
              Genomför köp/beställning
            </Button>
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Checkout;
