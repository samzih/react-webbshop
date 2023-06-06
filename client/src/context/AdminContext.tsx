import { PropsWithChildren, createContext, useContext } from "react";
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
      if (response.status === 401) {
        console.log("Nope");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AdminContext.Provider
        value={{
          createNewProduct,
        }}
      >
        {children}
      </AdminContext.Provider>
    </div>
  );
};

export default AdminProvider;
