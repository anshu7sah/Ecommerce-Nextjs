import { useState } from "react";
import styles from "../styles.module.scss";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";

export default function ColorsFilter({ colors, colorhandler, replaceQuery }) {
  const [show, setShow] = useState(true);

  return (
    <div className={styles.filter}>
      <h3>
        Colors{" "}
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

      {show && (
        <div className={styles.filter__colors}>
          {colors.map((color, i) => {
            const check = replaceQuery("color", color);
            return (
              <button
                style={{ background: `${color}` }}
                key={i}
                className={check.active ? styles.activeFilterColor : ""}
                onClick={() => colorhandler(check.result)}
              ></button>
            );
          })}
        </div>
      )}
    </div>
  );
}
