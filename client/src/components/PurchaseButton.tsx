/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "antd";
import { useCartContext } from "../context/CartContext";
import { IProduct } from "../context/ProductContext";
import "../index.css";

type Props = {
  product: IProduct;
};

// PurchaseButton tar in produkt och går bara att trycka på om produkten finns i lager
// och lägger till i kundvagnen genom funktionen addToCart

function PurchaseButton({ product }: Props) {
  const { cart } = useCartContext();
  const { addToCart } = useCartContext();

  const totalQuantityInCart = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const disableButtonCondition = totalQuantityInCart >= product.inStock;

  return (
    <div>
      <Button
        className="button"
        type="text"
        onClick={(e) => {
          e.preventDefault();
          addToCart(product);
        }}
        disabled={disableButtonCondition}
      >
        Handla
      </Button>
    </div>
  );
}

export default PurchaseButton;
