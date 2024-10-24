import api from "../../api";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DeleteModal from "../../Components/DeleteModal";
import { useSnackbar } from "../../Components/Snackbar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  TextField, // Import TextField for the search bar
  Typography, // Import Typography for displaying the no records message
} from "@mui/material";

const ProductPage = () => {
  const snackBarMessage = useSnackbar();
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State to store search input

  const getData = async () => {
    const res = await api.get("products");
    if (res.status === 201) {
      setData(res?.data);
    } else {
      snackBarMessage({ type: "error", message: "Failed to fetch products" });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedProductId(id);
    setModalOpen(true);
  };

  const deleteProduct = async () => {
    try {
      const res = await api.delete(`delete-product/${selectedProductId}`);
      if (res.status === 201) {
        setData((prevData) =>
          prevData.filter((product) => product._id !== selectedProductId)
        );
        snackBarMessage({
          type: "success",
          message: "Product deleted successfully",
        });
        setModalOpen(false);
      } else {
        snackBarMessage({
          type: "error",
          message: res?.data?.message,
        });
      }
    } catch (error) {
      snackBarMessage({
        type: "error",
        message: error.message || "An error occurred",
      });
    }
  };

  // Filter the products based on searchQuery
  // Filter the products based on searchQuery (by name or price)
  const filteredData = data.filter((product) => {
    const nameMatch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const priceMatch = product.price.toString().includes(searchQuery);
    return nameMatch || priceMatch;
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column", // Align items vertically
        // height: "100vh",
        padding: 2,
      }}
    >
      {/* Search Bar */}
      <TextField
        label="Search Products"
        variant="outlined"
        sx={{ marginBottom: 2, width: "45%" }} // Style the search bar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
      />

      <TableContainer component={Paper} sx={{ maxWidth: 600, margin: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.company}</TableCell>
                  <TableCell>
                    <Button
                      color="secondary"
                      onClick={() => handleDeleteClick(row._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Link to={`/update/${row._id}`}>Edit Product</Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" color="textSecondary">
                    No products match your search.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Modal */}
      <DeleteModal
        open={modalOpen}
        title={"Delete Product"}
        cancel={"Cancel"}
        msg={"Are you sure you want to delete this product?"}
        onClose={() => setModalOpen(false)}
        onClick={deleteProduct}
      />
    </Box>
  );
};

export default ProductPage;
