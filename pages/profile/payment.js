import styles from "../../styles/profile.module.scss";
import { getSession } from "next-auth/react";
import Layout from "../../components/profile/layout";
import User from "../../models/User";
import { useState } from "react";
import Payment from "../../components/checkout/payment";
import { toast } from "react-toastify";
import axios from "axios";

export default function PaymentPage({ user, tab, defaultPaymentMethod }) {
  const [dbPM, setDbPM] = useState(defaultPaymentMethod.defaultPaymentMethod);
  const [paymentMethod, setPaymentMethod] = useState(
    defaultPaymentMethod.defaultPaymentMethod
  );
  console.log(paymentMethod);
  const handlePM = async () => {
    try {
      const { data } = await axios.put("/api/user/changePM", {
        paymentMethod,
      });
      console.log(data);
      setDbPM(data.paymentMethod);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout session={user} tab={tab}>
      <div className={styles.header}>
        <h1>MY PAYMENT METHODS</h1>
      </div>
      <Payment
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        profile
      />
      <button
        disabled={!paymentMethod || paymentMethod == dbPM}
        className={`${styles.button} ${
          !paymentMethod || paymentMethod == dbPM ? styles.disabled : ""
        }`}
        onClick={() => handlePM()}
      >
        Save
      </button>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });
  const tab = query.tab || 0;
  const defaultPaymentMethod = await User.findById(session.user.id).select(
    "defaultPaymentMethod"
  );

  return {
    props: {
      user: session,
      tab,
      defaultPaymentMethod: JSON.parse(JSON.stringify(defaultPaymentMethod)),
    },
  };
}
