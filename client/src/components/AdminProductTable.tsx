import {
  Avatar,
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Space,
  Table,
} from "antd";
import { useProductContext } from "../context/ProductContext";
import { EditOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAdminContext } from "../context/AdminContext";
import { useState } from "react";
import { IProduct } from "../context/ProductContext";
import "../component-styling/admin.css"

function AdminProductTable() {
  const { products } = useProductContext();
  const { deleteProduct, updateProduct } = useAdminContext();
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [form] = Form.useForm();
  const [saveBtn, setSaveBtn] = useState(true);

  const columns = [
    {
      title: "Bild",
      dataIndex: "image",
      render: (image: string, product: IProduct) => {
        if (editingRow === product._id) {
          return (
            <Form.Item
              name="image"
              rules={[
                { required: true, message: "Ange en giltig URL" },
                { type: "url", message: "Ange en giltig URL" },
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
      render: (title: string, product: IProduct) => {
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
      render: (price: number, product: IProduct) => {
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
      render: (description: string, product: IProduct) => {
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
      render: (inStock: number, product: IProduct) => {
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
      //unusedParameter måste vara här
      render: (unusedParameter: any, product: IProduct) => {
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
              <Popconfirm
                title="Ta bort produkten"
                onConfirm={() => deleteProduct(product)}
                okText="Ja"
                cancelText="Nej"
                icon={<DeleteOutlined style={{ color: "red" }} />}
              >
                <Button
                  type="primary"
                  icon={<CloseOutlined style={{ color: "white" }} />}
                  danger
                ></Button>
              </Popconfirm>
            </Space>
          </>
        );
      },
    },
  ];

  const onFinish = (values: any) => {
    const newValue = { _id: editingRow, deleted: false, ...values };
    updateProduct(newValue);
    setEditingRow(null);
    setSaveBtn(true);
  };
  return (
    <>
    <div className="table">
      <Form form={form} onFinish={onFinish}>
        <Table
          columns={columns}
          pagination={{ position: ["bottomCenter"], size: "default" }}
          dataSource={products.reverse()}
          size="small"
          bordered
          rowKey="_id"
        />
      </Form>
      </div>
    </>
  );
}

export default AdminProductTable;
