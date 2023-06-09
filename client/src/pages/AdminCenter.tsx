import AdminCreateProduct from "../components/AdminCreateProduct";
import AdminCard from "../components/AdminCard";
import AdminProductTable from "../components/AdminProductTable";
import { Space } from "antd";
import { ShoppingCartOutlined, TeamOutlined, SkinOutlined, DollarOutlined } from '@ant-design/icons';

import { useUserContext } from "../context/UserContext";
import { Card, Typography } from "antd";
const AdminCenter = () => {
  const { loginUser } = useUserContext();

  // lite styling för AdminCard (IGNORE THIS!)
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
        <AdminCard title={"Beställningar/Orders"} value={274} icon={<ShoppingCartOutlined style={orderStyle} />} />
        <AdminCard title={"Lager"} value={25} icon={<SkinOutlined />} />
        <AdminCard title={"Användare/Kunder"} value={98} icon={<TeamOutlined />} />
        <AdminCard title={"Intäkter/Inkomst"} value={9782 + " kr"} icon={<DollarOutlined />} />
      </Space>

      <AdminProductTable />
    </div>
  ) : (
    <h1>404 You can't access this page</h1>
  );
};

export default AdminCenter;
