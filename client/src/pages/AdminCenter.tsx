import AdminCreateProduct from "../components/AdminCreateProduct";
import AdminCard from "../components/AdminCard";
import AdminProductTable from "../components/AdminProductTable";
import { useUserContext } from "../context/UserContext";
import { Space, Result, Typography } from "antd";
import {
  ShoppingCartOutlined,
  SkinOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import AdminOrdersTable from "../components/AdminOrdersTable";
import { useOrderContext } from "../context/OrderContext";
import { useProductContext } from "../context/ProductContext";
import { useEffect, useState } from "react";
import "../Styling/admin.css";

const AdminCenter = () => {
  const { loginUser } = useUserContext();
  const { products } = useProductContext();
  const { orders, fetchOrders } = useOrderContext();
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Goes into every order and adds order totalPrice to totalRevenue state
  useEffect(() => {
    if (orders.length >= 1) {
      const totalPrice = orders.reduce((accumulator: number, order) => {
        const orderItems = order.orderItems;
        const orderTotal = orderItems.reduce((subtotal: number, item) => {
          const itemPrice = item.price;

          return subtotal + itemPrice;
        }, 0);

        return accumulator + orderTotal;
      }, 0);
      setTotalRevenue(totalPrice);
    }
  }, [orders]);

  // Runs fetchOrders when user changes occur like logging in while on admin page
  useEffect(() => {
    fetchOrders();
  }, [loginUser]);

  // some styling for AdminCard
  const orderStyle = {
    color: "green",
    backgroundColor: "rgba(0,255,0,0.25)",
    borderRadius: 24,
    fontSize: 24,
    padding: 8,
  };
  const inventoryStyle = {
    color: "blue",
    backgroundColor: "rgba(0,0,255,0.25)",
    borderRadius: 24,
    fontSize: 24,
    padding: 8,
  };
  const revenueStyle = {
    color: "#fd5c63",
    backgroundColor: "rgba(255,0,0,0.25)",
    borderRadius: 24,
    fontSize: 24,
    padding: 8,
  };

  return loginUser && loginUser.isAdmin ? (
    <div style={{padding: 50}}>
      <h1>Adminpanel</h1>
      <div className="statisticsCard">
        <Space direction="horizontal">
          <AdminCard
            title={"Beställningar"}
            value={orders.length}
            icon={<ShoppingCartOutlined style={orderStyle} />}
          />
          <AdminCard
            title={"Lager"}
            value={products.length}
            icon={<SkinOutlined style={inventoryStyle} />}
          />

          <AdminCard
            title={"Intäkter/Inkomst"}
            value={`${totalRevenue} kr`}
            icon={<DollarOutlined style={revenueStyle} />}
          />
        </Space>
      </div>
      <AdminCreateProduct />
      <AdminProductTable />
      <AdminOrdersTable />
    </div>
  ) : (
    <Result
      status="403"
      title="403"
      subTitle={
        <Typography.Title level={4}>
          Tyvärr, du har inte behörighet att komma åt den här sidan.
        </Typography.Title>
      }
    />
  );
};

export default AdminCenter;
