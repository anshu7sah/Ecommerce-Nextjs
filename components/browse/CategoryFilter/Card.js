import Link from "next/link";
import styles from "../styles.module.scss";
import { useState } from "react";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
export default function Card({
  category,
  subCategories,
  categoryHandler,
  checkChecked,
  replaceQuery,
}) {
  const [show, setShow] = useState(false);
  // const check = checkChecked("category", category._id);
  const check = replaceQuery("category", category._id);

  return (
    <>
      <section>
        <li onClick={() => categoryHandler(check.result)}>
          <input
            type="checkbox"
            name="filter"
            id={category._id}
            checked={check.active}
            readOnly
          />
          <label htmlFor={category._id}>{category.name}</label>
          <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
        </li>
      </section>
    </>
  );
}
