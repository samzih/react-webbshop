import { Avatar, Button, Form, Input, InputNumber, Space, Table } from "antd";
import { useProductContext } from "../context/ProductContext";
import { EditOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { useAdminContext } from "../context/AdminContext";
import { useState } from "react";
import { Product } from "../pages/ProductDetail";

function AdminProductTable() {
  const { products } = useProductContext();
  const { deleteProduct, updateProduct } = useAdminContext();
  console.log("Produkter som kommer in:", products);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [form] = Form.useForm();
  const [saveBtn, setSaveBtn] = useState(true);

  const columns = [
    {
      title: "Bild",
      dataIndex: "image",
      render: (image: string, product: Product) => {
        if (editingRow === product._id) {
          return (
            <Form.Item
              name="image"
              rules={[
                { required: true, message: "Ange en giltig URL" },
                { type: "url", message: "Ange en giltig URL" },
                { type: "string", min: 6, message: "Minst 6 tecken krävs" },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return (
            <Avatar
              shape="square"
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              src={image}
              alt={product.title}
            />
          );
        }
      },
    },
    {
      title: "Titel",
      dataIndex: "title",
      render: (title: string, product: Product) => {
        if (editingRow === product._id) {
          return (
            <Form.Item
              name="title"
              rules={[
                { required: true, message: "Ange en titel" },
                { type: "string", message: "Ange en titel" },
                { type: "string", min: 3, message: "Minst 3 tecken krävs" },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{title}</p>;
        }
      },
    },
    {
      title: "Pris",
      dataIndex: "price",
      render: (price: number, product: Product) => {
        console.log("i render", price);
        if (editingRow === product._id) {
          return (
            <Form.Item
              name="price"
              rules={[
                { required: true, message: "Ange ett nummer" },
                { type: "number", message: "Ange ett nummer" },
              ]}
            >
              <InputNumber />
            </Form.Item>
          );
        } else {
          return `${price}kr`;
        }
      },
    },
    {
      title: "Beskrivning",
      dataIndex: "description",
      render: (description: string, product: Product) => {
        if (editingRow === product._id) {
          return (
            <Form.Item
              name="description"
              rules={[
                { required: true, message: "Ange en beskrivning" },
                { type: "string", message: "Ange en beskrivning" },
                { type: "string", min: 6, message: "Minst 6 tecken krävs" },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{description}</p>;
        }
      },
    },
    {
      title: "I lager",
      dataIndex: "inStock",
      render: (inStock: number, product: Product) => {
        if (editingRow === product._id) {
          return (
            <Form.Item
              name="inStock"
              rules={[
                { required: true, message: "Ange ett nummer" },
                { type: "number", message: "Ange ett nummer" },
              ]}
            >
              <InputNumber />
            </Form.Item>
          );
        } else {
          return <p>{inStock}</p>;
        }
      },
    },
    {
      title: "Åtgärder/Operationer",
      render: (_, product: Product) => {
        return (
          <>
            <Space>
              <Button
                style={saveBtn ? { display: "none" } : { display: "block" }}
                htmlType="submit"
              >
                Save
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setEditingRow(product._id);
                  setSaveBtn(false);
                  form.setFieldsValue({
                    image: product.image,
                    title: product.title,
                    price: product.price,
                    description: product.description,
                    inStock: product.inStock,
                  });
                }}
                icon={<EditOutlined style={{ color: "white" }} />}
              ></Button>
              <Button
                type="primary"
                onClick={() => deleteProduct(products)}
                icon={<CloseOutlined style={{ color: "white" }} />}
                danger
              ></Button>
            </Space>
          </>
        );
      },
    },
  ];

  const onFinish = (values: any) => {
    console.log("hehe", values);
    console.log("är detta id?", editingRow);
    const newValue = { _id: editingRow, deleted: false, ...values };
    console.log("new value", newValue);
    updateProduct(newValue);
    setEditingRow(null);
    setSaveBtn(true);
  };
  return (
    <>
      <h2>Produktlista</h2>
      <Form form={form} onFinish={onFinish}>
        <Table
          columns={columns}
          dataSource={products}
          size="middle"
          bordered
          rowKey="_id"
        />
      </Form>
    </>
  );
}

export default AdminProductTable;
