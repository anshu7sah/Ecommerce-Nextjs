import React from "react";
import styles from "./index.module.css";
import Image from "next/image";
import IMAGE from "./a.jpg";
import { style } from "@mui/system";

function TinyTrend() {
  return (
    <div className={styles.tinyTrend}>
      <h1>Tiny Trendsetters</h1>
      <p>Stylish Delights for Kids</p>
      <div className={styles.imgCard}>
        <div className={styles.leftImg}>
          <Image src={IMAGE} className={styles.image1} alt="clothing" />
        </div>
        <div className={style.rightImg}>
          <div className={styles.rightImg1}>
            <Image src={IMAGE} className={styles.image2} alt="clothing" />
          </div>
          <div className={styles.rightImg2}>
            <Image src={IMAGE} className={styles.image2} alt="clothing" />
          </div>
        </div>
      </div>
        <div className={styles.btn}>
          <button className={styles.tinyBtn}>Explore now &#62;</button>
        </div>
    </div>
  );
}

export default TinyTrend;
