import ImgCarousel from "../components/ImgCarousel";
import ProductList from "../components/ProductList";

function HomePage() {
  return (
    <main>
      <ImgCarousel />
      <h1>Produkter kjosk</h1>
      <ProductList />
    </main>
  );
}

export default HomePage;
