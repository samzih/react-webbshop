import { PropsWithChildren, createContext, useContext } from "react";
import { useProductContext } from "./ProductContext";
interface AdminContext {
  createNewProduct: (product: CreateProduct) => object;
}

const AdminContext = createContext<AdminContext>({
  createNewProduct: () => Object,
});

export interface CreateProduct {
  title: string;
  description: string;
  image: string;
  price: number;
  inStock: number;
}

// const ProductCreateValidationSchema = Joi.object({
//   title: Joi.string().strict().required(),
//   description: Joi.string().strict().required(),
//   price: Joi.number().strict().required(),
//   image: Joi.string().uri().allow("image/png", "image/jpeg").required(),
//   inStock: Joi.number().strict().required(),
// });

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
      if (response.status === 200) {
        console.log("Success");
      }
      if (response.status === 401 || response.status === 400) {
        console.log("Nope");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Put operation for product soft-deleted (true/false)
  async function deleteProduct(data) {
    console.log(data);

    data = { ...data, deleted: true };
    console.log("NEW!", data);

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

  //En put för att uppdatera produkt
  async function updateProduct(data) {
    console.log("updateProduct", data);

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
        }}
      >
        {children}
      </AdminContext.Provider>
    </div>
  );
};

export default AdminProvider;
