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

  function inStockChecker(inStock: number) {
    if (inStock === 0) {
      return "Ej i lager";
    } else if (inStock < 3) {
      return "Fåtal i lager";
    } else {
      return "I lager";
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
        document.title += data.title;
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
        <p>{inStockChecker(product.inStock)}</p>
        <p>{product.description}</p>
        <PurchaseButton product={product} />
      </Card>
    </div>
  ) : null;
}

export default ProductDetail;
