import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
export default function ListItem({ coupon, setCoupons }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const input = useRef();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [startDate, setStartDate] = useState(new Date(coupon.startDate));
  const [endDate, setEndDate] = useState(new Date(coupon.endDate));

  const handleStartDate = (date) => {
    setStartDate(date);
  };
  const handleEndDate = (date) => {
    setEndDate(date);
  };

  const handleUpdate = async (id) => {
    try {
      const { data } = await axios.put("/api/admin/coupon", {
        id,
        coupon: name || coupon.coupon,
        discount: discount || coupon.discount,
        startDate,
        endDate,
      });

      setCoupons(data.coupons);
      setName("");
      setDiscount("");
      toast.success(data.message);
      setOpen(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleRemove = async (id) => {
    try {
      const { data } = await axios.delete(`/api/admin/coupon?id=${id}`);
      setCoupons(data.coupons);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <li className={styles.list__item}>
      <input
        type="text"
        className={open ? styles.open : ""}
        value={name ? name : coupon.coupon}
        onChange={(e) => setName(e.target.value)}
        disabled={!open}
        ref={input}
      />

      {open && (
        <div className={styles.list__item_expand}>
          <input
            type="number"
            className={open ? styles.open : ""}
            value={discount ? discount : coupon.discount}
            onChange={(e) => setDiscount(e.target.value)}
            disabled={!open}
          />
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
          <button
            onClick={() => handleUpdate(coupon._id)}
            className={styles.btn}
          >
            Save
          </button>
          <button
            onClick={() => {
              setOpen(false);
              setName("");
              setDiscount("");
              setStartDate(new Date(coupon.startDate));
              setEndDate(new Date(coupon.endDate));
            }}
            className={styles.btn}
          >
            Cancel
          </button>
        </div>
      )}
      <div className={styles.list__item_actions}>
        {!open && (
          <AiTwotoneEdit
            onClick={() => {
              setOpen((prev) => !prev);
              input.current.focus();
            }}
          />
        )}
        <AiFillDelete onClick={() => handleRemove(coupon._id)} />
      </div>
    </li>
  );
}
