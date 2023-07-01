import { useState } from "react";
import styles from "./styles.module.scss";
import ReactImageMagnify from "react-image-magnify";

export default function MainSwiper({ images, activeImg }) {
  const [active, setActive] = useState(0);
  return (
    <div className={styles.swiper}>
      <div className={styles.swiper__active}>
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "",
              isFluidWidth: true,
              src: activeImg || images[active].url,
            },
            largeImage: {
              src: activeImg || images[active].url,
              width: 1200,
              height: 1800,
            },
            enlargedImageContainerDimensions: {
              width: "150%",
              height: "150%",
            },
          }}
        />
      </div>
      <div className={styles.swiper__list}>
        {images.map((img, i) => (
          <div
            key={i}
            className={`${styles.swiper__list_item} ${
              i == active && styles.active
            }`}
            onMouseOver={() => setActive(i)}
          >
            <img src={img.url} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
