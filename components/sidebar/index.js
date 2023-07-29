import * as React from "react";
import styles from "./styles.module.scss";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { menuArray } from "../../data/home";
//--------------------
import { FaBars } from "react-icons/fa";
import {
  GiLargeDress,
  GiClothes,
  Gi3DHammer,
  GiWatch,
  GiBallerinaShoes,
  GiHeadphones,
  GiHealthCapsule,
  GiSportMedal,
  GiBigDiamondRing,
} from "react-icons/gi";
import { MdOutlineSportsEsports, MdOutlineSmartToy } from "react-icons/md";
import { BiCameraMovie, BiGift, BiCategory } from "react-icons/bi";
import { FaBaby } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { BsPhoneVibrate } from "react-icons/bs";
import Link from "next/link";

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <div className={styles.menu}>
          <ul>
            <li>
              <a className={styles.menu__header}>
                <BiCategory />
                <b>Categories</b>
              </a>
            </li>
            <div className={styles.menu__list}>
              {menuArray.map((item, i) => (
                <li key={i}>
                  <Link href={item.link}>
                    {i == 0 ? (
                      <GiLargeDress />
                    ) : i == 1 ? (
                      <GiClothes />
                    ) : i == 2 ? (
                      <GiHeadphones />
                    ) : i == 3 ? (
                      <GiWatch />
                    ) : i == 4 ? (
                      <HiOutlineHome />
                    ) : i == 5 ? (
                      <GiHealthCapsule />
                    ) : i == 6 ? (
                      <GiBallerinaShoes />
                    ) : i == 7 ? (
                      <GiBigDiamondRing />
                    ) : i == 8 ? (
                      <GiSportMedal />
                    ) : i == 9 ? (
                      <FaBaby />
                    ) : i == 10 ? (
                      <BiCameraMovie />
                    ) : i == 11 ? (
                      <MdOutlineSportsEsports />
                    ) : i == 12 ? (
                      <BsPhoneVibrate />
                    ) : i == 13 ? (
                      <MdOutlineSmartToy />
                    ) : i == 14 ? (
                      <BiGift />
                    ) : i == 15 ? (
                      <Gi3DHammer />
                    ) : i == 16 ? (
                      <AiOutlineSecurityScan />
                    ) : (
                      ""
                    )}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </div>
          </ul>
        </div>
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <Button onClick={toggleDrawer("left", true)}>
          <FaBars />
        </Button>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
