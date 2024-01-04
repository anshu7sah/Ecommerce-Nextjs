import { BiLeftArrowAlt } from "react-icons/bi";
import Header from "../../../components/header";
import styles from "../../../styles/forgot.module.scss";
import Link from "next/link";
import { Formik, Form } from "formik";
import CircledIconBtn from "../../../components/button/circledIconBtn";
import { useState } from "react";
import * as Yup from "yup";
import Footer from "../../../components/footer";
import LoginInput from "../../../components/inputs/loginInput";
import Dotloader from "../../../components/loaders/dotLoader";
import axios from "axios";
import { getSession, signIn } from "next-auth/react";
import jwt from "jsonwebtoken";

const Reset = ({ user_id }) => {
  const [password, setPassword] = useState("");
  const [conf_password, setConf_Password] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const resetHandler = async () => {
    try {
      setLoading(true);
      console.log("anshu");
      const { data } = await axios.put("/api/auth/reset", {
        password,
        user_id,
      });

      let options = {
        redirect: false,
        email: data.email,
        password: password,
      };
      const res = await signIn("credentials", options);
      window.location.reload(true);
      // setError("");
      // setLoading(false);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  const passwordValidation = Yup.object({
    password: Yup.string()
      .required("Please enter your new password.")
      .min(6, "Password must be at least 6 characters.")
      .max(36, "Password can't be more than 36 characters."),
    conf_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match"),
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
              Reset Your Password ?<Link href="/signin">Login instead</Link>
            </span>
          </div>
          <div className={styles.forgot__form}>
            <Formik
              enableReinitialize
              initialValues={{
                password,
                conf_password,
              }}
              validationSchema={passwordValidation}
              onSubmit={() => resetHandler()}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <LoginInput
                    type="password"
                    name="conf_password"
                    icon="password"
                    placeholder="Confirm_Password"
                    onChange={(e) => setConf_Password(e.target.value)}
                  />
                  <CircledIconBtn type={"submit"} text={"Submit"} />
                  <div style={{ marginTop: "10px" }}>
                    {error && <span className={styles.error}>{error}</span>}
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

export default Reset;

export async function getServerSideProps(context) {
  const { query, req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const { token } = query;
  const user_id = jwt.verify(token, process.env.ResetTokenSecret);

  return {
    props: {
      user_id: user_id.id,
    },
  };
}
