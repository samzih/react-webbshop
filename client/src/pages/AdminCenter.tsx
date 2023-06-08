import AdminCreateProduct from "../components/AdminCreateProduct";
import { useUserContext } from "../context/UserContext";
import { Card, Typography } from "antd";
const AdminCenter = () => {
  const { loginUser } = useUserContext();
  return loginUser && loginUser.isAdmin ? (
    <div>
      <h1>initial</h1>
      <AdminCreateProduct />
    </div>
  ) : (
    <h1>404 You can't access this page</h1>
  );
};

export default AdminCenter;
