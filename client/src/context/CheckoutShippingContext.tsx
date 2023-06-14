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
  setValue: React.Dispatch<React.SetStateAction<Shipping>>;
  value: Shipping;
}
const defaultShipping = {
  _id: 0,
  company: "",
  price: 0,
  deliveryTimeInHours: 0,
};

const ShippingContext = createContext<ShippingContext>({
  shipping: [],
  calcDelivery: (shipping) => "",
  setValue: () => {},
  value: defaultShipping,
});

export const useShippingContext = () => useContext(ShippingContext);

const ShippingProvider = ({ children }: PropsWithChildren) => {
  const [shipping, setShipping] = useState<Shipping[]>([]);
  const [value, setValue] = useState<Shipping>(defaultShipping);

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
    return currentDate.toLocaleString("sv-SV", {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"});
  };

  return (
    <div>
      <ShippingContext.Provider
        value={{ shipping, calcDelivery, setValue, value }}
      >
        {children}
      </ShippingContext.Provider>
    </div>
  );
};

export default ShippingProvider;
