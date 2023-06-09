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
  orders: [],
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
  orders: [],
});

export const useOrderContext = () => useContext(OrderContext);

const OrderProvider = ({ children }: PropsWithChildren) => {
  const [order, setOrder] = useState<Order>(defaultOrder);
  const [orderNr, setOrderNr] = useState("");
  const [orders, setOrders] = useState([]);

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

  // Fetches all the orders from database
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("/api/orders");
        const data = await response.json();
        setOrders(data);
        // console.log("Fetches all the orders from database:", data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchOrders();
  }, [])

  // Och sedan även en ny PUT som skickar/uppdaterar data ifall en order har blivit skickad/shipped eller inte (true/false)

  return (
    <div>
      <OrderContext.Provider value={{ order, setOrder, sendOrder, orderNr, orders }}>
        {children}
      </OrderContext.Provider>
    </div>
  );
};

export default OrderProvider;
