import styles from "./styles.module.scss";
import React from "react";

const Payment = () => {
  return (
    <div className={styles.footer__payment}>
      <h3>WE ACCEPT</h3>
      <div className={styles.footer__flexwrap}>
        <img src="../../../images/payment/visa.webp" alt="payment" />
        <img src="../../../images/payment/mastercard.webp" alt="payment" />
        <img src="../../../images/payment/paypal.webp" alt="payment" />
      </div>
    </div>
  );
};

export default Payment;
