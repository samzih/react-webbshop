import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductDetail from "../pages/ProductDetail";
import Checkout from "../pages/Checkout";
import AdminCenter from "../pages/AdminCenter";
// import CartItem from "../../App";

function Main() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<AdminCenter />} />
      </Routes>
    </main>
  );
}

export default Main;
