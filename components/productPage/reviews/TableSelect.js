import styles from "./TableHeader.module.scss";
import { IoArrowDown } from "react-icons/io5";
import React, { useState } from "react";

export default function TableSelect({ property, text, data, handleChange }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.select}>
      {text}:
      <div
        className={styles.select__header}
        onMouseOver={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={{
          backgroundColor: `${
            text == "Style" && property?.color && property.image
              ? `${property?.color}`
              : "#fff"
          }`,
        }}
      >
        <span
          className={`flex ${styles.select__header_wrap}`}
          style={{
            padding: "0 5px",
          }}
        >
          {text == "Style" ? (
            property?.image ? (
              <img src={property?.image} alt="" />
            ) : (
              `Select ${text}`
            )
          ) : (
            property || `Select ${text}`
          )}
          <IoArrowDown />
        </span>
        {visible && (
          <ul
            className={styles.select__header_menu}
            style={{ width: text == "Order" && "200px" }}
          >
            {data.map((item, i) => {
              if (text == "Rating") {
                return (
                  <li key={i} onClick={() => handleChange(item.value)}>
                    <span>{item.text}</span>
                  </li>
                );
              }
              if (text == "Size") {
                return (
                  <li key={i} onClick={() => handleChange(item.size)}>
                    <span>{item.size}</span>
                  </li>
                );
              }
              if (text == "Order") {
                return (
                  <li
                    key={i}
                    onClick={() => handleChange(item.value)}
                    style={{ width: text == "Order" && "200px" }}
                  >
                    <span>{item.text}</span>
                  </li>
                );
              }

              if (text == "Style") {
                return (
                  <li
                    key={i}
                    onClick={() => handleChange(item)}
                    style={{
                      backgroundColor: item.image ? `${item.color}` : "#fff",
                    }}
                  >
                    <span>
                      {item.image ? (
                        <img src={item.image} alt="" />
                      ) : (
                        "All Styles"
                      )}
                    </span>
                  </li>
                );
              }
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
