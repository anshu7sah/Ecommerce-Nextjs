import { useState } from "react";
import styles from "../styles.module.scss";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import { useRouter } from "next/router";

export default function MaterialsFilter({
  materials,
  materialhandler,
  replaceQuery,
}) {
  const router = useRouter();
  const existedMaterial = router.query.material || "";

  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
      <h3>
        Materials{" "}
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
          materials.map((material, i) => {
            const check = replaceQuery("material", material);
            return (
              <div
                className={styles.filter__sizes_size}
                key={i}
                onClick={() => materialhandler(check.result)}
              >
                <input
                  type="checkbox"
                  name="material"
                  id={material}
                  checked={check.active}
                />
                <label htmlFor={material}>
                  {material.length > 12
                    ? `${material.substring(0, 12)}...`
                    : material}
                </label>
              </div>
            );
          })}
      </div>
    </div>
  );
}
