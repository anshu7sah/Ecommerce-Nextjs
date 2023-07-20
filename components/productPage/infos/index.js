import { Rating } from "@mui/material";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TbPlus, TbMinus } from "react-icons/tb";
import { BsHandbagFill, BsHeart } from "react-icons/bs";
import Share from "./share";
import Accordian from "./Accordian";
import InfosSwiper from "./InfosSwiper";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCart } from "../../../store/cartSlice";
import { showDialog } from "../../../store/dialogSlice";
import { signIn, useSession } from "next-auth/react";
import DialogModal from "../../dialogModal";
export default function Infos({ product, setActiveImg }) {
  const router = useRouter();
  const [size, setSize] = useState(router?.query?.size);
  const [qty, setQTY] = useState(1);
  const [error, setError] = useState("");
  const { cartItems } = useSelector((state) => state.cart);

  const { data: session } = useSession();

  const dispatch = useDispatch();

  useEffect(() => {
    setSize("");
    setQTY(1);
  }, [router.query.style]);

  useEffect(() => {
    if (qty > product.quantity) {
      setQTY(product.quantity);
    }
  }, [router.query.size]);
  const addToCartHandler = async () => {
    if (!router.query.size) {
      setError("Please Select a size");
      return;
    }
    const { data } = await axios.get(
      `/api/product/${product._id}?style=${product.style}&size=${router.query.size}`
    );

    if (data.quantity < 1) {
      setError("This Product is out of stock");
      return;
    } else if (qty > data.quantity) {
      setError("The quantity is not in stock. Try lower quantity");
      return;
    } else {
      let _uid = `${data._id}_${product.style}_${router.query.size}`;
      let exist = cartItems.find((p) => p._uid === _uid);
      if (exist) {
        let newCart = cartItems.map((p) => {
          if (p._uid === exist._uid) {
            return { ...p, qty: qty };
          }
          return p;
        });
        dispatch(updateCart(newCart));
      } else {
        dispatch(addToCart({ ...data, qty, _uid }));
      }
    }
  };

  const handleWishlist = async () => {
    try {
      if (!session) {
        return signIn();
      }
      const { data } = await axios.put("/api/user/wishlist", {
        product_id: product._id,
        style: product.style,
      });
      dispatch(
        showDialog({
          header: "Product Added to Wishlist Successfully",
          msgs: [
            {
              msg: data.message,
              type: "success",
            },
          ],
        })
      );
    } catch (error) {
      dispatch(
        showDialog({
          header: "Wishlist Error",
          msgs: [
            {
              msg: error.response.data.message,
              type: "error",
            },
          ],
        })
      );
    }
  };

  return (
    <div className={styles.infos}>
      <DialogModal />
      <div className={styles.infos__container}>
        <h1 className={styles.infos__name}>{product.name}</h1>
        <h2 className={styles.infos__sku}>{product.sku}</h2>
        <div className={styles.infos__rating}>
          <Rating
            name="half-rating-read"
            defaultValue={product.rating}
            precision={0.5}
            readOnly
            style={{ color: "#FACF19" }}
          />
          ({product.numReviews}
          {product.numReviews == 1 ? " review" : " reviews"})
        </div>
        <div className={styles.infos__price}>
          {!size ? <h2>{product.priceRange}</h2> : <h1>{product.price}</h1>}
          {product.discount > 0 ? (
            <h3>
              <span>
                {size && product.priceBefore}
                {size && "$"}
              </span>
              <span>(-{product.discount}%)</span>
            </h3>
          ) : (
            ""
          )}
        </div>
        <span className={styles.infos__shipping}>
          {product.shipping
            ? `+${product.shipping}$ Shipping fee`
            : "Free Shipping"}
        </span>
        <span>
          {size
            ? product.quantity
            : product.sizes.reduce((first, next) => first + next.qty, 0)}{" "}
          pieces available.
        </span>
        <div className={styles.infos__sizes}>
          <h4>Select a Size:</h4>
          <div className={styles.infos__sizes_wrap}>
            {product.sizes.map((size, i) => (
              <Link
                href={`/product/${product.slug}?style=${router.query.style}&size=${i}`}
                key={i}
              >
                <div
                  className={`${styles.infos__sizes_size} ${
                    i == router.query.size && styles.active_size
                  }`}
                  onClick={() => setSize(size.size)}
                >
                  {size.size}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.infos__colors}>
          {product.colors &&
            product.colors.map((color, i) => (
              <span
                key={i}
                className={`${
                  i == router.query.style ? styles.active_color : ""
                }`}
                onMouseOver={() =>
                  setActiveImg(product.subProducts[i].images[0].url)
                }
                onMouseLeave={() => setActiveImg("")}
              >
                <Link href={`/product/${product.slug}?style=${i}`}>
                  <img src={color.image} alt="" />
                </Link>
              </span>
            ))}
        </div>
        <div className={styles.infos__qty}>
          <button onClick={() => qty > 1 && setQTY((prev) => prev - 1)}>
            <TbMinus />
          </button>
          <span>{qty}</span>
          <button
            onClick={() => qty < product.quantity && setQTY((prev) => prev + 1)}
          >
            <TbPlus />
          </button>
        </div>
        <div className={styles.infos__actions}>
          <button
            disabled={product.quantity < 1}
            style={{ cursor: `${product.quantity < 1 ? "not-allowed" : ""}` }}
            onClick={() => addToCartHandler()}
          >
            <BsHandbagFill />
            <b>ADD TO CART</b>
          </button>
          <button onClick={() => handleWishlist()}>
            <BsHeart />
            WISHLIST
          </button>
        </div>
        {error && <span className={"error"}>{error}</span>}
        <Share />
        <Accordian details={[product.description, ...product.details]} />
        <InfosSwiper />
      </div>
    </div>
  );
}
