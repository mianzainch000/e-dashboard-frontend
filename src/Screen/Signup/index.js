import * as Yup from "yup";
import api from "../../api";
import { useFormik } from "formik";
import YupPassword from "yup-password";
import React, { useState } from "react";
import styles from "./styles.module.css";
import messages from "../../messages/en";
import logo from "../../Images/logo.png";
import TextInput from "../../Components/TextInput";
import { useSnackbar } from "../../Components/Snackbar";
import CustomButton from "../../Components/CustomButton";
import {
  useMediaQuery,
  useTheme,
  IconButton,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

YupPassword(Yup);
const Signup = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);
  const snackBarMessage = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      postData(values);
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .required("Email is required")
        .matches(/\S+@\S+\.\S+/, "Invalid email"),
      password: Yup.string()
        .password()
        .minLowercase(1, "at least one lowercase")
        .minUppercase(1, "at least one uppercase")
        .minSymbols(1, "at least one symbol")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
  });
  const postData = async (values) => {
    try {
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      };
      const res = await api.post("reg", data);
      if (res?.status === 201) {
        snackBarMessage({
          type: "success",
          message: res?.data?.message,
        });
        formik.handleReset();
      } else {
        snackBarMessage({
          type: "error",
          message: res?.data?.message,
        });
      }
    } catch (error) {
      snackBarMessage({
        type: "error",
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Grid container lg={12}>
      <Grid lg={6} md={6} sm={6} xs={12}>
        {!isMobile && (
          <img
            alt="logo"
            src={logo}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "50%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}
      </Grid>

      <Grid lg={6} md={6} sm={6} xs={12}>
        <Box
          sx={{
            height: {
              lg: "100vh",
              md: "100vh",
              sm: "100vh",
              xs: "100vh",
            },
          }}
          className={styles.centeredContainer}
        >
          <Box
            component="form"
            sx={{
              width: "100%",
              overflowY: "auto",
            }}
            className={styles.centeredContainer}
            onSubmit={formik.handleSubmit}
          >
            {isMobile && (
              <img
                alt="logo"
                src={logo}
                style={{
                  width: "30%",
                  height: "100px",
                  marginTop: "20px",
                }}
              />
            )}

            <Grid
              container
              spacing={2}
              sx={{ marginTop: "10px", overflowY: "auto" }}
              xs={12}
            >
              <Grid item xs={12} className={styles.centeredContainer}>
                <Typography
                  color={"blue"}
                  fontSize={"20px"}
                  fontWeight={"bolder"}
                >
                  {messages.SIGNUP_FORM}
                </Typography>
              </Grid>
              <Grid item xs={12} className={styles.centeredContainer}>
                <TextInput
                  label="First Name"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <Typography className={styles.error}>
                    {formik.errors.firstName}
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>

              <Grid item xs={12} className={styles.centeredContainer}>
                <TextInput
                  label="Last Name"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <Typography className={styles.error}>
                    {formik.errors.lastName}
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>

              <Grid item xs={12} className={styles.centeredContainer}>
                <TextInput
                  label="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                />
                {formik.touched.email && formik.errors.email ? (
                  <Typography className={styles.error}>
                    {formik.errors.email}
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12} className={styles.centeredContainer}>
                <TextInput
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  endIcon={
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <h4>Show</h4> : <h4>Hide</h4>}
                    </IconButton>
                  }
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                />
                {formik.touched.password && formik.errors.password ? (
                  <Typography className={styles.error}>
                    {formik.errors.password}
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>

              <Grid item xs={12} className={styles.centeredContainer}>
                <TextInput
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  endIcon={
                    <IconButton
                      onClick={handleToggleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? <h4>Show</h4> : <h4>Hide</h4>}
                    </IconButton>
                  }
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <Typography className={styles.error}>
                    {formik.errors.confirmPassword}
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>

              <Grid item xs={12} className={styles.centeredContainer}>
                <CustomButton
                  title={messages.SIGNUP}
                  loading={loading}
                  type="submit"
                />
              </Grid>
              <Grid item>
                <NavLink to="/" variant="body2">
                  <Typography className={styles.alreadyAccount}>
                    Already Account ? Login
                  </Typography>
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Signup;
