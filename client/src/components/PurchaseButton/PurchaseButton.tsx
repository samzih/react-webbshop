import { Button } from "antd";
import { useCartContext } from "../../context/CartContext";
import { IProduct } from "../../context/ProductContext";
type Props = {
  product: IProduct;
};

function PurchaseButton({ product }: Props) {
  const { addToCart } = useCartContext();
  return (
    <div>
      <Button
        onClick={(e) => {
          e.preventDefault();
          addToCart(product);
        }}
        type="primary"
      >
        Köp
      </Button>
    </div>
  );
}

export default PurchaseButton;
