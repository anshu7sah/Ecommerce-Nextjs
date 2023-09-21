import React from "react";
import styles from "./index.module.css";

function Explore() {
  return (
    <div className={styles.explore}>
      <div className={styles.card}>
        <div className={styles.innerCard}>
          <h1>
            Beyond the Basics <br></br>Elevate Your Workwear Layers
          </h1>
          <button className={styles.expBtn}>Explore now &#62;</button>
       </div>
      </div>
    </div>
  );
}

export default Explore;
