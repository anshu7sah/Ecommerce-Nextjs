import { useState } from "react";
import styles from "../styles.module.scss";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";

export default function GenderFilter({ genderhandler, replaceQuery }) {
  const genders = ["Men", "Women"];
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
      <h3>
        Gender{" "}
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
          genders.map((gender, i) => {
            const check = replaceQuery("gender", gender);
            return (
              <div
                className={styles.filter__sizes_size}
                key={i}
                onClick={() => genderhandler(check.result)}
              >
                <input
                  type="checkbox"
                  name="gender"
                  id={gender}
                  checked={check.active}
                />
                <label htmlFor={gender}>{gender}</label>
              </div>
            );
          })}
      </div>
    </div>
  );
}
