import React, { useState } from "react";
import { Button, message, Steps, theme } from "antd";
import CartItem from "../components/CartItem";
import CheckoutForm from "../components/CheckoutForm";
import CheckoutShipping from "../components/CheckoutShipping";
import { useOrderContext } from "../context/OrderContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

function Checkout() {
  const { order, setOrder } = useOrderContext();
  const [submittable, setSubmittable] = useState(true);
  
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
    message.success("Processing complete!")

    let orderItems = JSON.parse(localStorage.getItem("cart"))

    // let orderItems = useLocalStorage("cart", "")
    setOrder({...order, orderItems: orderItems})

    sendOrder(order)
  }

   async function sendOrder(order: any) {
    const { deliveryAddress, orderItems, shippingMethod } = order;
    try {
      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deliveryAddress,
          orderItems,
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
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Föregående | Gå tillbaka
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" disabled={current > steps.length -3 && submittable} onClick={() => next()}>
            Nästa | Fortsätt
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={completeOrder}
          >
            Genomför köp/beställning
          </Button>
        )}
      </div>
    </div>
  );
}

export default Checkout;
