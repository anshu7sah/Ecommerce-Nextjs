import styles from "../../styles/profile.module.scss";
import { getSession } from "next-auth/react";
import Layout from "../../components/profile/layout";
import Order from "../../models/Order";
import { mongoConnect, mongoDisconnect } from "../../utils/db";
import Head from "next/head";
import { ordersLinks } from "../../data/profile";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import slugify from "slugify";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

export default function Orders({ user, tab, orders }) {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const cancelOrderHandler = async (id) => {
    try {
      const { data } = await axios.put(`/api/order/${id}/cancel`);
      console.log(data.message);
      setMessage(data.message);
    } catch (error) {
      setMessage(error?.response?.data?.message);
    }
  };

  return (
    <Layout session={user} tab={tab}>
      <Head>
        <title>Orders</title>
      </Head>
      <div className={styles.orders}>
        <div className={styles.header}>
          <h1>MY ORDERS</h1>
        </div>
        <nav>
          <ul>
            {ordersLinks.map((link, i) => (
              <li
                key={i}
                className={
                  slugify(link.name, { lower: true }) == router.query.q
                    ? styles.active
                    : ""
                }
              >
                <Link
                  href={`/profile/orders?filter=${
                    link.filter
                  }&tab=${tab}&q=${slugify(link.name, {
                    lower: true,
                  })}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <table>
          <thead>
            <tr>
              <td>Order id</td>
              <td>Products</td>
              <td>Payment Method</td>
              <td>Total</td>
              <td>Paid</td>
              <td>Status</td>
              <td>View</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i}>
                <td>{order._id}</td>
                <td className={styles.orders__images}>
                  {order.products.map((p) => (
                    <img src={p.image} alt="" key={p._id} />
                  ))}
                </td>
                <td>
                  {order.paymentMethod == "paypal"
                    ? "Paypal"
                    : order.paymentMethod == "credit_card"
                    ? "Credit Card"
                    : "COD"}
                </td>
                <td>{order.total}</td>
                <td className={styles.orders__paid}>
                  {order.isPaid ? (
                    <img src="../../../images/verified.png" alt="" />
                  ) : (
                    <img src="../../../images/unverified.png" alt="" />
                  )}
                </td>
                <td>{order.status}</td>
                <td>
                  <Link href={`/order/${order._id}`}>
                    <FiExternalLink />
                  </Link>
                </td>
                <td>
                  <button onClick={() => cancelOrderHandler(order._id)}>
                    Cancel Order
                  </button>
                </td>
              </tr>
            ))}
            {message ? <p>{message}</p> : ""}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });
  const tab = query.tab || 0;

  const filter = query.filter;
  let orders = [];
  await mongoConnect();

  if (!filter) {
    orders = await Order.find({ user: session?.user.id })
      .sort({
        createdAt: -1,
      })
      .lean();
  } else if (filter == "paid") {
    orders = await Order.find({ user: session?.user.id, isPaid: true })
      .sort({
        createdAt: -1,
      })
      .lean();
  } else if (filter == "unpaid") {
    orders = await Order.find({ user: session?.user.id, isPaid: false })
      .sort({
        createdAt: -1,
      })
      .lean();
  } else {
    orders = await Order.find({ user: session?.user.id, status: filter })
      .sort({
        createdAt: -1,
      })
      .lean();
  }

  await mongoDisconnect();

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
      user: session,
      tab,
    },
  };
}
