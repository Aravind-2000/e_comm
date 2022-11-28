import React, { useState, useEffect } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Stack,
  TablePagination,
} from "@mui/material";
import ApiURlS from "../Service/ApiURl's";
import "../Css/Content.css";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductTableList = () => {
  const [products, setproducts] = useState([]);

  function getProducts() {
    ApiURlS.getAllProducts()
      .then((res) => {
        setproducts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getProducts();
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteProduct = (id) => {
    ApiURlS.deleteProduct(id)
      .then((res) => {
        console.log(res.data);
        getProducts();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Paper className="paperStyle">
        <TableContainer sx={{ maxHeight: 440, maxWidth: 1300 }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead
              sx={{ zIndex: 3, backgroundColor: "black" }}
              className="tableheader"
            >
              <TableRow className="tablerow">
                <TableCell className="tblhd" align="left">
                  Product ID
                </TableCell>
                <TableCell className="tblhd" align="left">
                  Product Name
                </TableCell>
                <TableCell className="tblhd" align="left">
                  Product Category
                </TableCell>
                <TableCell className="tblhd" align="left">
                  Product Image
                </TableCell>
                <TableCell className="tblhd" align="left">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value, index) => (
                  <TableRow
                    key={index}
                    className={index % 2 ? "classEven" : "classOdd"}
                  >
                    <TableCell align="left">{value.productId}</TableCell>
                    <TableCell align="left">{value.productName}</TableCell>
                    <TableCell align="left">
                      {value.productCategory?.categoryName}
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" spacing={2}>
                        <Avatar>
                          <img
                            alt="Product Image"
                            src={value.productImage}
                            style={{
                              position: "relative",
                              height: "40px",
                              width: "40px",
                            }}
                          />
                        </Avatar>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      <DeleteIcon
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => deleteProduct(value.productId)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <br />
          <TablePagination
            className="contentPagination"
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    </div>
  );
};

export default ProductTableList;
