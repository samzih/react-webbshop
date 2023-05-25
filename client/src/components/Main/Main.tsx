import { Routes, Route } from "react-router-dom";
import Cart from "../Cart/Cart";
import HomePage from "../HomePage/HomePage";
import ProductDetail from "../ProductDetail/ProductDetail";
import Checkout from "../Checkout/Checkout";
// import CartItem from "../../App";

function Main() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </main>
  );
}

export default Main;
