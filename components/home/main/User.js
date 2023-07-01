import { useSession } from "next-auth/react";
import styles from "./styles.module.scss";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BsHeart } from "react-icons/bs";

import React from "react";
import Link from "next/link";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";

import { EffectCards, Navigation } from "swiper";
import { offersArray, userSwiperArray } from "../../../data/home";

const User = () => {
  const { data: session } = useSession();
  return (
    <div className={styles.user}>
      <img
        src="../../../images/userheader.jpg"
        alt="top-image"
        className={styles.user__header}
      />
      <div className={styles.user__container}>
        {session ? (
          <div className={styles.user__infos}>
            <img src={session?.user?.image} alt="profile-pic" />
            <h4>{session.user.name}</h4>
          </div>
        ) : (
          <div className={styles.user__infos}>
            <img
              src="data:image/png;base64,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"
              alt="profile-pic"
            />
            <div className={styles.user__infos_btns}>
              <button>Register</button>
              <button>Login</button>
            </div>
          </div>
        )}
        <ul className={styles.user__links}>
          <li>
            <Link href={""}>
              <IoSettingsOutline />
            </Link>
          </li>
          <li>
            <Link href={""}>
              <HiOutlineClipboardList />
            </Link>
          </li>
          <li>
            <Link href={""}>
              <AiOutlineMessage />
            </Link>
          </li>
          <li>
            <Link href={""}>
              <BsHeart />
            </Link>
          </li>
        </ul>
        <div className={styles.user__swiper}>
          <Swiper
            effect={"cards"}
            grabCursor={true}
            navigation={true}
            modules={[EffectCards, Navigation]}
            className="userMenu__swiper"
            style={{ maxWidth: "180px", height: "240px", marginTop: "1rem" }}
          >
            {offersArray.map((item, i) => (
              <SwiperSlide key={i}>
                <Link href={""}>
                  <img src={item.image} alt={"userSwiperimage"} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <img
        src="../../../images/userheader.jpg"
        alt="top-image"
        className={styles.user__footer}
      />
    </div>
  );
};

export default User;
