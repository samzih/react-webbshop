import {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  useEffect,
} from "react";
import { Shipping } from "../context/CheckoutShippingContext";
import { CartItem } from "../context/CartContext";
interface Address {
  street: string;
  zipcode: string;
  city: string;
  country: string;
}

export interface Order {
  orderItems: CartItem[];
  deliveryAddress: Address;
  shippingMethod: string | number;
}

interface OrderContext {
  order: Order;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  sendOrder: (order: Order, navigate: (path: string) => void) => void;
  orderNr: string;
}

const defaultOrder = {
  orderItems: [],
  deliveryAddress: {} as Address,
  shippingMethod: "",
};

const OrderContext = createContext<OrderContext>({
  order: defaultOrder,
  setOrder: () => {},
  sendOrder: () => {},
  orderNr: "",
});

export const useOrderContext = () => useContext(OrderContext);

import { useCartContext } from "../context/CartContext";

const OrderProvider = ({ children }: PropsWithChildren) => {
  const [order, setOrder] = useState<Order>(defaultOrder);
  const [orderNr, setOrderNr] = useState("");
  const { clearCart, totalSum } = useCartContext();
  useEffect(() => {
    console.log(order);
  }, [order]);

  const addDataToOrderItems = () => {
    const cartItem = localStorage.getItem("cart");
    const orderItems: any[] = cartItem ? JSON.parse(cartItem) : [];
    totalSum;
    const updatedOrderItems = orderItems.map((item) => {
      const {
        product: { _id, title },
        ...rest
      } = item;
      return {
        ...rest,
        product: { _id, title },
      };
    });
    // const updatedOrderItemsWithTotalSum = {
    //   ...updatedOrderItems,
    //   totalSum: totalSum,
    // };

    const orderToSend = {
      ...order,
      orderItems: updatedOrderItems,
      totalSum: totalSum,
    };
    setOrder(orderToSend);
    console.log("Nu flätar vi om cartItemet:", orderToSend);
  };

  async function sendOrder(order: Order, navigate: (path: string) => void) {
    const { deliveryAddress, orderItems, shippingMethod } = order;
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderItems,
          deliveryAddress,
          shippingMethod,
        }),
      });
      const data = await response.json();
      console.log("Detta är vad som skickas till DB:", data);

      addDataToOrderItems();
      setOrderNr(data.orderNumber);
      navigate("/confirmation");
      clearCart();
    } catch {
      console.log(Error);
    }
  }

  // Vi behöver en ny GET som hämtar in orders från Databasen

  // Och sedan även en ny PUT som skickar/uppdaterar data ifall en order har blivit skickad/shipped eller inte (true/false)

  return (
    <div>
      <OrderContext.Provider value={{ order, setOrder, sendOrder, orderNr }}>
        {children}
      </OrderContext.Provider>
    </div>
  );
};

export default OrderProvider;
