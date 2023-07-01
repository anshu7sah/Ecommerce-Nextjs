import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import styles from "./styles.module.scss";
export default function Layout({ children }) {
  const { expandSidebar: sidebar } = useSelector((state) => state.sidebar);
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div
        className={styles.layout__main}
        style={{ marginLeft: `${sidebar ? "280px" : "80px"}` }}
      >
        {children}
      </div>
    </div>
  );
}
