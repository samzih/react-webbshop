import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Product } from "../components/HomePage/HomePage";
import { useLocalStorage } from "../utils/useLocalStorage";

interface CartContext {
  products: Product[];
  addProduct: (product: Product) => void;
}

const CartContext = createContext<CartContext>({
  products: [],
  addProduct: () => {},
});

export const useCartContext = () => useContext(CartContext);

//kanske kan använda denna på flera ställen då det
// sätter en initialValue, där vi själva får bestämma om det är en string/array/lr dylikt

//

const CartProvider = ({ children }: PropsWithChildren<{}>) => {
  // här sätter vi value och setValue v från den useLocalStorage funktionen
  const [products, setProducts] = useLocalStorage("cartProducts", []);
  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <div>
      <CartContext.Provider value={{ products, addProduct }}>
        {children}
      </CartContext.Provider>
    </div>
  );
};

export default CartProvider;
