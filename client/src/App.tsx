import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import CartProvider from "./context/CartContext";
import UserProvider from "./context/UserContext";
import ProductProvider from "./context/ProductContext";
import ShippingProvider from "./context/CheckoutShippingContext";
import AdminProvider from "./context/AdminContext";
import OrderProvider from "./context/OrderContext";
function App() {
  return (
    <div>
      <ProductProvider>
        <CartProvider>
          <ShippingProvider>
            <OrderProvider>
              <UserProvider>
                <AdminProvider>
                  <Header />
                  <Main />
                </AdminProvider>
              </UserProvider>
            </OrderProvider>
            <Footer />
          </ShippingProvider>
        </CartProvider>
      </ProductProvider>
    </div>
  );
}

export default App;
