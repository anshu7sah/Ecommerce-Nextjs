import React from "react";
import styles from "./index.module.css";

function Header() {
  return (
    <div className={styles.Header}>
      <div className={styles.left}>
        <h1>Logo</h1>
      </div>
      <div className={styles.right}>
        <div>
          <input type="text" placeholder="Search for everything" />
        </div>
        <div className={styles.buttonBox}>
          <button className={styles.login}>Login</button>
          <button className={styles.signup}>SignUp</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
