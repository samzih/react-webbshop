import { Link } from "react-router-dom";
import PurchaseButton from "./PurchaseButton";
import { useProductContext } from "../context/ProductContext";
import { Card } from "antd";
import "../component-styling/ProductList.css";

// Rendering av alla produkter på startsidan, där det även går att trycka på en handlaknapp
function ProductList() {
  const { Meta } = Card;
  const { products } = useProductContext();

  return (
    <div className="list">
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
    </div>
  );
}

export default ProductList;
