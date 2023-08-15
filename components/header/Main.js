import Link from "next/link";
import styles from "./styles.module.scss";

import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";

const Main = ({ searchHandler }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const router = useRouter();

  const [query, setQuery] = useState(router.query.search || "");

  const handleSearch = (e) => {
    e.preventDefault();

    if (router.pathname !== "/browse") {
      if (query.length > 1) {
        router.push(`/browse?search=${query}`);
      }
    } else {
      searchHandler(query);
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link href="/" className={styles.logo}>
          <img src="../../../logo.png" alt="shoppay logo" />
        </Link>
        <form onSubmit={(e) => handleSearch(e)} className={styles.search}>
          <input
            type="text"
            value={query}
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className={styles.search__icon}>
            <RiSearch2Line />
          </button>
        </form>
        <Link href={"/cart"} className={styles.cart}>
          <FaOpencart />
          <span>{cartItems.length}</span>
        </Link>
      </div>
    </div>
  );
};

export default Main;

