import React from "react";
import styles from "./index.module.css";
import IMAGE from "./a.jpg";
import Image from "next/image";

function PCategory() {
  return (
    <div className={styles.pCategory}>
      <h1>Preferred Category</h1>
      <div className={styles.mainContainer}>
        <div className={styles.dataContainer}>
          <Image src={IMAGE} className={styles.image} alt="clothing" />
          <p>Ladies Tanks</p>
        </div>
        <div className={styles.dataContainer}>
          <Image src={IMAGE} className={styles.image} alt="clothing" />
          <p>Men Trousers</p>
        </div>
        <div className={styles.dataContainer}>
          <Image src={IMAGE} className={styles.image} alt="clothing" />
          <p>Ladies Dresses</p>
        </div>
        <div className={styles.dataContainer}>
          <Image src={IMAGE} className={styles.image} alt="clothing" />
          <p>Kids Clothing</p>
        </div>
        <div className={styles.dataContainer}>
          <Image src={IMAGE} className={styles.image} alt="clothing" />
        <p>Mens T-shirts</p>
        </div>
        <div className={styles.dataContainer}>
          <Image src={IMAGE} className={styles.image} alt="clothing" />
          <p>Top trending</p>
        </div>
      </div>
    </div>
  );
}

export default PCategory;
