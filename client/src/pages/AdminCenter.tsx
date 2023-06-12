import AdminCreateProduct from "../components/AdminCreateProduct";
import AdminCard from "../components/AdminCard";
import AdminProductTable from "../components/AdminProductTable";
import { useUserContext } from "../context/UserContext";
import { Space, Result } from "antd";
import { ShoppingCartOutlined, SkinOutlined, DollarOutlined } from '@ant-design/icons';
import AdminOrdersTable from "../components/AdminOrdersTable";
import { useOrderContext } from "../context/OrderContext";
import { useProductContext } from "../context/ProductContext";

const AdminCenter = () => {
  const { loginUser } = useUserContext();
  const { products } = useProductContext();
  const { orders } = useOrderContext();

  // console.log(allOrders[0].orderItems[0].price)

  // Goes into every order and adds order sum to totalRevenue
  let totalRevenue = 0;
  function calcRevenue(totalRevenue) {
    orders.map(order => order.orderItems.map(orderItem => totalRevenue += orderItem.price))
    console.log("totalRevenue:", totalRevenue)
    return totalRevenue
  }

  // some styling for AdminCard (IGNORE THIS!)
  const orderStyle = {
    color: "green",
    backgroundColor: "rgba(0,255,0,0.25)",
    borderRadius: 24,
    fontSize: 24,
    padding: 8,
  }
  const inventoryStyle = {
    color: "blue",
    backgroundColor: "rgba(0,0,255,0.25)",
    borderRadius: 24,
    fontSize: 24,
    padding: 8,
  }
  const revenueStyle = {
    color: "#fd5c63",
    backgroundColor: "rgba(255,0,0,0.25)",
    borderRadius: 24,
    fontSize: 24,
    padding: 8,
  }

  return loginUser && loginUser.isAdmin ? (
    <div>
      <h1>initial</h1>
      <AdminCreateProduct />

      <Space direction="horizontal">
        <AdminCard title={"Beställningar/Orders"} value={orders.length} icon={<ShoppingCartOutlined style={orderStyle} />} />
        <AdminCard title={"Lager"} value={products.length} icon={<SkinOutlined style={inventoryStyle} />} />
        {/* <AdminCard title={"Användare/Kunder"} value={98} icon={<TeamOutlined />} /> */}
        <AdminCard title={"Intäkter/Inkomst"} value={`${calcRevenue(totalRevenue)} kr`} icon={<DollarOutlined style={revenueStyle} />} />
      </Space>

      <AdminProductTable />
      <AdminOrdersTable />
    </div>
  ) : (
    <Result status="403" title="403" subTitle="Tyvärr, du har inte behörighet att komma åt den här sidan." />
  );
};

export default AdminCenter;
