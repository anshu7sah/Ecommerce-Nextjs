import { useState } from "react";
import styles from "./styles.module.scss";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      //   iconColor: "#000",
      //   color: "#000",
      //   fontSize: "16px",
      fontSmoothing: "antialiased",
      //   ":-webkit-autofill": { color: "#000" },
      //   "::placeholder": { color: "#000" },
    },
    invalid: {
      iconColor: "#fd010169",
      color: "#fd010169",
    },
  },
};

export default function Form({ total, order_id }) {
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const res = await axios.post(`/api/order/${order_id}/payWithStripe`, {
          amount: total,
          id,
        });
        const { paymentIntent, error } = await stripe.confirmCardPayment(
          res.data.client_secret,
          {
            payment_method: { card: elements.getElement(CardElement) },
          }
        );

        if (error) {
          setError(error.message);
        } else if (paymentIntent && paymentIntent.status == "succeeded") {
          setTimeout(() => {
            window.location.reload(false);
          }, 1000);
        }
      } catch (error) {
        console.log("error in stripe request to backend", error);
        setError(error.response.data.message);
      }
    } else {
      setError(error.message);
    }
  };

  return (
    <div className={styles.stripe}>
      <form onSubmit={handleSubmit}>
        <CardElement options={CARD_OPTIONS} />
        <button type="submit">Pay</button>
        {error && <span className={styles.error}>{error}</span>}
      </form>
    </div>
  );
}
