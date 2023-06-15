/* eslint-disable @typescript-eslint/no-empty-function */
import { PropsWithChildren, createContext, useContext } from "react";
import { IProduct } from "../context/ProductContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CartContext {
  cart: CartItem[];
  addToCart: (product: IProduct) => void;
  removeItem: (productId: number) => void;
  increaseCartQuantity: (product: IProduct) => void;
  decreaseCartQuantity: (product: IProduct) => void;
  clearCart: () => void;
  totalSum: number;
}

export interface CartItem {
  product: IProduct;
  quantity: number;
  price: number;
}

const CartContext = createContext<CartContext>({
  cart: [],
  addToCart: () => {},
  removeItem: () => {},
  increaseCartQuantity: () => {},
  decreaseCartQuantity: () => {},
  clearCart: () => {},
  totalSum: 0,
});

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }: PropsWithChildren<object>) => {
  const [cart, setCart] = useLocalStorage("cart", []);

  const clearCart = () => {
    setCart([]);
  };
  const addToCart = (product: IProduct) => {
    const existingItem = cart.find(
      (item: CartItem) => item.product._id === product._id
    );
    if (existingItem) {
      existingItem.quantity++;
      setCart([...cart]);
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeItem = (productId: number) => {
    const newItemList = cart.filter(
      (item: CartItem) => item.product._id !== productId
    );
    setCart(newItemList);
  };

  const increaseCartQuantity = (product: IProduct) => {
    const currentItem = cart.find(
      (item: CartItem) => item.product._id === product._id
    );
    if (currentItem) {
      currentItem.quantity++;
      setCart([...cart]);
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const decreaseCartQuantity = (product: IProduct) => {
    const currentItem = cart.find(
      (item: CartItem) => item.product._id === product._id
    );
    if (currentItem) {
      currentItem.quantity--;
      setCart([...cart]);
    } else {
      setCart([...cart, { product, quantity: -1 }]);
    }
  };

  // Counting the total price of products in cart
  const totalSum = cart.reduce(
    (accumulator: number, item: CartItem) =>
      accumulator + item.product.price * item.quantity,
    0
  );

  return (
    <div>
      <CartContext.Provider
        value={{
          cart,
          clearCart,
          addToCart,
          removeItem,
          increaseCartQuantity,
          decreaseCartQuantity,
          totalSum,
        }}
      >
        {children}
      </CartContext.Provider>
    </div>
  );
};

export default CartProvider;
