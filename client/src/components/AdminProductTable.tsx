import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Space,
  Table,
} from "antd";
import { IProduct, useProductContext } from "../context/ProductContext";
import { EditOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { useAdminContext } from "../context/AdminContext";
import { useEffect, useState } from "react";

function AdminProductTable() {
  const { products } = useProductContext();
  const { deleteProduct, updateProduct } = useAdminContext();
  console.log("Produkter som kommer in:", products);
  // const [dataSource, setDataSource] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();
  const [saveBtn, setSaveBtn] = useState(true);

  // useEffect(() => {
  //   setDataSource(products);
  // }, []);

  const columns = [
    {
      title: "Bild",
      dataIndex: "image",
      render: (text: string, products: IProduct) => {
        if (editingRow === products._id) {
          return (
            <Form.Item name="image">
              <Input />
            </Form.Item>
          );
        } else {
          return (
            <Avatar
              shape="square"
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              src={text}
              alt={products.title}
            />
          );
        }
      },
    },
    {
      title: "Titel",
      dataIndex: "title",
      render: (text, products) => {
        if (editingRow === products._id) {
          return (
            <Form.Item name="title">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Pris",
      dataIndex: "price",
      // render: (price: number) => price + "kr",
      render: (text: number, products) => {
        console.log("i render", text);
        if (editingRow === products._id) {
          return (
            <Form.Item name="price">
              <InputNumber />
            </Form.Item>
          );
        } else {
          return `${text}kr`;
        }
      },
    },
    {
      title: "Beskrivning",
      dataIndex: "description",
      render: (text, products) => {
        if (editingRow === products._id) {
          return (
            <Form.Item name="description">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "I lager",
      dataIndex: "inStock",
      render: (text, products) => {
        if (editingRow === products._id) {
          return (
            <Form.Item name="inStock">
              <InputNumber />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Åtgärder/Operationer",
      render: (_, products) => {
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
                  // console.log("!!!!!!!!!!", products.price);
                  setEditingRow(products._id);
                  setSaveBtn(false);
                  form.setFieldsValue({
                    image: products.image,
                    title: products.title,
                    price: products.price,
                    description: products.description,
                    inStock: products.inStock,
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

  const titleButton = (
    <Button type="primary" icon={<PlusOutlined />} style={{ margin: 18 }}>
      Lägg till ny produkt
    </Button>
  );
  const onFinish = (values) => {
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
      <Form form={form} onFinish={onFinish}>
        <Table
          columns={columns}
          dataSource={products}
          size="middle"
          bordered
          rowKey="_id"
          caption={titleButton}
        />
      </Form>
    </>
  );
}

export default AdminProductTable;
//kom ihåg att lägga rules på form.items för validering
// rules={[
//   {
//     required: true,
//     message: "Please enter title",
//   },
// ]}
