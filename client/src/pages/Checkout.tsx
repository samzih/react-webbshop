import React, { useState } from "react";
import { Button, Spin, Steps, theme } from "antd";
import CartItem from "../components/CartItem";
import CheckoutForm from "../components/CheckoutForm";
import CheckoutShipping from "../components/CheckoutShipping";
import { useOrderContext } from "../context/OrderContext";
import { useShippingContext } from "../context/CheckoutShippingContext";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import "../Styling/Checkout.css";

function Checkout() {
  const { cart } = useCartContext();
  const { order, setOrder, sendOrder } = useOrderContext();
  const [submittable, setSubmittable] = useState(true);
  const [spin, setSpin] = useState(false);
  const { shipping } = useShippingContext();
  const navigate = useNavigate();
  const cartItemString = localStorage.getItem("cart");
  const cartItem = cartItemString ? JSON.parse(cartItemString) : null;
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
    setSpin(true);
    // VI TROR ATT DET SKA FUNGERA UTAN DENNA MEN TA INTE BORT DEN FÖRRÄN SIST!
    // const cartItem = localStorage.getItem("cart");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const orderItems: any[] = cartItemString ? JSON.parse(cartItemString) : [];

    //Loop through cartitems and add them to order
    const updatedOrderItems = orderItems.map((item) => {
      const {
        product: { _id },
        ...rest
      } = item;
      return {
        ...rest,
        product: _id,
      };
    });

    const orderToSend = { ...order, orderItems: updatedOrderItems };
    setOrder(orderToSend);
    sendOrder(orderToSend, navigate);
  };

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
      {cartItem != null ? (
        <>
          <Steps current={current} items={items} />
          <Spin spinning={spin} tip="Vänligen vänta..." size="large">
            <div style={contentStyle}>{steps[current].content}</div>
          </Spin>
          <div style={{ marginTop: 24 }}>
            {current > 0 && (
              <Button
                type="text"
                className="checkoutbtn"
                style={{ margin: "0 8px" }}
                onClick={() => prev()}
              >
                Föregående
              </Button>
            )}
            {cart.length >= 1 ? (
              <>
                {current < steps.length - 1 && (
                  <Button
                    type="text"
                    className="checkoutbtn"
                    disabled={current > steps.length - 3 && submittable}
                    onClick={() => next()}
                  >
                    Nästa
                  </Button>
                )}
              </>
            ) : (
              <Button type="primary" onClick={() => navigate("/")}>
                Gå tillbaka
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="text"
                className="checkoutbtn"
                onClick={completeOrder}
              >
                Genomför köp
              </Button>
            )}
          </div>
        </>
      ) : (
        <>{(window.location.href = "/")}</>
      )}
    </div>
  );
}

export default Checkout;
