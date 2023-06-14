import { Card, Space, Statistic } from "antd";


const AdminCard = ({ title, value, icon }) => {
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
