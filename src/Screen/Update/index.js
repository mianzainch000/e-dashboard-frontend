import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../api";
import { TextField, Button, Box, Container } from "@mui/material";
import { useSnackbar } from "../../Components/Snackbar";
import { useParams } from "react-router-dom";
const Update = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be a positive number"),
    category: Yup.string().required("Category is required"),
    company: Yup.string().required("Company is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      category: "",
      company: "",
    },
    validationSchema,
    onSubmit: (values) => {
      postData(values);
    },
  });
  const snackBarMessage = useSnackbar();
  const postData = async (values) => {
    try {
      const data = {
        name: values.name,
        price: values.price,
        category: values.category,
        company: values.company,
      };
      const res = await api.post("add-product", data);
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
    }
  };

  // Values in form
  const { id } = useParams();

  const fetchingData = async () => {
    const response = await api.get(`eiditProduct/${id}`);
    formik.setValues({
      name: response.data.name,
      price: response.data.price,
      category: response.data.category,
      company: response.data.company,
    });
  };
  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <h1>Add Product</h1>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Product Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{ width: "500px " }}
          />

          <TextField
            fullWidth
            id="price"
            name="price"
            label="Price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            sx={{ width: "500px" }}
          />

          <TextField
            fullWidth
            id="category"
            name="category"
            label="Category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={formik.touched.category && formik.errors.category}
            sx={{ width: "500px" }}
          />

          <TextField
            fullWidth
            id="company"
            name="company"
            label="Company"
            value={formik.values.company}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.company && Boolean(formik.errors.company)}
            helperText={formik.touched.company && formik.errors.company}
            sx={{ width: "500px" }}
          />

          <Button color="primary" variant="contained" fullWidth type="submit">
            Update
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Update;
