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

const OrderProvider = ({ children }: PropsWithChildren) => {
  const [order, setOrder] = useState<Order>(defaultOrder);
  const [orderNr, setOrderNr] = useState("");

  useEffect(() => {
    console.log(order);
  }, [order]);

  async function sendOrder(order: Order, navigate: (path: string) => void ) {
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
      setOrderNr(data.orderNumber);
      navigate("/confirmation")
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
