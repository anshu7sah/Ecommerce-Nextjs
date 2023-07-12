import Layout from "../../../components/admin/layout";
import CollapsibleTable from "../../../components/admin/orders/table";
import User from "../../../models/User";
import Order from "../../../models/Order";
import { mongoConnect, mongoDisconnect } from "../../../utils/db";
export default function orders({ orderData }) {
  console.log(orderData);
  return (
    <Layout>
      <CollapsibleTable rows={orderData} />
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  await mongoConnect();
  const orders = await Order.find({})
    .populate({ path: "user", model: User, select: "name email image" })
    .sort({ createdAt: -1 })
    .lean();

  await mongoDisconnect();
  return {
    props: {
      orderData: JSON.parse(JSON.stringify(orders)),
    },
  };
}
