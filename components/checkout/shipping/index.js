import { useState } from "react";
import styles from "./styles.module.scss";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import "yup-phone";
import ShippingInput from "../../inputs/shippingInput";

import { countries } from "../../../data/countries";
import SingularSelect from "../../selects/SingularSelect";
import {
  changeActiveAddress,
  deleteAddress,
  saveAddress,
} from "../../../helper/user";
import { FaIdCard, FaMapMarkerAlt } from "react-icons/fa";
import { GiPhone } from "react-icons/gi";
import { IoMdArrowDropupCircle } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { CiCircleRemove } from "react-icons/ci";

const initialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  state: "",
  city: "",
  zipCode: "",
  address1: "",
  address2: "",
  country: "",
};

export default function Shipping({ addresses, setAddresses, user, profile }) {
  const [shipping, setShipping] = useState(initialValues);
  const [visible, setVisible] = useState(user?.address.length ? false : true);

  const {
    firstName,
    lastName,
    phoneNumber,
    state,
    city,
    zipCode,
    address1,
    address2,
    country,
  } = shipping;
  const validate = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .min(3, "First name must be atleast 3 characters long")
      .max(20, "First name must be atleast 20 characters long"),
    lastName: Yup.string()
      .required("Phone number is required")
      .min(3, "Last name must be atleast 3 characters long")
      .max(20, "Last name atmost 20 characters long"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .phone()
      .min(3, "Phone number must be atleast 3 characters long")
      .max(20, "Phone number must be atleast 20 characters long"),
    state: Yup.string()
      .required("State is required")
      .min(2, "State must be atleast 2 characters long")
      .max(60, "State must be atleast 60 characters long"),
    city: Yup.string()
      .required("City is required")
      .min(2, "City must be atleast 2 characters long")
      .max(60, "City must be atleast 60 characters long"),
    zipCode: Yup.string()
      .required("ZipCode/Postal is required")
      .min(2, "ZipCode/Postal must be atleast 2 characters long")
      .max(30, "ZipCode/Postal must be atleast 30 characters long"),
    address1: Yup.string()
      .required("Address Line 1 is required")
      .min(5, "Address Line 1 must be atleast 5 characters long")
      .max(100, "Address Line 1 must be atleast 100 characters long"),
    address2: Yup.string()

      .min(2, "Address Line 2 must be atleast 2 characters long")
      .max(100, "Address Line 2 must be atleast 100 characters long"),
    country: Yup.string().required("Country name is required"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };
  const saveShippingHandler = async () => {
    const res = await saveAddress(shipping);
    setAddresses(res.address);
  };
  const changeActiveHandler = async (id) => {
    const res = await changeActiveAddress(id);

    setAddresses(res.address);
  };

  const deleteHandler = async (id) => {
    const res = await deleteAddress(id);
    console.log(res.address);
    setAddresses(res.address);
  };

  return (
    <div className={styles.shipping}>
      {!profile && (
        <div className={styles.header}>
          <h2>Shipping Information</h2>
        </div>
      )}
      <div className={styles.addresses}>
        {addresses?.map((address, i) => (
          <div style={{ position: "relative" }} key={i}>
            <div
              className={styles.address__delete}
              onClick={() => deleteHandler(address._id)}
            >
              <CiCircleRemove />
            </div>
            <div
              key={i}
              className={`${styles.address} ${address.active && styles.active}`}
              onClick={() => changeActiveHandler(address._id)}
            >
              <div className={styles.address__side}>
                <img src={user.image} alt="" />
              </div>
              <div className={styles.address__col}>
                <span>
                  <FaIdCard />
                  {address.firstName.toUpperCase()}{" "}
                  {address.lastName.toUpperCase()}
                </span>
                <span>
                  <GiPhone />
                  {address.phoneNumber}
                </span>
              </div>
              <div className={styles.address__col}>
                <span>
                  <FaMapMarkerAlt />
                  {address.address1}
                </span>
                <span>{address.address2}</span>
                <span>
                  {address.city},{address.country}
                </span>
                <span>{address.zipCode}</span>
              </div>
              <span
                className={styles.active__text}
                style={{
                  display: `${!address.active ? "none" : "block"}`,
                }}
              >
                Active
              </span>
            </div>
          </div>
        ))}
      </div>
      <button
        className={styles.hide_show}
        onClick={() => setVisible((prev) => setVisible(!prev))}
      >
        {visible ? (
          <span>
            <IoMdArrowDropupCircle style={{ fontSize: "2rem", fill: "#222" }} />
          </span>
        ) : (
          <span>
            ADD NEW ADDRESS <AiOutlinePlus />
          </span>
        )}
      </button>
      {visible && (
        <Formik
          enableReinitialize
          initialValues={{
            firstName,
            lastName,
            phoneNumber,
            state,
            city,
            zipCode,
            address1,
            address2,
            country,
          }}
          validationSchema={validate}
          onSubmit={() => {
            saveShippingHandler();
          }}
        >
          {(formik) => (
            <Form>
              <SingularSelect
                name="country"
                value={country}
                placeholder={"Country"}
                handleChange={handleChange}
                data={countries}
              />
              <div className={styles.col}>
                <ShippingInput
                  name="firstName"
                  placeholder="*First Name"
                  onChange={handleChange}
                />
                <ShippingInput
                  name="lastName"
                  placeholder="*Last Name"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.col}>
                <ShippingInput
                  name="state"
                  placeholder="*State/Province"
                  onChange={handleChange}
                />
                <ShippingInput
                  name="city"
                  placeholder="*City"
                  onChange={handleChange}
                />
              </div>
              <ShippingInput
                name="phoneNumber"
                placeholder="*Phone Number"
                onChange={handleChange}
              />
              <ShippingInput
                name="zipCode"
                placeholder="*Post/Zip code"
                onChange={handleChange}
              />
              <ShippingInput
                name="address1"
                placeholder="Address 1"
                onChange={handleChange}
              />
              <ShippingInput
                name="address2"
                placeholder="Address 2"
                onChange={handleChange}
              />
              <button type="submit">Save Address</button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
