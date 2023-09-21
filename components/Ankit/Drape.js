import React from "react";
import styles from "./index.module.css";
import Image from "next/image";
import IMAGE from "./a.jpg";

function Drape() {
  return (
    <div className={styles.Drape}>
      <h1>Drape in style</h1>
      <p>Fresh arrivals for late summer</p>
      <div className={styles.drapeCards}>
        <div className={styles.cardBox}>
          <Image src={IMAGE} className={styles.drapeImg} alt="clothing" />
          <p>Shirts</p>
          <p>$2500</p>
        </div>
        <div className={styles.cardBox}>
          <Image src={IMAGE} className={styles.drapeImg} alt="clothing" />
          <p>Jumper</p>
          <p>$2500</p>
        </div>
        <div className={styles.cardBox}>
          <Image src={IMAGE} className={styles.drapeImg} alt="clothing" />
          <p>Cotton T-shirts</p>
          <p>$2500</p>
        </div>
        <div className={styles.cardBox}>
          <Image src={IMAGE} className={styles.drapeImg} alt="clothing" />
          <p>Summer trending</p>
          <p>$2500</p>
        </div>
      </div>
    </div>
  );
}

export default Drape;
