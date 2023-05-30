/* eslint-disable @typescript-eslint/no-empty-function */
import { PropsWithChildren, createContext, useContext, useEffect } from "react";
import { IProduct } from "../context/ProductContext";
import { useLocalStorage } from "../utils/useLocalStorage";

interface CartContext {
  cart: CartItem[];
  addToCart: (product: IProduct) => void;
  removeItem: (productId: number) => void;
}

export interface CartItem {
  product: IProduct;
  quantity: number;
}

const CartContext = createContext<CartContext>({
  cart: [],
  addToCart: () => {},
  removeItem: () => {},
});

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }: PropsWithChildren<object>) => {
  const [cart, setCart] = useLocalStorage("cart", []);
  const addToCart = (product: IProduct) => {
    const existingItem = cart.find(
      (item: CartItem) => item.product._id === product._id
    );
    if (existingItem) {
      existingItem.quantity++;
      setCart([...cart]);
    }
    setCart([...cart, { product, quantity: 1 }]);
  };


  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const removeItem = (productId: number) => {
    const newItemList = cart.filter(
      (item: CartItem) => item.product._id !== productId
    );
    setCart(newItemList);
  };

  // useEffect(() => {
  //   console.log(products);
  // }, [products]);


  return (
    <div>
      <CartContext.Provider value={{ cart, addToCart, removeItem }}>
        {children}
      </CartContext.Provider>
    </div>
  );
};

export default CartProvider;
