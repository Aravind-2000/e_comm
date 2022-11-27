import React, { useState, useEffect } from "react";
import ApiURlS from "../Service/ApiURl's";
import { styled, Grid, Paper, Typography, ButtonBase } from "@mui/material";

const Checkout = ({ product }) => {
  const [count, setcount] = useState(1);
  const [coupons, setcoupons] = useState([]);

  useEffect(() => {
    ApiURlS.getAllCoupon()
      .then((res) => {
        setcoupons(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    width: 200,
    height: 200,
  });

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
        <Typography variant="h4"> Check Out </Typography>
        <br />
        <hr />
        <br />

        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase>
              <Grid item>
                <Img alt="product" src={product?.productImage} />
              </Grid>
            </ButtonBase>
          </Grid>
          <Grid item xs={8} sm container>
            <Grid item container sm direction="column" spacing={1}>
              <Grid item xs>
                <Typography gutterBottom variant="h5" component="div">
                  {product?.productName}
                </Typography>
              </Grid>
              <Grid item xs sm={2} md={4} lg={4}></Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h6" component="div">
              ₹ {product?.productPrice}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Checkout;
