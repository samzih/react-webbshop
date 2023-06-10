import { Card, Space, Statistic } from "antd";

const AdminCard = ({ title, value, icon }) => {
    return (
        <Space direction="horizontal">
            <Card>
                <Space direction="horizontal">
                    {icon}
                    <Statistic title={title} value={value} />
                </Space>
            </Card>
        </Space>
    );
}

export default AdminCard;