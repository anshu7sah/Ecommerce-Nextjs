import { useState } from "react";
import styles from "./styles.module.scss";
import usePagination from "./Pagination";
import { Pagination } from "@mui/material";
import Review from "./Review";
import TableHeader from "./TableHeader";
const Table = ({ reviews, allSizes, colors }) => {
  const [page, setPage] = useState(1);
  const PER_PAGE = 3;
  const count = Math.ceil(reviews.length / PER_PAGE);
  const _Data = usePagination(reviews, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _Data.jump(p);
  };

  return (
    <div className={styles.table}>
      <TableHeader
        reviews={reviews}
        allSizes={[{ size: "All" }, ...allSizes]}
        colors={[...colors, { color: "All", image: "" }]}
      />
      <div className={styles.table__data}>
        {_Data.currentData().map((review, i) => (
          <Review review={review} key={i} />
        ))}
      </div>
      <div className={styles.pagination}>
        <Pagination
          count={count}
          page={page}
          variant="round"
          shape="rounded"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Table;
