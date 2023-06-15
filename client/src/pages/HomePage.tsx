import ImgCarousel from "../components/ImgCarousel";
import ProductList from "../components/ProductList";
import "../Styling/HomePage.css"


function HomePage() {
  return (
    <main>
      
      <ImgCarousel />
      
      <h1>VÄLKOMMEN TILL KJOSK</h1>
      <div className="maincontent">
      <ProductList />
      </div>
    </main>
  );
}

export default HomePage;
