/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "antd";
import { useCartContext } from "../../context/CartContext";
import { IProduct } from "../../context/ProductContext";
type Props = {
  product: IProduct;
};

function PurchaseButton({ product }: Props) {
  const { addProduct } = useCartContext();
  return (
    <div>
      <Button onClick={() => addProduct(product)} type="primary">
        Köp
      </Button>
    </div>
  );
}

export default PurchaseButton;
