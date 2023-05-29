import { Button } from "antd";
import { useCartContext } from "../../context/CartContext";
import { Product } from "../HomePage/HomePage";
type Props = {
  product: Product;
};

function PurchaseButton({ product }: Props) {
  const { products, addProduct } = useCartContext();
  return (
    <div>
      <Button onClick={() => addProduct(product)} type="primary">
        Köp
      </Button>
    </div>
  );
}

export default PurchaseButton;
