import Link from "next/link";
import styles from "../styles.module.scss";
import { useState } from "react";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import { useRouter } from "next/router";
export default function Size({ size, sizehandler }) {
  const router = useRouter();
  const existedSize = router.query.size || "";
  return (
    <div
      className={styles.filter__sizes_size}
      onClick={() => sizehandler(existedSize ? `${existedSize}_${size}` : size)}
    >
      <input type="checkbox" name="size" id={size} />
      <label htmlFor={size}>{size}</label>
    </div>
  );
}
