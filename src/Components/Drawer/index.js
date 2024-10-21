import { useState } from "react";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
import messages from "../../messages/en.json";
import { Drawer, Box, Button, Typography } from "@mui/material";
const DrawerComp = () => {
  const [isDraweOpen, setDrawerOpen] = useState(false);
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
        </Box>
      </Drawer>
    </Box>
  );
};

export default DrawerComp;
