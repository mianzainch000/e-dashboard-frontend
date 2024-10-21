// import React from "react";
// import Cookies from "js-cookie";

// const ProductPage = () => {
//   const firstName = Cookies.get("firstName");
//   const lastName = Cookies.get("lastName");

//   return (
//     <h1>
//       Welcome, {firstName}&nbsp;{lastName}
//     </h1>
//   );
// };

// export default ProductPage;

import React, { useEffect, useState } from "react";
import api from "../../api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

const ProductPage = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const res = await api.get("products");
    setData(res?.data);
  };
  useEffect(() => {
    getData();
  }, []);
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
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.company}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductPage;
