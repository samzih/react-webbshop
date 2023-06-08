/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "antd";
import { useCartContext } from "../context/CartContext";
import { IProduct } from "../context/ProductContext";
import "../index.css"

type Props = {
  product: IProduct;
};

function PurchaseButton({ product }: Props) {
  const { addToCart } = useCartContext();
  return (
    <div>
      <Button 
      className="button"
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
