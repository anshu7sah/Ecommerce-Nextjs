import { useState } from "react";
import styles from "../styles.module.scss";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import { useRouter } from "next/router";

export default function PatternsFilter({
  patterns,
  patternhandler,
  replaceQuery,
}) {
  const [show, setShow] = useState(true);
  const router = useRouter();
  const existedPattern = router.query.pattern || "";
  return (
    <div className={styles.filter}>
      <h3>
        Patterns{" "}
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
          patterns.map((pattern, i) => {
            const check = replaceQuery("pattern", pattern);
            return (
              <div
                className={styles.filter__sizes_size}
                key={i}
                onClick={() => patternhandler(check.result)}
              >
                <input
                  type="checkbox"
                  name="pattern"
                  id={pattern}
                  checked={check.active}
                />
                <label htmlFor={pattern}>
                  {pattern.length > 12
                    ? `${pattern.substring(0, 12)}...`
                    : pattern}
                </label>
              </div>
            );
          })}
      </div>
    </div>
  );
}
