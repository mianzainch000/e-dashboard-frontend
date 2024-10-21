import React from "react";
import Cookies from "js-cookie";
import DrawerComp from "../Drawer";
import messages from "../../messages/en";
import styles from "./styles.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Button,
  Toolbar,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };
  return (
    <>
      <AppBar position="sticky" className={styles.appbar}>
        <Toolbar>
          {isMobile ? (
            <>
              <DrawerComp />{" "}
            </>
          ) : (
            <>
              <Box className={styles.buttonContainer}>
                <Button className={styles.button}>
                  <NavLink to="/home" className={styles.button}>
                    {messages.PRODUCT}
                  </NavLink>
                </Button>
                <Button className={styles.button}>
                  <NavLink to="/add" className={styles.button}>
                    {messages.ADD_PRODUCT}
                  </NavLink>
                </Button>
                <Button className={styles.button}>
                  <NavLink to="/update" className={styles.button}>
                    {messages.UPDATE_PRODUCT}
                  </NavLink>
                </Button>
                <Button className={styles.button}>
                  <NavLink to="/profile" className={styles.button}>
                    {messages.PROFILE}
                  </NavLink>
                </Button>
                <Button className={styles.button} onClick={handleLogout}>
                  Logoout
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
