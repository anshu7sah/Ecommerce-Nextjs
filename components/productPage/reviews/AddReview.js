import { useState } from "react";
import Select from "./Select";
import styles from "./styles.module.scss";
import { Rating } from "@mui/material";
import Images from "./Images";
import { useDispatch } from "react-redux";
import { hideDialog, showDialog } from "../../../store/dialogSlice";
import DialogModal from "../../dialogModal";
import { useEffect } from "react";
import dataURItoBlob from "../../../utils/dataURItoBlob";
import { uploadImages } from "../../../helper/upload";
import axios from "axios";
import { ClipLoader } from "react-spinners";
const fits = ["Small", "True to size", "Large"];
const AddReview = ({ product, setReviews }) => {
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState("");
  const [style, setStyle] = useState("");
  const [fit, setFit] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState();
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideDialog());
  }, []);

  let uploadedImages = [];

  const handleSubmit = async () => {
    let msgs = [];
    if (!size) {
      msgs.push({
        msg: "Please select a size !",
        type: "error",
      });
    }
    if (!style) {
      msgs.push({
        msg: "Please select a style !",
        type: "error",
      });
    }
    if (!fit) {
      msgs.push({
        msg: "Please select a fit !",
        type: "error",
      });
    }
    if (!rating) {
      msgs.push({
        msg: "Please select a rating !",
        type: "error",
      });
    }
    if (!review) {
      msgs.push({
        msg: "Please select a review !",
        type: "error",
      });
    }

    if (msgs.length > 0) {
      dispatch(
        showDialog({
          header: "Adding review error !",
          msgs,
        })
      );
    } else {
      setLoading(true);
      if (images.length > 0) {
        let temp = images.map((img) => {
          return dataURItoBlob(img);
        });
        const path = "reviews images";
        let formData = new FormData();
        formData.append("path", path);
        temp.forEach((img) => {
          formData.append("file", img);
        });
        uploadedImages = await uploadImages(formData);
      }
      const { data } = await axios.put(`/api/product/${product._id}/review`, {
        size,
        style,
        fit,
        rating,
        review,
        images: uploadedImages,
      });
      setReviews(data.reviews);
      setStyle("");
      setFit("");
      setSize("");
      setImages([]);
      setRating("");
      setReview("");
    }
    setLoading(false);
  };

  return (
    <div className={styles.reviews__add}>
      <DialogModal />
      <div className={styles.reviews__add_wrap}>
        <div
          className="flex"
          style={{
            gap: "10px",
          }}
        >
          <Select
            property={size}
            text="Size"
            data={product.allSizes.filter((f) => f.size !== size)}
            handleChange={setSize}
          />

          <Select
            property={style}
            text="Style"
            data={product.colors.filter((f) => f !== style)}
            handleChange={setStyle}
          />
          <Select
            property={fit}
            text="How does it fit"
            data={fits.filter((f) => f !== fit)}
            handleChange={setFit}
          />
        </div>
        <Images images={images} setImages={setImages} />
        <textarea
          name="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder={"Write your review here"}
        />
        <Rating
          name={"half-rating-read"}
          defaultValue={0}
          value={Number(rating)}
          onChange={(e) => setRating(e.target.value)}
          precision={0.5}
          style={{ color: "#facf19", fontSize: "3rem" }}
        />
        <button
          className={`${styles.login_btn} ${loading ? styles.disabled : ""}`}
          onClick={() => handleSubmit()}
          disabled={loading}
        >
          Submit Review{" "}
          {loading && <ClipLoader loading={loading} color="#fff" />}
        </button>
      </div>
    </div>
  );
};

export default AddReview;
