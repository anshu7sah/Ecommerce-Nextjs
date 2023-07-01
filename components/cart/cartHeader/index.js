import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { compareArrays } from "../../../utils/arraysUtils";
export default function CartHeader({ cartItems, selected, setSelected }) {
  const [active, setActive] = useState();
  useEffect(() => {
    const isAvailable = compareArrays(cartItems, selected);
    console.log(isAvailable);
    setActive(isAvailable ? true : false);
  }, [selected]);
  const handleSelect = () => {
    if (selected.length !== cartItems.length) {
      setSelected(cartItems);
    } else {
      setSelected([]);
    }
  };
  return (
    <div className={`${styles.cart__header} ${styles.card}`}>
      <h1>Item Summary({cartItems.length}) </h1>
      <div className={styles.flex} onClick={() => handleSelect()}>
        <div className={`${styles.checkbox} ${active && styles.active}`}></div>
        <span>Select all items</span>
      </div>
    </div>
  );
}
