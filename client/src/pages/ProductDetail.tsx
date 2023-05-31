import { useState, useEffect } from "react";
import { Card } from "antd";
import { useParams } from "react-router-dom";

import "../component-styling/ProductDetail.css";
import PurchaseButton from "../components/PurchaseButton";

interface Product {
  _id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  inStock: number;
}

function ProductDetail() {
  //Kolla upp vad som ska vara i parantesen
  const [product, setProduct] = useState<Product>();
  const [inStock, setInStock] = useState("");

  function inStockChecker(product: Product) {
    if (product.inStock === 0) {
      setInStock("Ej i lager");
    } else if (product.inStock < 3) {
      setInStock("Fåtal i lager");
    } else {
      setInStock("I lager");
    }
  }

  // useEffect(() => {
  //   inStockChecker(product);
  // }, [product]);

  const { id } = useParams();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/${id}`
        );
        const data = await response.json();

        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProducts();
  }, [id]);

  return product ? (
    <div>
      <Card style={{ width: 500, padding: 10, margin: 10 }}>
        <h2>{product.title}</h2>
        <img alt="example" src={product.image} width={300} />
        <h3>{product.price + " kr"}</h3>
        <p>{inStock}</p>
        <p>{product.description}</p>
        <PurchaseButton product={product} />
      </Card>
    </div>
  ) : null;
}

export default ProductDetail;
