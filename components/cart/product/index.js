import { BsHeart } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "./styles.module.scss";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../../../store/cartSlice";
import { useEffect, useState } from "react";
const Product = ({ product, selected, setSelected }) => {
  const [active, setActive] = useState();
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    const isAvailable = selected.find((p) => p._uid == product._uid);
    setActive(isAvailable ? true : false);
  }, [selected]);

  const updateQty = (type) => {
    let newCart = cartItems.map((p) => {
      if (p._uid === product._uid) {
        return {
          ...p,
          qty: type == "plus" ? product.qty + 1 : product.qty - 1,
        };
      }
      return p;
    });
    dispatch(updateCart(newCart));
  };
  const removeProduct = (id) => {
    let newCart = cartItems.filter((p) => {
      return p._uid !== id;
    });
    dispatch(updateCart(newCart));
  };
  const handleCheckbox = () => {
    if (active) {
      setSelected((s) => {
        return s.filter((p) => p._uid !== product._uid);
      });
    } else {
      setSelected((s) => [...s, product]);
    }
  };

  return (
    <div className={`${styles.card} ${styles.product}`}>
      {product.quantity < 1 && <div className={styles.blur}></div>}
      <div className={styles.product__header}>
        <img src="../../../images/store.webp" alt="" />
        M74JJI Official Store
      </div>
      <div className={styles.product__image}>
        <div
          className={`${styles.checkbox} ${active && styles.active}`}
          onClick={() => handleCheckbox()}
        ></div>
        <img src={product.images[0].url} alt="" />
        <div className={styles.col}>
          <div className={styles.grid}>
            <h1>
              {product.name.length > 30
                ? `${product.name.substring(0, 30)}`
                : product.name}
            </h1>
            <div style={{ zIndex: "2" }}>
              <BsHeart />
            </div>
            <div
              style={{ zIndex: "2" }}
              onClick={() => removeProduct(product._uid)}
            >
              <AiOutlineDelete />
            </div>
          </div>
          <div className={styles.product__style}>
            <img src={product.color.image} alt="" />
            {product.size && <span>{product.size}</span>}
            {product.price && <span>{product.price.toFixed(2)}$</span>}
            <MdOutlineKeyboardArrowRight />
          </div>
          <div className={styles.product__priceQty}>
            <div className={styles.product__priceQty_price}>
              <span className={styles.price}>
                USD{(product.price * product.qty).toFixed(2)}$
              </span>
              {product.price !== product.priceBefore && (
                <span className={styles.priceBefore}>
                  USD{product.priceBefore}$
                </span>
              )}
              {product.discount > 0 && (
                <span className={styles.discount}>-{product.discount}%</span>
              )}
            </div>
            <div className={styles.product__priceQty_qty}>
              <button
                disabled={product.qty < 2}
                onClick={() => updateQty("minus")}
              >
                -
              </button>
              <span>{product.qty}</span>
              <button
                disabled={product.qty == product.quantity}
                onClick={() => updateQty("plus")}
              >
                +
              </button>
            </div>
          </div>
          <div className={styles.product__shipping}>
            {product.shipping
              ? `+${product.shipping}$ Shipping fee`
              : "Free Shipping"}
          </div>
          {product.quantity < 1 && (
            <div className={styles.notAvailable}>
              This product is out of stock, Add it to your wishlist. It will be
              in stock soon.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;