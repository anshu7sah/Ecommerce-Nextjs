import styles from "./styles.module.scss";
import { useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import AdminInput from "../../inputs/adminInput";
import { toast } from "react-toastify";
import axios from "axios";
export default function Create({ categories, setCategories }) {
  const [name, setName] = useState("");
  const validate = Yup.object({
    name: Yup.string()
      .required("Category name is required")
      .min(2, "Category name must be between 2 and 30 characters.")
      .max(30, "Category name must be between 2 and 30 characters.")
      .matches(
        /^[a-zA-Z\s]*$/,
        "Number and special characters are not allowed."
      ),
  });

  const submitHandler = async (e) => {
    try {
      const { data } = await axios.post("/api/admin/category", {
        name,
      });
      setCategories(data.categories);
      setName("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ name }}
        validationSchema={validate}
        onSubmit={() => {
          submitHandler();
        }}
      >
        {(formik) => (
          <Form>
            <div className={styles.header}>Create a Category</div>
            <AdminInput
              type="text"
              label="Name"
              name="name"
              placeholder="Category name"
              onChange={(e) => setName(e.target.value)}
            />
            <div className={styles.btnWrap}>
              <button type="submit" className={`${styles.btn} `}>
                <span>Add Category</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
