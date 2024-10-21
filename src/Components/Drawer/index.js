import Cookies from "js-cookie";
import { useState } from "react";
import styles from "./styles.module.css";
import DeleteModal from "../DeleteModal";
import messages from "../../messages/en.json";
import { NavLink, useNavigate } from "react-router-dom";
import { Drawer, Box, Button, Typography } from "@mui/material";
const DrawerComp = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isDraweOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };
  return (
    <Box>
      <Box onClick={() => setDrawerOpen(true)}>
        <Box>
          <h1>=</h1>
        </Box>
      </Box>

      <Drawer
        anchor="top"
        open={isDraweOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box className={styles.drawerContainer}>
          <Typography variant="h4" component="div">
            {messages.DASHBOARD}
          </Typography>
        </Box>
        <Box p={2} height="100vh" className={styles.drawer}>
          <Button className={styles.button}>
            <NavLink
              to="/home"
              className={styles.button}
              onClick={() => setDrawerOpen(false)}
            >
              {messages.PRODUCT}
            </NavLink>
          </Button>
          <Button className={styles.button}>
            <NavLink
              to="/add"
              className={styles.button}
              onClick={() => setDrawerOpen(false)}
            >
              {messages.ADD_PRODUCT}
            </NavLink>
          </Button>
          <Button className={styles.button}>
            <NavLink
              to="/update"
              className={styles.button}
              onClick={() => setDrawerOpen(false)}
            >
              {messages.UPDATE_PRODUCT}
            </NavLink>
          </Button>
          <Button className={styles.button}>
            <NavLink
              to="/profile"
              className={styles.button}
              onClick={() => setDrawerOpen(false)}
            >
              {messages.PROFILE}
            </NavLink>
          </Button>
          <Button
            className={styles.button}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            {messages.LOGOUT}
          </Button>
        </Box>
        <DeleteModal
          open={modalOpen}
          title={messages.LOGOUT}
          cancel={messages.CANCEL}
          msg={messages.ARE_YOUR_SURE_WANT_TO_LOGOUT}
          onClose={() => setModalOpen(false)}
          onClick={handleLogout}
        />
      </Drawer>
    </Box>
  );
};

export default DrawerComp;
