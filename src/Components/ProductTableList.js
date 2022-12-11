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
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Snackbar,
} from "@mui/material";
import ApiURlS from "../Service/ApiURl's";
import "../Css/Content.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditProduct from "./EditProduct";
import CloseIcon from "@mui/icons-material/Close";

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

  const [product, setproduct] = useState("");
  const [editModal, seteditModal] = useState(false);
  const openModal = (prd) => {
    setproduct(prd);
    seteditModal(true);
  };
  const closeModal = () => {
    seteditModal(false);
  };

  const [snack, setsnack] = useState(false);
  const [snackMsg, setsnackMsg] = useState("");
  const deleteProduct = (id) => {
    ApiURlS.deleteProduct(id)
      .then((res) => {
        setsnack(true);
        setsnackMsg(res.data);
        getProducts();
      })
      .catch((err) => {
        setsnack(true);
        setsnackMsg(err.response.data);
      });
  };

  const action = (
    <React.Fragment>
      <IconButton size="small" color="inherit" onClick={() => setsnack(false)}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

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
                  Product Price (₹)
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
                    <TableCell align="justify">{value.productPrice}</TableCell>
                    <TableCell align="left">
                      <Stack direction="row" spacing={2}>
                        <Avatar>
                          <img
                            alt=""
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
                      <EditIcon
                        style={{
                          color: "blue",
                          cursor: "pointer",
                          marginRight: "20px",
                        }}
                        onClick={() => openModal(value)}
                      />
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
      <Dialog
        open={editModal}
        fullWidth="true"
        maxWidth="md"
        onClose={closeModal}
        size="lg"
      >
        <DialogTitle>
          <h2> Edit Product </h2>
          <IconButton
            aria-label="close"
            onClick={closeModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <EditProduct
            close={closeModal}
            product={product}
            setProduct={setproduct}
            getAll={getProducts}
          />
        </DialogContent>
      </Dialog>
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        open={snack}
        autoHideDuration={2000}
        message={snackMsg}
        onClose={() => setsnack(false)}
        action={action}
      />
    </div>
  );
};

export default ProductTableList;
