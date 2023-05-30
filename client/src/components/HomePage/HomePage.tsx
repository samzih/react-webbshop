import ImgCarousel from "../ImgCarousel/ImgCarousel";
import ProductList from "../ProductList/ProductList";

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
