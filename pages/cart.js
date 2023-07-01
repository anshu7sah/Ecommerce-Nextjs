import React, { useEffect, useState } from "react";
import Header from "../components/cart/header";
import styles from "../styles/cart.module.scss";
import Empty from "../components/cart/empty";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/cart/product";
import CartHeader from "../components/cart/cartHeader";
import Checkout from "../components/cart/checkout";
import PaymentMethods from "../components/cart/paymentMethods";
import ProductsSwiper from "../components/productsSwiper";
import { women_swiper } from "../data/home";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { saveCart } from "../helper/user";
import axios from "axios";
import { updateCart } from "../store/cartSlice";

const Cart = () => {
  const [selected, setSelected] = useState([]);
  const { cartItems } = useSelector((state) => state.cart);
  const [shippingFee, setShippingFee] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const update = async () => {
      const { data } = await axios.post("/api/updatecart", {
        products: cartItems,
      });
      dispatch(updateCart(data));
    };
    if (cartItems.length > 0) {
      update();
    }
  }, []);

  useEffect(() => {
    setShippingFee(
      selected.reduce((a, c) => a + Number(c.shipping), 0).toFixed(2)
    );
    setSubtotal(selected.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2));
    setTotal(
      (
        selected.reduce((a, c) => a + c.price * c.qty, 0) + Number(shippingFee)
      ).toFixed(2)
    );
  }, [selected]);

  const saveCartToDbHandler = async () => {
    if (session) {
      const res = await saveCart(selected);

      router.push("/checkout");
    } else {
      signIn();
    }
  };

  return (
    <>
      <Header />
      <div className={styles.cart}>
        {cartItems.length > 0 ? (
          <div className={styles.cart__container}>
            <CartHeader
              cartItems={cartItems}
              selected={selected}
              setSelected={setSelected}
            />
            <div className={styles.cart__products}>
              {cartItems.map((product) => (
                <Product
                  key={product._uid}
                  product={product}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
            </div>
            <Checkout
              subtotal={subtotal}
              total={total}
              selected={selected}
              shippingFee={shippingFee}
              saveCartToDbHandler={saveCartToDbHandler}
            />
            <PaymentMethods />
          </div>
        ) : (
          <Empty />
        )}
        <div style={{ margin: "0 10px" }}>
          <ProductsSwiper products={women_swiper} />
        </div>
      </div>
    </>
  );
};

export default Cart;
