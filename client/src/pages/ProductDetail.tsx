import { useState, useEffect } from "react";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import { IProduct } from "../context/ProductContext";
import PurchaseButton from "../components/PurchaseButton";
import "../Styling/ProductDetail.css";

function ProductDetail() {
  const [product, setProduct] = useState<IProduct>();

  function inStockChecker(inStock: number) {
    if (inStock <= 0) {
      return "Ej i lager";
    } else if (inStock <= 3) {
      return "Fåtal i lager";
    } else {
      return "I lager";
    }
  }

  const { id } = useParams();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();

        setProduct(data);
        document.title = `${data.title} - ${document.title}`;
      } catch (error) {
        console.log(error);
      }
    }

    fetchProducts();
  }, [id]);

  return product ? (
    <div className="singleitem">
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
