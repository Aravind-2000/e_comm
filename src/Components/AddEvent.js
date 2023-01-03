import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Box,
  Grid,
  FormControl,
  Button,
  TextField,
  FormHelperText,
} from "@mui/material";
import dayjs from "dayjs";
import ApiURlS from "../Service/ApiURl's";

const AddEvent = ({ close }) => {
  const [eventName, seteventName] = useState("");
  const [eventstartdate, seteventStartDate] = useState(null);
  const [eventenddate, seteventEndDate] = useState(null);

  const [dateErrorText, setdateErrorText] = useState("");
  const compareDates = (date1, date2) => {
    if (dayjs(date1).isBefore(dayjs()) || dayjs(date2).isBefore(dayjs())) {
      setdateErrorText("Start date or end date is before current date");
      return false;
    } else {
      if (dayjs(date1).isAfter(date2)) {
        setdateErrorText("Start date is after the end date");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventStartDate = dayjs(eventstartdate).format("MM-DD-YYYY");
    const eventEndDate = dayjs(eventenddate).format("MM-DD-YYYY");
    if (compareDates(eventStartDate, eventEndDate)) {
      const body = {
        eventName,
        eventStartDate,
        eventEndDate,
      };
      // console.log(body)
      ApiURlS.addEvent(body)
        .then((res) => {
          // console.log(res.data);
          close();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8} md={6} lg={4}>
              <TextField
                fullWidth
                className="formtext"
                margin="dense"
                variant="outlined"
                placeholder="Enter Event Name "
                value={eventName}
                label="Event Name"
                required
                onChange={(e) => seteventName(e.target.value)}
              />
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <FormControl
                style={{ marginTop: "0.5rem" }}
                className="formtext"
                fullWidth
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    inputFormat="DD/MM/YYYY"
                    label="Start Date"
                    placeholder="Event Start Date"
                    fullWidth
                    value={eventstartdate}
                    onChange={(date) => {
                      seteventStartDate(date);
                    }}
                    renderInput={(params) => <TextField {...params} required />}
                  />
                </LocalizationProvider>
              </FormControl>
              <FormHelperText sx={{ fontSize: "19px" }} error>
                {" "}
                {dateErrorText === null ? null : dateErrorText}{" "}
              </FormHelperText>
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <FormControl
                style={{ marginTop: "0.5rem" }}
                className="formtext"
                fullWidth
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    inputFormat="DD/MM/YYYY"
                    label="End Date"
                    placeholder="Event End Date"
                    fullWidth
                    value={eventenddate}
                    onChange={(date) => {
                      seteventEndDate(date);
                    }}
                    renderInput={(params) => <TextField {...params} required />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
          </Grid>
          <br />
          <Button
            // onClick={(e) => handleSubmit(e)}
            type="submit"
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

export default AddEvent;
