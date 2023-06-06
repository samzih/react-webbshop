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
}

const defaultOrder = {
  orderItems: [],
  deliveryAddress: {} as Address,
  shippingMethod: "",
};

const OrderContext = createContext<OrderContext>({
  order: defaultOrder,
  setOrder: () => {},
});

export const useOrderContext = () => useContext(OrderContext);

const OrderProvider = ({ children }: PropsWithChildren) => {
  const [order, setOrder] = useState<Order>(defaultOrder);

  useEffect(() => {
    console.log(order);
  }, [order]);

  return (
    <div>
      <OrderContext.Provider value={{ order, setOrder }}>
        {children}
      </OrderContext.Provider>
    </div>
  );
};

export default OrderProvider;
