import { Link } from "react-router-dom";
import PurchaseButton from "./PurchaseButton";
import { useProductContext } from "../context/ProductContext";
import { Card } from "antd";

function ProductList() {
  const { Meta } = Card;
  const { products } = useProductContext();

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
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
