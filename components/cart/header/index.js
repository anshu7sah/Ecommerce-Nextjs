import { MdPlayArrow } from "react-icons/md";
import styles from "./styles.module.scss";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__left}>
          <Link href={"/"}>
            <img src="../../../logo.png" alt="" />
          </Link>
        </div>
        <div className={styles.header__right}>
          <Link href={"/browse"}>
            Continue Shopping
            <MdPlayArrow />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
