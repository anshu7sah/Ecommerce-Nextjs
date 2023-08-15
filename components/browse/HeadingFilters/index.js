import { Tooltip } from "@mui/material";
import styles from "./styles.module.scss";
import { AiTwotoneStar } from "react-icons/ai";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { BsCheckLg } from "react-icons/bs";
import { useRouter } from "next/router";

const sortingOptions = [
  {
    name: "Recommend",
    value: "",
  },
  {
    name: "Most Popular",
    value: "popular",
  },
  {
    name: "New Arrivals",
    value: "newest",
  },
  {
    name: "Top Selling",
    value: "topSelling",
  },
  {
    name: "Top Reviewed",
    value: "topReviewed",
  },
  {
    name: "Price (low to high)",
    value: "priceLowToHight",
  },
  {
    name: "Price (high to low)",
    value: "priceHighToLow",
  },
];

export default function HeadingFilters({
  pricehandler,
  multiPriceHandler,
  shippinghandler,
  replaceQuery,
  ratinghandler,
  sortHandler,
}) {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const check = replaceQuery(
    "shipping",
    router.query.shipping == "0" ? false : "0"
  );
  const ratingCheck = replaceQuery("rating", "4");
  const sortQuery = router.query.sort || "";

  return (
    <div className={styles.filter}>
      <div className={styles.filter__price}>
        <span>Price :</span>
        <input
          type="number"
          placeholder="min"
          min={"0"}
          value={router.query.price?.split("_")[0]}
          onChange={(e) => pricehandler(e.target.value, "min")}
        />
        <input
          type="number"
          placeholder="max"
          min={"0"}
          value={router.query.price?.split("_")[1]}
          onChange={(e) => pricehandler(e.target.value, "max")}
        />
      </div>
      <div className={styles.filter__priceBtns}>
        <Tooltip
          title={<h2>Check out products under 10$</h2>}
          placement="top"
          arrow
          onClick={() => multiPriceHandler(0, 10)}
        >
          <button className={styles.tooltip_btn}>
            <span style={{ height: "10%" }}></span>
          </button>
        </Tooltip>
        <Tooltip
          title={<h2>Check out products between 10$ and 50$</h2>}
          placement="top"
          arrow
          onClick={() => multiPriceHandler(10, 50)}
        >
          <button className={styles.tooltip_btn}>
            <span style={{ height: "25%" }}></span>
          </button>
        </Tooltip>
        <Tooltip
          title={<h2>Check out products between 50$ and 100$</h2>}
          placement="top"
          arrow
          onClick={() => multiPriceHandler(50, 100)}
        >
          <button className={styles.tooltip_btn}>
            <span style={{ height: "50%" }}></span>
          </button>
        </Tooltip>
        <Tooltip
          title={<h2>Check out products between 100$ and 500$</h2>}
          placement="top"
          arrow
          onClick={() => multiPriceHandler(100, 500)}
        >
          <button className={styles.tooltip_btn}>
            <span style={{ height: "75%" }}></span>
          </button>
        </Tooltip>
        <Tooltip
          title={<h2>Check out products for more than 500$</h2>}
          placement="top"
          arrow
          onClick={() => multiPriceHandler(500, Infinity)}
        >
          <button className={styles.tooltip_btn}>
            <span style={{ height: "100%" }}></span>
          </button>
        </Tooltip>
      </div>
      <div
        className={styles.filter__shipping}
        onClick={() => shippinghandler(check.result)}
      >
        <input
          type="checkbox"
          name="shipping"
          id="shipping"
          checked={router.query.shipping == "0"}
        />
        <label htmlFor="shipping">Free Shipping</label>
      </div>
      <div
        className={styles.filter__rating}
        onClick={() => ratinghandler(ratingCheck.result)}
      >
        <input
          type="checkbox"
          name="rating"
          id="rating"
          checked={ratingCheck.active}
        />
        <label htmlFor="rating">
          <AiTwotoneStar />
          <AiTwotoneStar />
          <AiTwotoneStar />
          <AiTwotoneStar /> & up
        </label>
      </div>
      <div className={styles.filter__sort}>
        <span>Sort by</span>
        <div
          className={styles.filter__sort_list}
          onMouseOver={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <button>
            {sortQuery == ""
              ? "Recommend"
              : sortingOptions.find((x) => x.value == sortQuery)?.name}
            <div
              style={{ tarnsform: `${show ? "rotate(180deg)" : "rotate(0"}` }}
            >
              <IoIosArrowDown />
            </div>
          </button>
          <ul
            style={{
              transform: `${show ? "scale3d(1,1,1)" : "scale3d(1,0,1)"}`,
            }}
          >
            {sortingOptions.map((option, i) => (
              <li key={i} onClick={() => sortHandler(option.value)}>
                <a>
                  {sortQuery == option.value ? (
                    <b>{option.name}</b>
                  ) : (
                    option.name
                  )}{" "}
                  {sortQuery == option.value ? <BsCheckLg /> : ""}
                  {sortQuery !== option.value ? (
                    <div className={styles.check}>
                      <BsCheckLg />
                    </div>
                  ) : (
                    ""
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
