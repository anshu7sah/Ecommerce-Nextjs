import React, { useState } from "react";
import { getSession } from "next-auth/react";
import Layout from "../../components/profile/layout";
import Head from "next/head";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import LoginInput from "../../components/inputs/loginInput";
import CircledIconBtn from "../../components/button/circledIconBtn";
import styles from "../../styles/profile.module.scss";
import axios from "axios";
export default function Profile({ user, tab }) {
  const [current_password, setCurrent_Password] = useState("");
  const [password, setPassword] = useState("");
  const [conf_password, setConf_Password] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const validate = Yup.object({
    current_password: Yup.string()
      .required(
        "Enter a combinaton of at least six numbers, letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be at least 6 characters.")
      .max(36, "Password can't be more than 36 characters."),
    password: Yup.string()
      .required(
        "Enter a combinaton of at least six numbers, letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be at least 6 characters.")
      .max(36, "Password can't be more than 36 characters."),
    conf_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const changePasswordHandler = async () => {
    try {
      const { data } = await axios.post("/api/user/changepassword", {
        current_password,
        password,
        conf_password,
      });

      setError("");
      setSuccess(data.message);
    } catch (error) {
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
    <Layout session={user} tab={tab}>
      <Head>
        <title>Profile-Security</title>
      </Head>
      <div className={styles.header}>
        <h1>Change Your Password</h1>
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          current_password,
          password,
          conf_password,
        }}
        validationSchema={validate}
        onSubmit={() => changePasswordHandler()}
      >
        {(form) => (
          <Form>
            <LoginInput
              type="password"
              name="current_password"
              icon="password"
              placeholder="Current Password"
              onChange={(e) => setCurrent_Password(e.target.value)}
            />
            <LoginInput
              type="password"
              name="password"
              icon="password"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoginInput
              type="password"
              name="conf_password"
              icon="password"
              placeholder="Confirm Password"
              onChange={(e) => setConf_Password(e.target.value)}
            />

            <CircledIconBtn type={"submit"} text={"Change"} />
            <br />
            {error && <span className={styles.error}>{error}</span>}
            {success && <span className={styles.success}>{success}</span>}
          </Form>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });
  const tab = query.tab || 0;
  return {
    props: {
      user: session,
      tab,
    },
  };
}
