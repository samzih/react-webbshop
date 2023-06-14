import { Card, Space, Statistic } from "antd";
import { ReactElement } from "react";
interface AdminCardProps {
  title: string;
  value: number | string;
  icon: ReactElement;
}
const AdminCard = ({ title, value, icon }: AdminCardProps) => {
  return (
    <div>
    <Space direction="horizontal">
      <Card>
        <Space  direction="horizontal">
          {icon}
          <Statistic title={title} value={value} />
        </Space>
      </Card>
    </Space>
    </div>
  );
};

export default AdminCard;
