import { useState, useEffect } from "react";
import { Card, Button } from "antd";
import { useParams } from "react-router-dom";

import "./ProductDetail.css";
import PurchaseButton from "../PurchaseButton/PurchaseButton";

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
  const [product, setProduct] = useState<Product>("");

  const { id } = useParams();

  useEffect(
    () => {
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
    } /* Varför ska vi ha [] */
  );

  return (
    <div>
      <Card style={{ width: 500, padding: 10, margin: 10 }}>
        <h2>{product.title}</h2>
        <img alt="example" src={product.image} width={300} />
        <h3>{product.price + " kr"}</h3>
        <p>{"I lager: " + product.inStock}</p>
        <p>{product.description}</p>
        <PurchaseButton product={product} />
      </Card>
    </div>
  );
}

export default ProductDetail;
