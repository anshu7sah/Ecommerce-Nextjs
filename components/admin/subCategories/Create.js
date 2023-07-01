import styles from "./styles.module.scss";
import { useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import AdminInput from "../../inputs/adminInput";
import { toast } from "react-toastify";
import axios from "axios";
import SingularSelect from "../../selects/SingularSelect";
export default function Create({ setSubCategories, categories }) {
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const validate = Yup.object({
    name: Yup.string()
      .required("Sub-Category name is required")
      .min(2, "Sub-Category name must be between 2 and 30 characters.")
      .max(30, "Sub-Category name must be between 2 and 30 characters.")
      .matches(
        /^[a-zA-Z\s]*$/,
        "Number and special characters are not allowed."
      ),
    parent: Yup.string().required("Please choose a parent category"),
  });

  const submitHandler = async (e) => {
    try {
      const { data } = await axios.post("/api/admin/subCategory", {
        name,
        parent,
      });
      setSubCategories(data.subCategories);
      setName("");
      setParent("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  console.log(parent);

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ name, parent }}
        validationSchema={validate}
        onSubmit={() => {
          submitHandler();
        }}
      >
        {(formik) => (
          <Form>
            <div className={styles.header}>Create a SubCategory</div>
            <AdminInput
              type="text"
              label="Name"
              name="name"
              placeholder="Sub-Category name"
              onChange={(e) => setName(e.target.value)}
            />
            <SingularSelect
              name="parent"
              value={parent}
              data={categories}
              handleChange={(e) => setParent(e.target.value)}
            />
            <div className={styles.btnWrap}>
              <button type="submit" className={`${styles.btn} `}>
                <span>Add SubCategory</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
