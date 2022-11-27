import React from "react";
import { styled, Grid, Typography } from "@mui/material";

const ProductDetails = ({ productDetails }) => {
  const Img = styled("img")({
    margin: "auto",
    display: "block",
    width: 200,
    height: 200,
  });
  return (
    <div>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <Img alt="product" src={productDetails?.productImage} />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h4">{productDetails?.productName}</Typography>
          <Typography variant="h5">
            {productDetails?.productDescription}
          </Typography>
          <Typography variant="h5">
            Buy At {productDetails?.productPrice}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductDetails;
