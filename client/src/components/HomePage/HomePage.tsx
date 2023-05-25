import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { Carousel } from "antd";
import { Link } from "react-router-dom";

interface Products {
  _id: number;
  title: string;
  image: string;
  price: number;
  inStock: number;
}

function HomePage() {
  const [products, setProducts] = useState<Products[]>([]);
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
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    // backgroundImage:
  };

  return (
    <main>
      <Carousel autoplay>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
          alt=""
          width={30}
        />
        <img
          style={contentStyle}
          src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
          alt=""
        />
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
            </Card>
          </Link>
        </div>
      ))}
    </main>
  );
}

export default HomePage;
