import { paymentMethods } from "../../../data/paymentMethods";
import styles from "./styles.module.scss";
export default function Payment({ paymentMethod, setPaymentMethod, profile }) {
  return (
    <div className={styles.payment}>
      {!profile && (
        <div className={styles.header}>
          <h3>Payment Method</h3>
        </div>
      )}
      {paymentMethods.map((paymnt) => (
        <label
          key={paymnt.id}
          htmlFor={paymnt.id}
          className={styles.payment__item}
          onClick={() => setPaymentMethod(paymnt.id)}
          style={{ background: `${paymentMethod == paymnt.id ? "#eee" : ""}` }}
        >
          <input
            type="radio"
            name="payment"
            id={paymnt.id}
            checked={paymentMethod == paymnt.id}
          />
          <img
            src={`../../../images/checkout/${paymnt.id}.webp`}
            alt={paymnt.name}
          />
          <div className={styles.payment__item_col}>
            <span>Pay with {paymnt.name}</span>
            <p>
              {paymnt.images.length > 0
                ? paymnt.images.map((img, i) => (
                    <img
                      src={`../../../images/payment/${img}.webp`}
                      alt=""
                      key={i}
                    />
                  ))
                : paymnt.description}
            </p>
          </div>
        </label>
      ))}
    </div>
  );
}
