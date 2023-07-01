import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { useField, ErrorMessage } from "formik";

export default function ShippingInput({ placeholder, ...props }) {
  const [field, meta] = useField(props);
  const inputRef = useRef();

  const [move, setMove] = useState(false);
  useEffect(() => {
    if (field.value.length > 0) {
      setMove(true);
    } else {
      setMove(false);
    }
  }, [field.value]);

  return (
    <div
      className={`${styles.input} ${
        meta.touched && meta.error && styles.error__shipping
      }`}
    >
      <div
        className={styles.input__wrapper}
        onFocus={() => setMove(true)}
        onBlur={() => setMove(field.value.length > 0 ? true : false)}
      >
        <input
          type={field.type}
          name={field.name}
          {...field}
          {...props}
          ref={inputRef}
        />
        <span
          className={move ? styles.move : ""}
          onClick={() => {
            setMove(true);
            inputRef.current.focus();
          }}
        >
          {placeholder}
        </span>
      </div>
      <p>{meta.touched && meta.error && meta.error}</p>
    </div>
  );
}
