import { useState } from "react";
import styles from "../styles.module.scss";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";

import Size from "./Size";

export default function SizesFilter({ sizes, sizehandler }) {
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
      <h3>
        Sizes{" "}
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
      <div className={styles.filter__sizes}>
        {show &&
          sizes.map((size, i) => (
            <Size key={i} size={size} sizehandler={sizehandler} />
          ))}
      </div>
    </div>
  );
}
