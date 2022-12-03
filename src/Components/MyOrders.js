import React, { useState, useEffect } from "react";
import ApiURlS from "../Service/ApiURl's";
import { styled, Grid, Paper, Typography, ButtonBase } from "@mui/material";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [myOrders, setmyOrders] = useState([]);
  const userid = localStorage.getItem("userid");
  const Img = styled("img")({
    margin: "auto",
    display: "block",
    width: 200,
    height: 200,
  });

  const getMyOrders = () => {
    ApiURlS.getUsersOrders(userid)
      .then((res) => {
        setmyOrders(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMyOrders();
  }, [userid]);

  return (
    <div>
      <Paper
        elevation={5}
        sx={{
          p: 1,
          margin: "auto",
          my: 2,
          width: "maxWidth",
          mx: 2,
          marginLeft: 4.5,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        {myOrders.length !== 0 ? (
          <>
            <Typography variant="h4"> My Orders </Typography>
            <br />
            <Typography variant="h6" sx={{ textAlign: "end" }}>
              Price
            </Typography>
            <hr />
            <br />
            <Grid spacing={2}>
              {myOrders.map((items, index) => {
                return (
                  <>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Grid item key={index}>
                          <Img
                            alt="product"
                            src={items.productDetails?.productImage}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={8} sm container>
                        <Grid item container sm direction="column" spacing={1}>
                          <Grid item xs>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {items.productDetails?.productName}
                            </Typography>
                          </Grid>
                          <Grid item xs>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Quantity : {items.quantity}
                            </Typography>
                          </Grid>
                          <Grid item xs>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              Order Status : {items.status}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography variant="h6" component="div">
                          ₹ {parseFloat(items.totalAmount).toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                    <hr />
                  </>
                );
              })}
            </Grid>
          </>
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            You have ordered nothing, Order something.
            <Link to="/products"> Smart Buy </Link>
          </Typography>
        )}
      </Paper>
    </div>
  );
};

export default MyOrders;
