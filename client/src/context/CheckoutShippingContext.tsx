import {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";

export interface Shipping {
  _id: number;
  company: string;
  price: number;
  deliveryTimeInHours: number;
}

export interface ShippingContext {
  shipping: Shipping[];
  calcDelivery: (shipping: Shipping) => string;
}

const ShippingContext = createContext<ShippingContext>({
  shipping: [],
  calcDelivery: (shipping) => "",
});

export const useShippingContext = () => useContext(ShippingContext);

const ShippingProvider = ({ children }: PropsWithChildren) => {
  const [shipping, setShipping] = useState<Shipping[]>([]);

  useEffect(() => {
    async function fetchShippingMethod() {
      try {
        const response = await fetch("/api/shippingMethod");
        const data = await response.json();
        setShipping(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchShippingMethod();
  }, []);

  const calcDelivery = (shipping: Shipping) => {
    const { deliveryTimeInHours } = shipping;

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + deliveryTimeInHours);
    return currentDate.toLocaleString();
  };

  return (
    <div>
      <ShippingContext.Provider value={{ shipping, calcDelivery }}>
        {children}
      </ShippingContext.Provider>
    </div>
  );
};

export default ShippingProvider;
