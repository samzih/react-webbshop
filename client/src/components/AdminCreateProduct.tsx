import { useState } from "react";
import { Alert, Button, Form, Input, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../component-styling/admin.css"

import { useAdminContext } from "../context/AdminContext";
const AdminCreateProduct = () => {
  const { createNewProduct } = useAdminContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [inStock, setInStock] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [form] = Form.useForm();

  const handleClick = async () => {
    try {
      await form.validateFields();
      const values = await form.getFieldsValue();

      if (
        Object.values(values).some(
          (value) => value === undefined || value === ""
        )
      ) {
        setErrorMessage("Fyll i alla fälten!");
        return;
      }

      const priceInNumb = parseFloat(values.price);
      const inStockInNumb = parseInt(values.inStock);

      const product = {
        title: values.title,
        description: values.description,
        price: priceInNumb,
        image: values.image,
        inStock: inStockInNumb,
      };
      createNewProduct(product);
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.log("Fel vid validering:", error);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2 className="h2">Produktlista</h2>
      <Button
        type="primary"
        onClick={showModal}
        icon={<PlusOutlined />}
        style={{ margin: 18, display: "flex", justifyContent: "end" }}
      >
        Lägg till ny produkt
      </Button>
      <Modal
        title="Lägg till ny produkt"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Skapa produkt"
        cancelText="Stäng"
      >
        {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
        <Form form={form} onFinish={handleClick}>
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
            <Input
              placeholder="100"
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="image"
            label="Produktbild"
            rules={[
              { required: true, message: "Ange en giltig URL" },
              { type: "url", warningOnly: true },
              { type: "string", min: 6 },
            ]}
          >
            <Input
              placeholder="url"
              onChange={(e) => setImage(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="inStock"
            label="Produktantal"
            rules={[
              { required: true, message: "Ange antal produkter i lager" },
            ]}
          >
            <Input
              placeholder="30"
              onChange={(e) => setInStock(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminCreateProduct;
