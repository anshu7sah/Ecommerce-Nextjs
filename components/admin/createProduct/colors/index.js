import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { ErrorMessage, useField } from "formik";
import ColorThief from "colorthief";
import { TbArrowUpRightCircle } from "react-icons/tb";

export default function Colors({
  product,
  setProduct,
  name,
  colorImage,
  ...props
}) {
  const [toggle, setToggle] = useState(false);
  const [colors, setColors] = useState([]);
  const [field, meta] = useField(props);

  useEffect(() => {
    const colorThief = new ColorThief();

    const img = new Image();
    img.src = colorImage;
    img.crossOrigin = "Anonymous"; // Enable cross-origin for the image

    img.onload = () => {
      const dominantColor = colorThief.getColor(img);
      setColors([`rgb(${dominantColor.join(",")})`]);
    };
  }, [colorImage]);

  const renderSwatches = () => {
    return colors.map((color, i) => (
      <div
        className={styles.square__color}
        key={i}
        style={{ backgroundColor: color }}
        onClick={() => {
          setProduct({
            ...product,
            color: {
              color,
              image: product.color.image,
            },
          });
        }}
      >
        {color}
      </div>
    ));
  };

  return (
    <div className={styles.colors}>
      <div
        className={`${styles.header} ${
          meta.error[name] ? styles.header__error : ""
        }`}
      >
        <div className={styles.flex}>
          {meta.error[name] && (
            <img src="../../../images/warning.png" alt="warning" />
          )}
          Pick a product color
        </div>
        <span>
          {meta.touched && meta.error && (
            <div className={styles.error__msg}>
              <span></span>
              <ErrorMessage name={name} />
            </div>
          )}
        </span>
      </div>
      <input
        type="text"
        value={product.color.color}
        name={name}
        hidden
        {...props}
        {...field}
      />
      <div className={styles.colors__infos}></div>
      <div className={toggle ? styles.toggle : ""}>
        {/* <ColorExtractor getColors={(colors) => setColors(colors)}>
          <img src={colorImage} alt="" style={{ display: "none" }} />
        </ColorExtractor> */}
        <div className={styles.wheel}>{renderSwatches()}</div>
      </div>
      {colors.length > 0 && (
        <TbArrowUpRightCircle
          className={styles.toggle__btn}
          onClick={() => setToggle((prev) => !prev)}
          style={{ transform: `${toggle ? "rotate(180deg)" : ""}` }}
        />
      )}
    </div>
  );
}
