import Cookies from "js-cookie";
import DrawerComp from "../Drawer";
import messages from "../../messages/en";
import React, { useState } from "react";
import styles from "./styles.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal";
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
  const [modalOpen, setModalOpen] = useState(false);
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
                <Button
                  className={styles.button}
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  Logoout
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
      <DeleteModal
        open={modalOpen}
        title={messages.LOGOUT}
        cancel={messages.CANCEL}
        msg={messages.ARE_YOUR_SURE_WANT_TO_LOGOUT}
        onClose={() => setModalOpen(false)}
        onClick={handleLogout}
      />
    </>
  );
};

export default Navbar;
