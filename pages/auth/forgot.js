import { BiLeftArrowAlt } from "react-icons/bi";
import Header from "../../components/header";
import styles from "../../styles/forgot.module.scss";
import Link from "next/link";
import { Formik, Form } from "formik";
import CircledIconBtn from "../../components/button/circledIconBtn";
import { useState } from "react";
import * as Yup from "yup";
import Footer from "../../components/footer";
import LoginInput from "../../components/inputs/loginInput";
import Dotloader from "../../components/loaders/dotLoader";
import axios from "axios";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const forgotHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/forgot", {
        email,
      });
      setError("");
      setSuccess(data.message);
      setLoading(false);
      setEmail("");
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  const emailvalidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Please enter a valid email address"),
  });

  return (
    <>
      {loading && <Dotloader loading={loading} />}
      <Header country={""} />

      <div className={styles.forgot}>
        <div>
          <div className={styles.forgot__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Forgot your password ? <Link href="/signin">Login instead</Link>
            </span>
          </div>
          <div className={styles.forgot__form}>
            <Formik
              enableReinitialize
              initialValues={{
                email,
              }}
              validationSchema={emailvalidation}
              onSubmit={() => forgotHandler()}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="email"
                    name="email"
                    icon="email"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <CircledIconBtn type={"submit"} text={"Send Link"} />
                  <div style={{ marginTop: "10px" }}>
                    {error && <span className={styles.error}>{error}</span>}
                    {success && (
                      <span className={styles.success}>{success}</span>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <Footer country={""} />
    </>
  );
};

export default Forgot;
