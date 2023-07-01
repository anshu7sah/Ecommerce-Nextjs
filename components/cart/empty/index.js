import styles from "./styles.module.scss";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

const Empty = () => {
  const { data: session } = useSession();
  return (
    <div className={styles.empty}>
      <img src="../../../images/empty.png" alt="" />
      <h1>Cart is empty</h1>
      {!session && (
        <button className={styles.empty__btn} onClick={() => signIn()}>
          SIGN IN / REGISTER
        </button>
      )}
      <Link
        href="/browse"
        className={`${styles.empty__btn} ${styles.empty__btn_v2}`}
      >
        SHOP NOW
      </Link>
    </div>
  );
};

export default Empty;
