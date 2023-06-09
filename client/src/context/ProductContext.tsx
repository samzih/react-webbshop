import {
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
  createContext,
} from "react";

export interface IProduct {
  _id: number;
  title: string;
  image: string;
  price: number;
  inStock: number;
}

interface IProductContext {
  products: IProduct[];
}

const ProductContext = createContext<IProductContext>({
  products: [],
});

export const useProductContext = () => useContext(ProductContext);

const ProductProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <ProductContext.Provider value={{ products }}>
        {children}
      </ProductContext.Provider>
    </div>
  );
};

export default ProductProvider;
