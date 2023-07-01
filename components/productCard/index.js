import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import ProductSwiper from "./ProductSwiper";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const [active, setActive] = useState(0);
  const [images, setImages] = useState(product?.subProducts[active]?.images);
  const [prices, setPrices] = useState(
    product?.subProducts[active]?.sizes
      .map((s) => {
        return s.price;
      })
      .sort((a, b) => {
        return a - b;
      })
  );
  const [styless, setStyless] = useState(
    product.subProducts.map((p) => {
      return p.color;
    })
  );
  useEffect(() => {
    setImages(product?.subProducts[active]?.images);
    setPrices(
      product?.subProducts[active]?.sizes
        .map((s) => {
          return s.price;
        })
        .sort((a, b) => {
          return a - b;
        })
    );
  }, [active]);

  return (
    <div className={styles.product}>
      <div className={styles.product__container}>
        <Link href={`/product/${product.slug}?style=${active}`}>
          <div>
            <ProductSwiper images={images} />
          </div>
        </Link>
        {product.subProducts[active].discount ? (
          <div className={styles.product__discount}>
            -{product.subProducts[active].discount}%
          </div>
        ) : (
          ""
        )}
        <div className={styles.product__infos}>
          <h1>
            {product?.name.length > 45
              ? `${product.name.substring(0, 45)}...`
              : product.name}
          </h1>
          <span>
            {prices.length === 1
              ? `USD${prices[0]}`
              : `USD${prices[0]}-${prices[prices.length - 1]}$`}
          </span>
          <div className={styles.product__colors}>
            {styless &&
              styless.map((style, i) =>
                style.image ? (
                  <img
                    key={i}
                    src={style.image}
                    className={i == active && styles.active}
                    onMouseOver={() => setActive(i)}
                    alt=""
                  />
                ) : (
                  <span
                    style={{ backgroundColor: `${style.color}` }}
                    className={i == active && styles.active}
                    onMouseOver={() => setActive(i)}
                  ></span>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
