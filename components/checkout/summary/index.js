import styles from "./styles.module.scss";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import ShippingInput from "../../inputs/shippingInput";
import { applyCoupon } from "../../../helper/user";
import axios from "axios";
import { useRouter } from "next/router";

export default function Summary({
  totalAfterDiscount,
  setTotalAfterDiscount,
  paymentMethod,
  selectedAddress,
  user,
  cart,
}) {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState("");
  const [error, setError] = useState("");
  const [orderError, setOrderError] = useState("");
  const router = useRouter();

  const validateCoupon = Yup.object({
    coupon: Yup.string().required("Please enter a coupon first !"),
  });

  const applyCouponHandler = async () => {
    console.log("applying coupond");
    const res = await applyCoupon(coupon);

    if (res.success == true) {
      setError("");
      setTotalAfterDiscount(res.totalAfterDiscount);
      setDiscount(res.discount);
    } else {
      setError(res);
      setTotalAfterDiscount("");
      setDiscount("");
    }
  };
  const placeOrderHandler = async () => {
    try {
      if (paymentMethod == "") {
        setOrderError("Please choose a payment method.");
        return;
      }
      if (selectedAddress == "") {
        setOrderError("Please choose a shipping address.");
        return;
      }
      const { data } = await axios.post("/api/order/create", {
        products: cart.products,
        shippingAddress: selectedAddress,
        paymentMethod,
        total: totalAfterDiscount !== "" ? totalAfterDiscount : cart.cartTotal,
        totalBeforeDiscount: cart.cartTotal,
        couponApplied: coupon,
      });

      console.log(data);
      router.push(`/order/${data.order_id}`);
    } catch (error) {
      setOrderError(error.response.data.message);
    }
  };

  return (
    <div className={styles.summary}>
      <div className={styles.header}>
        <h3>Order Summary</h3>
      </div>
      <div className={styles.coupon}>
        <Formik
          enableReinitialize
          initialValues={{ coupon }}
          validationSchema={validateCoupon}
          onSubmit={() => applyCouponHandler()}
        >
          {(formik) => (
            <Form>
              <ShippingInput
                name="coupon"
                placeholder={"coupon"}
                onChange={(e) => setCoupon(e.target.value)}
              />
              {error && <p className={styles.coupon_error}>{error}</p>}
              <button type="submit">Apply</button>
              <div className={styles.infos}>
                <span>
                  Total : <b>{cart.cartTotal}$</b>
                </span>
                {discount > 0 && (
                  <span className={styles.coupon_span}>
                    Coupon applied : <b>-{discount}%</b>
                  </span>
                )}
                {totalAfterDiscount && totalAfterDiscount < cart.cartTotal && (
                  <span>
                    New price : <b>{totalAfterDiscount}$</b>
                  </span>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <button
        className={styles.submit_btn}
        onClick={() => placeOrderHandler()}
        disabled={!paymentMethod || !selectedAddress}
        style={{
          background: `${!paymentMethod || !selectedAddress ? "#ccc" : ""}`,
          cursor: `${
            !paymentMethod || !selectedAddress ? "not-allowed" : "pointer"
          }`,
        }}
      >
        Place Order
      </button>
      {orderError && <span className={styles.error}>{orderError}</span>}
    </div>
  );
}
