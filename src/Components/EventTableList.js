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
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

const EventTableList = () => {
  const [events, setevents] = useState([]);

  useEffect(() => {
    getEvents();
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function getEvents() {
    ApiURlS.getAllEvent()
      .then((res) => {
        setevents(res.data);
      })
      .catch((err) => console.log(err));
  }

  const [snack, setsnack] = useState(false);
  const [snackMsg, setsnackMsg] = useState("");
  const deleteEvent = (id) => {
    axios
      .delete(`http://localhost:8080/event/delete/${id}`)
      .then((res) => {
        setsnack(true);
        setsnackMsg(res.data);
        getEvents();
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
                  Event Name
                </TableCell>
                <TableCell className="tblhd" align="left">
                  Event Start Date
                </TableCell>
                <TableCell className="tblhd" align="left">
                  Event End Date
                </TableCell>
                <TableCell className="tblhd" align="left">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value, index) => (
                  <TableRow
                    key={index}
                    className={index % 2 ? "classEven" : "classOdd"}
                  >
                    <TableCell align="left">{value.eventName}</TableCell>
                    <TableCell align="left">
                      {dayjs(value.eventStartDate).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell align="left">
                      {dayjs(value.eventEndDate).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell align="left">
                      {/* <EditIcon
                        style={{
                          color: "blue",
                          cursor: "pointer",
                          marginRight: "20px",
                        }}
                         onClick={() => openModal(value)}
                      /> */}
                      <DeleteIcon
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => deleteEvent(value.eventId)}
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
            count={events.length}
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

export default EventTableList;
