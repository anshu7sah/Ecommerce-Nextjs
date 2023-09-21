import React from "react";
import styles from "./index.module.css";
import IMAGE from "./a.jpg";
import Image from "next/image";

function FrontPage() {
  return (
    <div className={styles.frontPage}>
      <div>
        <div className={styles.top}>
          <p className={styles.mainText}>A future that eases your life</p>
          <p className={styles.subText}>
            Elevate Your Style. Discover the Latest Trends
          </p>
        </div>
        <div className={styles.bottom}>
         <Image src={IMAGE} className={styles.img} alt="clothing" />
          <button className={styles.shop}>Show now	&#62;</button>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;
