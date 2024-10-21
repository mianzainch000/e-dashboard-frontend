import React, { useEffect, useState } from "react";
import api from "../../api";
import DeleteModal from "../../Components/DeleteModal";
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
} from "@mui/material";
import { useSnackbar } from "../../Components/Snackbar";

const ProductPage = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); // State for controlling the modal
  const [selectedProductId, setSelectedProductId] = useState(null); // State to store the selected product ID
  const snackBarMessage = useSnackbar();

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
    setSelectedProductId(id); // Set the selected product ID
    setModalOpen(true); // Open the modal
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
        setModalOpen(false); // Close the modal after successful deletion
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

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "40vh",
      }}
    >
      <TableContainer component={Paper} sx={{ maxWidth: 600, margin: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
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
              </TableRow>
            ))}
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
        onClick={deleteProduct} // Call deleteProduct when confirmed
      />
    </Box>
  );
};

export default ProductPage;
