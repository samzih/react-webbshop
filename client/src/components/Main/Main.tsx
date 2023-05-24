import { Routes, Route } from "react-router-dom";
import CartMain from "../CartMain/CartMain";
import ProductPage from "../ProductPage/ProductPage";
import ProductDetail from "../ProductDetail/ProductDetail";
import Checkout from "../Checkout/Checkout";
function Main() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/cart" element={<CartMain />} />
        <Route path="/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </main>
  );
}

export default Main;
