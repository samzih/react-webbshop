import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { Carousel } from "antd";
import { Link } from "react-router-dom";
import PurchaseButton from "../PurchaseButton/PurchaseButton";

export interface Product {
  _id: number;
  title: string;
  image: string;
  price: number;
  inStock: number;
}

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { Meta } = Card;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProducts();
  }, []);

  const contentStyle: React.CSSProperties = {
    height: '500px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: 'red',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <main>

      <Carousel autoplay>
        <div>
          <h1 style={{...contentStyle, backgroundImage: 'url("https://www.about-drinks.com/wp-content/uploads/2022/06/red-bull-energy-drink.jpg")'}}>1</h1>
        </div>
        <div>
          <h1 style={{...contentStyle, backgroundImage: 'url("https://usercontent.one/wp/www.swenico.se/wp-content/uploads/2022/08/Untitled-design-39-1-2048x1152.png-kopia.jpg?media=1675334743")'}}>2</h1>
        </div>
        <div>
          <h1 style={{...contentStyle, backgroundImage: 'url("https://www.fitnessguru.com/media/catalog/product/cache/60b7d85b9b5bb92ab90d10fd19a86d7d/o/n/one-whey-isolate-lifestyle-block.jpg")'}}>3</h1>
        </div>
        <div>
          <h1 style={{...contentStyle, backgroundImage: 'url("https://m.media-amazon.com/images/S/aplus-media-library-service-media/17c82ff5-2acb-493f-9d84-849687c58727.__CR0,0,970,600_PT0_SX970_V1___.jpg")'}}>4</h1>
        </div>
      </Carousel>

      <h1>Produkter kjosk</h1>

      {products.map((product) => (
        <div key={product._id}>
          <Link to={`/${product._id}`} key={product._id}>
            <Card
              bordered
              size="small"
              hoverable
              style={{ width: 200, padding: 10, margin: 10 }}
              cover={<img alt="example" src={product.image} />}
            >
              <Meta title={product.title} description={product.price + " kr"} />
              <PurchaseButton product={product} />
            </Card>
          </Link>
        </div>
      ))}
    </main>
  );
}

export default HomePage;
