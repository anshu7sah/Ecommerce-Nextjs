import { useState } from "react";
import TableSelect from "./TableSelect";
import styles from "./styles.module.scss";

const ratings = [
  {
    text: "All",
    value: "",
  },
  {
    text: "5 star",
    value: 5,
  },
  {
    text: "4 star",
    value: 4,
  },
  {
    text: "3 star",
    value: 3,
  },
  {
    text: "2 star",
    value: 2,
  },
  {
    text: "1 star",
    value: 1,
  },
];

const orderOptions = [
  {
    text: "All",
    value: "",
  },
  {
    text: "Recommended",
    value: "Recommended",
  },
  {
    text: "Most recent to oldest",
    value: "Most recent to oldest",
  },
  {
    text: "Oldest to most recent",
    value: "Oldest to most recent",
  },
];

export default function TableHeader({ reviews, allSizes, colors }) {
  const [rating, setRating] = useState();
  const [size, setSize] = useState();
  const [style, setStyle] = useState();
  const [order, setOrder] = useState();
  return (
    <div className={styles.table__header}>
      <TableSelect
        property={rating}
        text={"Rating"}
        data={ratings.filter((x) => x.value !== rating)}
        handleChange={setRating}
      />
      <TableSelect
        property={size}
        text={"Size"}
        data={allSizes.filter((x) => x !== size)}
        handleChange={setSize}
      />
      <TableSelect
        property={style}
        text="Style"
        data={colors.filter((f) => f !== style)}
        handleChange={setStyle}
      />
      <TableSelect
        property={order}
        text="Order"
        data={orderOptions.filter((f) => f.value !== order)}
        handleChange={setOrder}
      />
    </div>
  );
}
