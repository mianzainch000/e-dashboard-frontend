import React from "react";
import Modal from "@mui/material/Modal";
import styles from "./styles.module.css";
import { Box, Typography, Button } from "@mui/material";

const DeleteModal = ({ open, onClose, msg, title, cancel, onClick }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.main}>
        <Box className={styles.logoContainer}>
         <Typography variant="h2" onClick={onClose} className={styles.crossIcon}>x</Typography>
        </Box>

        <Typography className={styles.msg}>{msg}</Typography>
        <Box className={styles.buttonContainer}>
          {" "}
          <Button onClick={onClose}>
            <Typography className={styles.btnText}> {cancel}</Typography>
          </Button>
          &nbsp;&nbsp;
          <Button
            onClick={() => {
              onClick();
              onClose();
            }}
          >
            <Typography className={styles.btnText}> {title}</Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
