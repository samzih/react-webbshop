import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Product } from "../components/HomePage/HomePage";

interface CartContext {
  products: Product[];
  addProduct: (product: Product) => void;
}

const CartContext = createContext<CartContext>({
  products: [],
  addProduct: () => {},
});

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }: PropsWithChildren<{}>) => {
  const [products, setProducts] = useState<Product[]>([]);
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
