import styles from "./styles.module.scss";
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import React, { useState } from "react";
import Link from "next/link";
import UserMenu from "./UserMenu";
import { useSession } from "next-auth/react";

const Top = ({ country }) => {
  const { data: session } = useSession();

  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <img src={country.flag} alt={country.name} />
            <span>Nepal / nrs</span>
          </li>
          <li className={styles.li}>
            <MdSecurity />
            <span>Buyer Protection</span>
          </li>
          <li className={styles.li}>
            <span>Customer Service</span>
          </li>
          <li className={styles.li}>
            <span>Help</span>
          </li>
          <li className={styles.li}>
            <BsSuitHeart />
            <Link href={"#"}>
              <span>Wishlist</span>
            </Link>
          </li>
          <li
            className={styles.li}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            onClick={() => setVisible((v) => !v)}
          >
            {session ? (
              <div className={styles.li}>
                <div className={styles.flex}>
                  <img src={session.user.image} alt="profile Image" />
                  <span>{session.user.name}</span>
                  <RiArrowDropDownFill />
                </div>
              </div>
            ) : (
              <div className={styles.li}>
                <div className={styles.flex}>
                  <RiAccountPinCircleLine />
                  <span>Account</span>
                  <RiArrowDropDownFill />
                </div>
              </div>
            )}
            {visible && <UserMenu session={session} />}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Top;
