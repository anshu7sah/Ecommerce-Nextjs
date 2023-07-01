import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import styles from "./styles.module.scss";
import Form from "./Form";
import { loadStripe } from "@stripe/stripe-js";
export default function StripePayment({ stripe_public_key, total, order_id }) {
  const stripePromise = loadStripe(stripe_public_key);

  return (
    <Elements stripe={stripePromise}>
      <Form total={total} order_id={order_id} />
    </Elements>
  );
}
