import styles from "../styles/checkout.module.scss";
import { getSession } from "next-auth/react";
import User from "../models/User";
import Cart from "../models/Cart";
import { mongoConnect, mongoDisconnect } from "../utils/db";
import Header from "../components/cart/header";
import Shipping from "../components/checkout/shipping";
import { useEffect, useState } from "react";
import Products from "../components/checkout/products";
import Payment from "../components/checkout/payment";
import Summary from "../components/checkout/summary";

export default function Checkout({ cart, user }) {
  const [addresses, setAddresses] = useState(user?.address || []);
  const [paymentMethod, setPaymentMethod] = useState("");

  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  useEffect(() => {
    let check = addresses.find((x) => x.active == true);
    if (check) {
      setSelectedAddress(check);
    } else {
      setSelectedAddress("");
    }
  }, [addresses]);

  return (
    <>
      <Header />
      <div className={`${styles.container} ${styles.checkout}`}>
        <div className={styles.checkout__side}>
          <Shipping
            addresses={addresses}
            setAddresses={setAddresses}
            user={user}
          />
          <Products cart={cart} />
        </div>
        <div className={styles.checkout__side}>
          <Payment
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
          <Summary
            totalAfterDiscount={totalAfterDiscount}
            setTotalAfterDiscount={setTotalAfterDiscount}
            user={user}
            cart={cart}
            paymentMethod={paymentMethod}
            selectedAddress={selectedAddress}
          />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongoConnect();
  const session = await getSession(context);
  const user = await User.findById(session?.user.id);
  const cart = await Cart.findOne({ user: user?._id });
  await mongoDisconnect();
  if (!cart) {
    return {
      redirect: {
        destination: "/cart",
      },
    };
  }

  return {
    props: {
      cart: JSON.parse(JSON.stringify(cart)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}
