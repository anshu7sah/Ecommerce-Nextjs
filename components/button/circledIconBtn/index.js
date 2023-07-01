import { BiRightArrowAlt } from "react-icons/bi";
import styles from "./styles.module.scss";
import React from "react";

const CircledIconBtn = ({ type, text, icon }) => {
  return (
    <button type={type} className={styles.button}>
      {text}
      <div className={styles.svg__wrap}>
        <BiRightArrowAlt />
      </div>
    </button>
  );
};

export default CircledIconBtn;
