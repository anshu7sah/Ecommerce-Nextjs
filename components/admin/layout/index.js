import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import styles from "./styles.module.scss";
import DialogModal from "../../dialogModal";
import { hideDialog } from "../../../store/dialogSlice";
import { useEffect } from "react";
export default function Layout({ children }) {
  const { expandSidebar: sidebar } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hideDialog());
  }, []);
  return (
    <div className={styles.layout}>
      <DialogModal />
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
