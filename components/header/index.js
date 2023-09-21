import Ad from "./Ad";
import Main from "./Main";
import Top from "./Top";
import styles from "./styles.module.scss";
import React from "react";

export default function Header({ country, searchHandler }) {
  return (
    <header className={styles.header}>
      {/* <Ad /> */}
      <Top country={country} />
      <Main searchHandler={searchHandler} />
    </header>
  );
}
