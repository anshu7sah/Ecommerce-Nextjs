import { useState } from "react";
import styles from "../styles.module.scss";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import { useRouter } from "next/router";

export default function StylesFilter({ style, stylehandler, replaceQuery }) {
  const router = useRouter();
  const existedStyle = router.query.style || "";
  const [show, setShow] = useState(true);
  // const styleCombineHandler = (stl) => {
  //   if (existedStyle) {
  //     let tempStyle = existedStyle.split("_");
  //     let styleCheck = tempStyle.includes(stl);
  //     if (styleCheck) {
  //       let removed = tempStyle.filter((s) => s !== stl);

  //       removed.length > 0 ? stylehandler(removed.join("_")) : stylehandler({});
  //     } else {
  //       stylehandler(`${existedStyle}_${stl}`);
  //     }
  //   } else {
  //     stylehandler(stl);
  //   }
  // };

  return (
    <div className={styles.filter}>
      <h3>
        Styles{" "}
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
          style.map((stl, i) => {
            const check = replaceQuery("style", stl);
            return (
              <div
                className={styles.filter__sizes_size}
                key={i}
                onClick={() => stylehandler(check.result)}
              >
                <input
                  type="checkbox"
                  name="style"
                  id={stl}
                  // checked={existedStyle?.split("_").includes(stl)}
                  checked={check.active}
                />
                <label htmlFor={stl}>{stl}</label>
              </div>
            );
          })}
      </div>
    </div>
  );
}
