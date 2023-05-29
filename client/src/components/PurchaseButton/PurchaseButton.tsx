import { Button } from "antd";
import { useCartContext } from "../../context/CartContext";
import { Product } from "../HomePage/HomePage";

function PurchaseButton({ product }: { product: Product }) {
  const { addProduct } = useCartContext();
  return (
    <Button onClick={() => addProduct(product)} type="primary">
      Köp
    </Button>
  );
}

export default PurchaseButton;
