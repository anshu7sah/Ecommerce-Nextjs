import { useState } from "react";
import styles from "../styles.module.scss";
import { FaMinus } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import { useRouter } from "next/router";

export default function BrandsFilter({ brands, brandHandler, replaceQuery }) {
  const [show, setShow] = useState(true);
  const router = useRouter();
  const existedBrand = router.query.brand || "";
  return (
    <div className={styles.filter}>
      <h3>
        Brands{" "}
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
          brands.map((brand, i) => {
            const check = replaceQuery("brand", brand);

            return (
              <button
                key={i}
                className={`${styles.filter__brand} ${
                  check.active ? styles.activeFilter : ""
                }`}
                onClick={() => brandHandler(check.result)}
              >
                <img src={`../../../images/brands/${brand}.png`} alt="" />
              </button>
            );
          })}
      </div>
    </div>
  );
}
