import { Table, Checkbox } from "antd";
import { Order, useOrderContext } from "../context/OrderContext";

interface OrderData extends Order {
  _id: string;
  orderNumber: string;
  shipped: boolean;
  createdAt: string;
  customer: {
    firstName: string;
    lastName: string;
  };
}

function AdminOrdersTable() {
  const { orders, shippedUpdate } = useOrderContext();
  // console.log("Orders som kommer in:", orders);

  const data = orders.map((order: Order) => {
    const orderData = order as OrderData;
    const {
      _id,
      orderNumber,
      shipped,
      createdAt,
      customer,
      deliveryAddress,
      orderItems,
    } = orderData;
    const { firstName, lastName } = customer;
    const { city, street, zipcode } = deliveryAddress;

    const orderItem = orderItems.map((orderItem) => orderItem.price);
    const orderSum = orderItem.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    return {
      key: _id,
      orderNumber: orderNumber,
      date: createdAt,
      customerName: `${firstName} ${lastName}`,
      address: `${street}, ${zipcode}, ${city}`,
      orderTotal: `${orderSum} kr`,
      shipped: shipped,
    };
  });

  console.log("data map:", data);

  const columns = [
    {
      title: "Ordernummer",
      dataIndex: "orderNumber",
      key: "should be the same as dataindex here",
    },
    {
      title: "Datum",
      dataIndex: "date",
      key: "should be the same as dataindex here",
    },
    {
      title: "Kundnamn",
      dataIndex: "customerName",
      key: "should be the same as dataindex here",
    },
    {
      title: "Adress",
      dataIndex: "address",
      key: "should be the same as dataindex here",
    },
    {
      title: "Order belopp",
      dataIndex: "orderTotal",
      key: "should be the same as dataindex here",
    },
    {
      title: "Skickad",
      dataIndex: "shipped",
      key: "shipped",
      render: (shipped: boolean, data: any) => {
        return (
          <Checkbox
            checked={shipped}
            onChange={(e) => shippedUpdate(e.target.checked, data.key)}
          />
        );
      },
    },
  ];

  return (
    <>
      <h2>Orderlista</h2>
      <Table columns={columns} dataSource={data} />
    </>
  );
}

export default AdminOrdersTable;
