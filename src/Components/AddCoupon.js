import React, { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Box,
  Grid,
  FormControl,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import dayjs from "dayjs";
import ApiURlS from "../Service/ApiURl's";
import PercentIcon from "@mui/icons-material/Percent";

const AddCoupon = ({ close }) => {
  const [events, setevents] = useState([]);
  useEffect(() => {
    ApiURlS.getAllEvent()
      .then((res) => {
        setevents(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [couponCode, setcouponCode] = useState("");
  const [couponDiscount, setcouponDiscount] = useState("");
  const [eventId, seteventId] = useState("");
  const [expirydate, setexpiryDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (expirydate !== "") {
      const expiryDate = dayjs(expirydate).format("MM-DD-YYYY");
      const coupon = { couponCode, couponDiscount, eventId, expiryDate };
      ApiURlS.addCoupon(coupon)
        .then((res) => {
          close();
        })
        .catch((err) => console.log(err));
    } else {
      const coupon = { couponCode, couponDiscount, eventId };
      ApiURlS.addCoupon(coupon)
        .then((res) => {
          close();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <form autoComplete="off">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={8} lg={5}>
              <TextField
                fullWidth
                className="formtext"
                margin="dense"
                variant="outlined"
                placeholder="Enter Coupon Code "
                value={couponCode}
                label="Coupon Code"
                onChange={(e) => setcouponCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={10} md={8} lg={5}>
              <TextField
                fullWidth
                className="formtext"
                margin="dense"
                variant="outlined"
                placeholder="Enter Coupon Discount "
                value={couponDiscount}
                label="Coupon Discount"
                onChange={(e) => setcouponDiscount(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {<PercentIcon />}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={10} md={8} lg={5}>
              <TextField
                select
                fullWidth
                className="formtext"
                margin="dense"
                variant="outlined"
                placeholder="Enter Event "
                value={eventId}
                label="Event"
                onChange={(e) => seteventId(e.target.value)}
                required
              >
                {events?.map((val) => (
                  <MenuItem value={val.eventId}> {val.eventName} </MenuItem>
                ))}
              </TextField>
            </Grid>
            {eventId === "" ? (
              <Grid item xs={10} md={8} lg={5}>
                <FormControl
                  style={{ marginTop: "0.5rem" }}
                  className="formtext"
                  fullWidth
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      inputFormat="DD/MM/YYYY"
                      label="Expiry Date"
                      placeholder="Coupon Expiry Date"
                      fullWidth
                      value={expirydate}
                      onChange={(date) => setexpiryDate(date)}
                      renderInput={(params) => (
                        <TextField {...params} required />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
            ) : null}
          </Grid>
          <br />
          <br />
          <Button
            onClick={(e) => handleSubmit(e)}
            variant="contained"
            color="success"
          >
            Save
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddCoupon;
