import React from "react";
import DrawerComp from "../Drawer";
import messages from "../../messages/en";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
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
                  <NavLink to="/" className={styles.button}>
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
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
