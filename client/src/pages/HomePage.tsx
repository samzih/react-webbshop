import ImgCarousel from "../components/ImgCarousel";
import ProductList from "../components/ProductList";
import "../pages/HomePage.css"


function HomePage() {
  return (
    <main>
      <ImgCarousel />
      <h1>VÄLKOMMEN TILL KJOSK</h1>
      <ProductList />
    </main>
  );
}

export default HomePage;
