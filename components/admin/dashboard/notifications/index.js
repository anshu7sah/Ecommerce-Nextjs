import { useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

import { IoNotificationsSharp } from "react-icons/io5";
import { notificationsData } from "../../../../data/notifications";

export default function Notifications() {
  const [show, setShow] = useState(false);
  return (
    <div
      className={styles.dropdown}
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className={styles.dropdown__svg}>
        <IoNotificationsSharp />
      </div>
      <div
        className={`${styles.dropdown__content} ${show ? styles.active : ""} ${
          styles.scrollbar
        }`}
      >
        <div className={styles.dropdown__content_notifications}>
          {notificationsData.map((notif, i) => (
            <>
              {notif.type == "order" ? (
                <div
                  className={
                    styles.dropdown__content_notifications_notification
                  }
                  key={i}
                >
                  <img src={notif.image} alt="" />
                  <p>
                    <span>{notif.user}</span> has created a new order of{" "}
                    {notif.total} $
                  </p>
                </div>
              ) : (
                <div
                  className={
                    styles.dropdown__content_notifications_notification
                  }
                  key={i}
                >
                  <img src={notif.image} alt="" />
                  <span>{notif.user}</span> new Account created.
                </div>
              )}
            </>
          ))}
        </div>
        <div className={styles.dropdown__content_footer}>
          <Link href={"/admin/dashboard/notifications"}>
            See all notifications
          </Link>
        </div>
      </div>
    </div>
  );
}
