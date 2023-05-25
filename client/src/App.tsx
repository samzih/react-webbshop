import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { useState } from "react";

// export interface CartItem {
//   _id: number;
//   title: string;
//   image: string;
//   price: number;
//   inStock: number;
// }

function App() {
  // sätta state för order?
  // const [cartItems, setcartItem] = useState<CartItem[]>([]);

  // const addCartItem = (cartItem: CartItem): void => {
  //   setcartItem([...cartItems, cartItem]);
  // };
  //<Main addCartItem={addCartItem} />

  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
