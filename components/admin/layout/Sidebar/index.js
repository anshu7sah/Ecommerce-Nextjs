import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";
// for icons
import {
  MdArrowForwardIos,
  MdOutlineCategory,
  MdSpaceDashboard,
} from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
import { IoListCircleSharp, IoNotificationsSharp } from "react-icons/io5";
import { ImUsers } from "react-icons/im";
import { AiFillMessage } from "react-icons/ai";
import { FaThList } from "react-icons/fa";
import { BsPatchPlus } from "react-icons/bs";
import {
  RiCoupon3Fill,
  RiLogoutCircleFill,
  RiSettingsLine,
} from "react-icons/ri";
// .......
import { useSession } from "next-auth/react";
import { toggleSidebar } from "../../../../store/sidebarSlice";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();
  const route = router.pathname.split("/admin/dashboard/")[1];
  const { data: session } = useSession();
  const { expandSidebar: sidebar } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  const handleExpand = () => {
    dispatch(toggleSidebar());
  };
  return (
    <div className={`${styles.sidebar} ${sidebar ? styles.opened : ""}`}>
      <div className={styles.sidebar__toggle} onClick={() => handleExpand()}>
        <div
          style={{
            transform: `${sidebar ? "rotate(180deg)" : ""}`,
            transition: "all 0.2s",
          }}
        >
          <MdArrowForwardIos />
        </div>
      </div>
      <div className={styles.sidebar__container}>
        <div className={styles.sidebar__header}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={styles.sidebar__user}>
          <img src={session?.user.image} alt="" />
          <div className={styles.show}>
            <span>Welcome back 👋</span>
            <span>{session?.user.name}</span>
          </div>
        </div>
        <ul className={styles.sidebar__list}>
          <li className={route == undefined ? styles.active : ""}>
            <Link href="/admin/dashboard">
              <MdSpaceDashboard />
              <span className={styles.show}>Dashboard</span>
            </Link>
          </li>
          <li className={route == "sales" ? styles.active : ""}>
            <Link href="/admin/dashboard/sales">
              <FcSalesPerformance />
              <span className={styles.show}>Sales</span>
            </Link>
          </li>
          <li className={route == "orders" ? styles.active : ""}>
            <Link href="/admin/dashboard/orders">
              <IoListCircleSharp />
              <span className={styles.show}>Orders</span>
            </Link>
          </li>
          <li className={route == "users" ? styles.active : ""}>
            <Link href="/admin/dashboard/users">
              <ImUsers />
              <span className={styles.show}>Users</span>
            </Link>
          </li>
          <li className={route == "messages" ? styles.active : ""}>
            <Link href="/admin/dashboard/messages">
              <AiFillMessage />
              <span className={styles.show}>Messages</span>
            </Link>
          </li>
        </ul>
        <div className={styles.sidebar__dropdown}>
          <div className={styles.sidebar__dropdown_heading}>
            <div className={styles.show}>Product</div>
          </div>
          <ul className={styles.sidebar__list}>
            <li className={route == "product/all" ? styles.active : ""}>
              <Link href="/admin/dashboard/product/all">
                <FaThList />
                <span className={styles.show}>All Products</span>
              </Link>
            </li>
            <li className={route == "product/create" ? styles.active : ""}>
              <Link href="/admin/dashboard/product/create">
                <BsPatchPlus />
                <span className={styles.show}>Create Product</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.sidebar__dropdown}>
          <div className={styles.sidebar__dropdown_heading}>
            <div className={styles.show}>Categories / Subs</div>
          </div>
          <ul className={styles.sidebar__list}>
            <li className={route == "categories" ? styles.active : ""}>
              <Link href="/admin/dashboard/categories">
                <MdOutlineCategory />
                <span className={styles.show}>Categories</span>
              </Link>
            </li>
            <li className={route == "subCategories" ? styles.active : ""}>
              <Link href="/admin/dashboard/subCategories">
                <div style={{ transform: "rotate(180deg)" }}>
                  <MdOutlineCategory />
                </div>
                <span className={styles.show}>Sub-Categories</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.sidebar__dropdown}>
          <div className={styles.sidebar__dropdown_heading}>
            <div className={styles.show}>Coupons</div>
          </div>
          <ul className={styles.sidebar__list}>
            <li className={route == "coupons" ? styles.active : ""}>
              <Link href="/admin/dashboard/coupons">
                <RiCoupon3Fill />
                <span className={styles.show}>Coupons</span>
              </Link>
            </li>
          </ul>
        </div>
        <nav>
          <ul
            className={`${styles.sidebar__list} ${
              sidebar ? styles.nav__flex : ""
            }`}
          >
            <li>
              <Link href={""}>
                <RiSettingsLine />
              </Link>
            </li>
            <li>
              <Link href={""}>
                <IoNotificationsSharp />
              </Link>
            </li>
            <li>
              <Link href={""}>
                <AiFillMessage />
              </Link>
            </li>
            <li>
              <Link href={""}>
                <RiLogoutCircleFill />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
