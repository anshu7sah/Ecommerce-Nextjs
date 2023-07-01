import styles from "./styles.module.scss";
import { useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import AdminInput from "../../inputs/adminInput";
import { toast } from "react-toastify";
import axios from "axios";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
export default function Create({ setCoupons }) {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState(0);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(tomorrow);

  const handleStartDate = (date) => {
    setStartDate(date);
  };
  const handleEndDate = (date) => {
    setEndDate(date);
  };
  const validate = Yup.object({
    name: Yup.string()
      .required("Coupon name is required")
      .min(2, "Coupon name must be between 2 and 30 characters.")
      .max(30, "Coupon name must be between 2 and 30 characters.")
      .matches(
        /^[a-zA-Z\s]*$/,
        "Number and special characters are not allowed."
      ),
    discount: Yup.number()
      .required("Discount is required")
      .min(1, "Discount must be atleast 1%")
      .max(100, "Discount must be 99% or less"),
  });

  const submitHandler = async (e) => {
    try {
      if (startDate.toString() == endDate.toString()) {
        return toast.error("You can't pick the same dates");
      } else if (endDate.getTime() - startDate.getTime() < 0) {
        return toast.error("Start date must be more than end date.");
      }
      const { data } = await axios.post("/api/admin/coupon", {
        coupon: name,
        discount,
        startDate,
        endDate,
      });
      setCoupons(data.coupons);
      setName("");
      setDiscount(0);
      setStartDate(new Date());
      setEndDate(tomorrow);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ name, discount }}
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
              placeholder="Coupon name"
              onChange={(e) => setName(e.target.value)}
            />
            <AdminInput
              type="number"
              label="Discount"
              name="discount"
              placeholder="Discount "
              onChange={(e) => setDiscount(e.target.value)}
            />
            <div className={styles.date_picker}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Start Date"
                  inputFormat="MM/dd/yyyy"
                  value={startDate}
                  onChange={handleStartDate}
                  renderInput={(params) => <TextField {...params} />}
                  minDate={new Date()}
                />
                <DesktopDatePicker
                  label="End Date"
                  inputFormat="MM/dd/yyyy"
                  value={endDate}
                  onChange={handleEndDate}
                  renderInput={(params) => <TextField {...params} />}
                  minDate={tomorrow}
                />
              </LocalizationProvider>
            </div>
            <div className={styles.btnWrap}>
              <button type="submit" className={`${styles.btn} `}>
                <span>Add Coupon</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
