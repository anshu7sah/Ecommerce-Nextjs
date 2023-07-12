import Layout from "../../../components/admin/layout";
import EnhancedTable from "../../../components/admin/users/table";
import User from "../../../models/User";
import { mongoConnect, mongoDisconnect } from "../../../utils/db";

export default function users({ userData }) {
  return (
    <Layout>
      <EnhancedTable rows={userData} />
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  await mongoConnect();
  const userData = await User.find({}).sort({ createdAt: -1 }).lean();
  await mongoDisconnect();
  return {
    props: {
      userData: JSON.parse(JSON.stringify(userData)),
    },
  };
}
