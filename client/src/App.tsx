import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import CartProvider from "./context/CartContext";
import UserProvider from "./context/UserContext";
import ProductProvider from "./context/ProductContext";
function App() {
  return (
    <div>
      <ProductProvider>
        <CartProvider>
          <UserProvider>
            <Header />
            <Main />
          </UserProvider>
          <Footer />
        </CartProvider>
      </ProductProvider>
    </div>
  );
}

export default App;
