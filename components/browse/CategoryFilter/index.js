import { useState } from "react";
import styles from "../styles.module.scss";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import Card from "./Card";

export default function CategoryFilter({
  categories,
  subCategories,
  categoryHandler,
  checkChecked,
  replaceQuery,
}) {
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
      <h3>
        Category{" "}
        <span>
          {show ? (
            <span>
              <FaMinus />
            </span>
          ) : (
            <BsPlusLg />
          )}
        </span>
      </h3>
      {show &&
        categories.map((category) => (
          <Card
            key={category._id}
            category={category}
            subCategories={subCategories}
            categoryHandler={categoryHandler}
            checkChecked={checkChecked}
            replaceQuery={replaceQuery}
          />
        ))}
    </div>
  );
}
