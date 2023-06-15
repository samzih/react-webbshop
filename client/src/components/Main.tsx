import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductDetail from "../pages/ProductDetail";
import Checkout from "../pages/Checkout";
import AdminCenter from "../pages/AdminCenter";
import OrderConfirmation from "../pages/OrderConfirmation";
import About from "../pages/About";
import Contact from "../pages/Contact";

function Main() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<AdminCenter />} />
        <Route path="/confirmation" element={<OrderConfirmation />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </main>
  );
}

export default Main;
