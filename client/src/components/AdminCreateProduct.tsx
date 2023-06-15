import { useState } from "react";
import { Button, Form, Input, InputNumber, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../component-styling/admin.css"

import { useAdminContext } from "../context/AdminContext";
const AdminCreateProduct = () => {
  const { createNewProduct } = useAdminContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleClick = async () => {
    try {
      await form.validateFields();
      const fieldsValue = await form.getFieldsValue();

      const product = {
        title: fieldsValue.title,
        description: fieldsValue.description,
        price: fieldsValue.price,
        image: fieldsValue.image,
        inStock: fieldsValue.inStock,
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
    form.resetFields();
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
        cancelText="Avbryt"
      >
        <Form form={form} onFinish={handleClick}>
          <Form.Item
            name="title"
            label="Produktnamn"
            rules={[{ required: true, message: "Ange ett produktnamn" }]}
          >
            <Input placeholder="Cola" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Produktbeskrivning"
            rules={[{ required: true, message: "Ange en beskrivning" }]}
          >
            <Input placeholder="Starta dagen med en Coca Cola..." />
          </Form.Item>
          <Form.Item
            name="price"
            label="Produktpris"
            rules={[{ required: true, message: "Ange ett pris" }]}
          >
            <InputNumber style={{width: "100%"}} placeholder="100" controls={false} addonAfter="kr" />
          </Form.Item>
          <Form.Item
            name="image"
            label="Produktbild"
            rules={[
              { required: true, message: "Ange en URL"},
              { type: "url",  message: "Ange en giltig URL!"},
              // { type: "string", min: 6 },
            ]}
          >
            <Input placeholder="url" />
          </Form.Item>
          <Form.Item
            name="inStock"
            label="Produktantal"
            rules={[
              { required: true, message: "Ange antal produkter i lager" },
            ]}
          >
            <InputNumber style={{width: "100%"}} min={0} controls={false} placeholder="30" addonAfter="st" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminCreateProduct;
