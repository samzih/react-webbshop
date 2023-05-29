import { PropsWithChildren, createContext, useContext, useState } from "react";

interface CartContext {
  products: string[];
  addProduct: (product: object) => void;
}

const CartContext = createContext<CartContext>({
  products: [],
  addProduct: () => {},
});

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }: PropsWithChildren<{}>) => {
  const [products, setProducts] = useState<string[]>([]);
  const addProduct = (product: string) => {
    setProducts([...products, product]);
  };

  return (
    <div>
      <CartContext.Provider value={{ products, addProduct }}>
        {children}
      </CartContext.Provider>
    </div>
  );
};

export default CartProvider;
