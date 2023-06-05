import { useContext, useState } from "react";
// import { IProduct } from "../context/ProductContext";
import {
  Button,
  Col,
  Typography,
  Form,
  Input,
  Row,
  Select,
  Modal,
  Space,
} from "antd";

// const ProductCreateValidationSchema = Joi.object({
//   title: Joi.string().strict().required(),
//   description: Joi.string().strict().required(),
//   price: Joi.number().strict().required(),
//   image: Joi.string().uri().allow("image/png", "image/jpeg").required(),
//   inStock: Joi.number().strict().required(),
// });

import { useAdminContext } from "../context/AdminContext";
type Props = {};
const AdminCreateProduct = (props: Props) => {
  const { createNewProduct } = useAdminContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [inStock, setInStock] = useState("");
  const [form] = Form.useForm();
  function handleClick() {
    const priceInNumb = parseFloat(price);
    const inStockInNumb = parseInt(inStock);

    const product = {
      title,
      description,
      price: priceInNumb,
      image,
      inStock: inStockInNumb,
    };
    createNewProduct(product);
  }
  return (
    <div>
      <Form form={form}>
        <Form.Item
          name="title"
          label="Produktnamn"
          rules={[{ required: true, message: "Lägg till en title" }]}
        >
          <Input
            placeholder="Cola"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="Produktbeskrivning"
          rules={[{ required: true, message: "Ange en beskrivning" }]}
        >
          <Input
            placeholder="Starta dagen med en Coca Cola..."
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="price"
          label="Produktpris"
          rules={[{ required: true, message: "Ange ett pris" }]}
        >
          <Input placeholder="100" onChange={(e) => setPrice(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="image"
          label="Produktbild"
          rules={[{ required: true, message: "----" }]}
        >
          <Input placeholder="url" onChange={(e) => setImage(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="inStock"
          label="Produktantal"
          rules={[{ required: true, message: "Ange antal produkter i lager" }]}
        >
          <Input
            placeholder="30"
            onChange={(e) => setInStock(e.target.value)}
          />
        </Form.Item>
        <Button onClick={handleClick} type="primary">
          Skapa Produkt
        </Button>
      </Form>
    </div>
  );
};

export default AdminCreateProduct;
