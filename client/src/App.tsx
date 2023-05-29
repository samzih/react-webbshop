import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import CartProvider from "./context/CartContext";
import UserProvider from "./context/UserContext";

function App() {
  return (
    <div>
      <CartProvider>
        <UserProvider>
          <Header />
          <Main />
        </UserProvider>
        <Footer />
      </CartProvider>
    </div>
  );
}

export default App;
