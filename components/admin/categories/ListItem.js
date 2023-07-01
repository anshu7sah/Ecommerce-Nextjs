import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
export default function ListItem({ category, setCategories }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const input = useRef();

  const handleUpdate = async (id) => {
    try {
      const { data } = await axios.put("/api/admin/category", {
        id,
        name,
      });
      setCategories(data.categories);
      toast.success(data.message);
      setOpen(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleRemove = async (id) => {
    try {
      const { data } = await axios.delete(`/api/admin/category?id=${id}`);
      setCategories(data.categories);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <li className={styles.list__item}>
      <input
        type="text"
        className={open ? styles.open : ""}
        value={name ? name : category.name}
        onChange={(e) => setName(e.target.value)}
        disabled={!open}
        ref={input}
      />
      {open && (
        <div className={styles.list__item_expand}>
          <button
            onClick={() => handleUpdate(category._id)}
            className={styles.btn}
          >
            Save
          </button>
          <button
            onClick={() => {
              setOpen(false);
              setName("");
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
        <AiFillDelete onClick={() => handleRemove(category._id)} />
      </div>
    </li>
  );
}
