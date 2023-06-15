import {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  useEffect,
} from "react";
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
  totalSum: number;
}

interface OrderContext {
  order: Order;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
  sendOrder: (order: Order, navigate: (path: string) => void) => void;
  orderNr: string;
  orders: Order[];
  shippedUpdate: (shipped: boolean, id: string | number) => Promise<void>;
  fetchOrders: () => Promise<void>;
}

const defaultOrder = {
  orderItems: [],
  deliveryAddress: {} as Address,
  shippingMethod: "",
  totalSum: 0,
};

const OrderContext = createContext<OrderContext>({
  order: defaultOrder,
  setOrder: () => Promise.resolve(),
  sendOrder: () => Promise.resolve(),
  orderNr: "",
  orders: [] as Order[],
  shippedUpdate: () => Promise.resolve(),
  fetchOrders: () => Promise.resolve(),
});

export const useOrderContext = () => useContext(OrderContext);

import { useCartContext } from "../context/CartContext";

const OrderProvider = ({ children }: PropsWithChildren) => {
  const [order, setOrder] = useState<Order>(defaultOrder);
  const [orderNr, setOrderNr] = useState("");
  const { clearCart, totalSum } = useCartContext();
  const [orders, setOrders] = useState([]);

  const addDataToOrderItems = () => {
    const cartItem = localStorage.getItem("cart");
    const orderItems: CartItem[] = cartItem ? JSON.parse(cartItem) : [];
    totalSum;
    const updatedOrderItems = orderItems.map((item) => {
      const {
        product: { _id, title, image, price, inStock },
        ...rest
      } = item;
      return {
        ...rest,
        product: { _id, title, image, price, inStock },
      };
    });

    const orderToSend = {
      ...order,
      orderItems: updatedOrderItems,
      totalSum: totalSum,
    };
    setOrder(orderToSend);
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

      addDataToOrderItems();
      setOrderNr(data.orderNumber);
      navigate("/confirmation");
      clearCart();
    } catch {
      console.log(Error);
    }
  }

  // Fetches all the orders from database
  async function fetchOrders() {
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();
      response.ok && setOrders(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  // Updates backend shipped status from false to true
  async function shippedUpdate(shipped: boolean, id: string | number) {
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shipped: shipped,
        }),
      });
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <OrderContext.Provider
        value={{
          order,
          setOrder,
          sendOrder,
          orderNr,
          orders,
          shippedUpdate,
          fetchOrders,
        }}
      >
        {children}
      </OrderContext.Provider>
    </div>
  );
};

export default OrderProvider;
