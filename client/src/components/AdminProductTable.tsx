import { Avatar, Button, Card, Space, Table } from "antd";
import { useProductContext } from "../context/ProductContext";
import { EditOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { useAdminContext } from "../context/AdminContext";

function AdminProductTable() {
    const { products } = useProductContext();
    const { deleteProduct } = useAdminContext();
    console.log("Produkter som kommer in:", products)


    const columns = [
    {
      title: "Bild",
      dataIndex: "image",
      render: (image: string, title: string) => {
        return <Avatar shape="square" size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} src={image} alt={title} />
      }
    },
    {
      title: "Titel",
      dataIndex: "title"
    },
    {
        title: "Pris",
        dataIndex: "price",
        render: (price: number) => price + "kr"
    },
    {
        title: "Beskrivning",
        dataIndex: "description"
    },
    {
        title: "I lager",
        dataIndex: "inStock"
    },
    {
        title: "Åtgärder/Operationer",
        render: (products) => {
            return (
                <>
                    <Space>
                        <Button type="primary" icon={<EditOutlined style={{ color: "white" }} />} ></Button>
                        <Button type="primary" onClick={() => deleteProduct(products)} icon={<CloseOutlined style={{ color: "white" }} />} danger ></Button>
                    </Space>
                </>
            );
        }
    }
  ]

  const titleButton = <Button type="primary" icon={<PlusOutlined />} style={{ margin: 18 }}>Lägg till ny produkt</Button>

  return (
    <>
        <Table columns={columns} dataSource={products} size="middle" bordered  rowKey="_id" caption={titleButton}/>
    </>
  );
}

export default AdminProductTable;