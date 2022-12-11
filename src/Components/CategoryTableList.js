import React, { useState, useEffect } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Snackbar,
  IconButton,
} from "@mui/material";
import ApiURlS from "../Service/ApiURl's";
import "../Css/Content.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const CategoryTableList = () => {
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    getALlCategories();
  }, []);

  const getALlCategories = () => {
    ApiURlS.getAllProdCategories()
      .then((res) => {
        setcategories(res.data);
      })
      .catch((err) => console.log(err));
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [snack, setsnack] = useState(false);
  const [snackMsg, setsnackMsg] = useState("");
  const deleteCategory = (id) => {
    axios
      .delete(`http://localhost:8080/category/delete/${id}`)
      .then((res) => {
        setsnack(true);
        setsnackMsg(res.data);
        getALlCategories();
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
                  Product Category ID
                </TableCell>
                <TableCell className="tblhd" align="left">
                  Product Category Name
                </TableCell>
                <TableCell className="tblhd" align="left">
                  Product Description Name
                </TableCell>
                <TableCell className="tblhd" align="left">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value, index) => (
                  <TableRow
                    key={index}
                    className={index % 2 ? "classEven" : "classOdd"}
                  >
                    <TableCell align="left">{value.id}</TableCell>
                    <TableCell align="left">{value.categoryName}</TableCell>
                    <TableCell align="left">
                      {value.categoryDescription}
                    </TableCell>
                    <TableCell align="left">
                      <EditIcon
                        style={{
                          color: "blue",
                          cursor: "pointer",
                          marginRight: "20px",
                        }}
                        // onClick={() => openModal(value)}
                      />
                      <DeleteIcon
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => deleteCategory(value.id)}
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
            count={categories.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
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

export default CategoryTableList;
