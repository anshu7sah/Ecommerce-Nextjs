import styles from "./styles.module.scss";
import React from "react";
import MainSwiper from "./swiper";
import Offers from "./offers";
import Menu from "./Menu";
import User from "./User";
import Header from "./Header";

const Main = () => {
  return (
    <div className={styles.main}>
      <Header />
      <Menu />
      <MainSwiper />
      <Offers />
      <User />
    </div>
  );
};

export default Main;
