import styles from "../../styles/profile.module.scss";
import { getSession } from "next-auth/react";
import Layout from "../../components/profile/layout";
import User from "../../models/User";
import Shipping from "../../components/checkout/shipping";
import { useState } from "react";
export default function Address({ user, tab }) {
  const [addresses, setAddresses] = useState(user.currentUser.address);

  return (
    <Layout session={user.user} tab={tab}>
      <div className={styles.header} style={{ padding: "1rem" }}>
        <h2>Choose Default Address</h2>
      </div>
      <Shipping
        addresses={addresses}
        setAddresses={setAddresses}
        user={user.currentUser}
        profile
      />
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });
  const tab = query.tab || 0;

  const currentUser = await User.findById(session.user.id).lean();
  return {
    props: {
      user: {
        user: session,
        currentUser: JSON.parse(JSON.stringify(currentUser)),
      },
      tab,
    },
  };
}
