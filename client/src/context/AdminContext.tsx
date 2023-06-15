import { PropsWithChildren, createContext, useContext } from "react";
import { IProduct, useProductContext } from "./ProductContext";
interface AdminContext {
  createNewProduct: (product: CreateProduct) => object;
  deleteProduct: (data: IProduct) => void;
  updateProduct: (data: IProduct) => void;
  fetchProducts: () => void;
}

const AdminContext = createContext<AdminContext>({
  createNewProduct: () => Object,
  deleteProduct: () => Promise.resolve(),
  updateProduct: () => Promise.resolve(),
  fetchProducts: () => Promise.resolve(),
});

export interface CreateProduct {
  title: string;
  description: string;
  image: string;
  price: number;
  inStock: number;
}

export const useAdminContext = () => useContext(AdminContext);
const AdminProvider = ({ children }: PropsWithChildren<object>) => {
  const { fetchProducts } = useProductContext();

  const createNewProduct = async (product: CreateProduct) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      console.log(data);

      if (response.status === 201) {
        console.log("Success");
        fetchProducts();
      }
      if (response.status === 401 || response.status === 400) {
        console.log("Nope");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Put operation for product soft-deleted (true/false)
  async function deleteProduct(data: IProduct) {
    data = { ...data, deleted: true };
    try {
      await fetch(`/api/products/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  }

  //Update product
  async function updateProduct(data: IProduct) {
    try {
      await fetch(`/api/products/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <AdminContext.Provider
        value={{
          createNewProduct,
          deleteProduct,
          updateProduct,
          fetchProducts,
        }}
      >
        {children}
      </AdminContext.Provider>
    </div>
  );
};

export default AdminProvider;
