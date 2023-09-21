import React from "react";
import styles from "./index.module.css";
import Image from "next/image";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.upperContentBox}>
        <h2>Logo</h2>
        <div className={styles.commClass}>
          <h3>Info</h3>
          <a href="#">About us</a>
          <a href="#">Contact us</a>
          <a href="#">Social responsibility</a>
        </div>
        <div className={styles.commClass}>
          <h3>Help & Support</h3>
          <a href="#">Shipping info</a>
          <a href="#">Returns</a>
          <a href="#">How to order</a>
          <a href="#">How to track</a>
          <a href="#">Size guide</a>
        </div>
        <div className={styles.commClass}>
          <h3>Customer service</h3>
          <a href="#">Customer service</a>
          <a href="#">Terms & condition</a>
          <a href="#">Transactions</a>
          <a href="#">Feedback</a>
        </div>
        <div className={styles.commClass}>
          <h3>News letter</h3>
          <a href="#">Enter your email address</a>
        </div>
      </div>
      <div className={styles.lowerContentBox}>
        <p>flick@zone.com</p>
        <p>(123)456-789</p>
        <p>&#169; 2023 ABC. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
