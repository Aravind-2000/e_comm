import React, { useState, useEffect } from "react";
import ApiURlS from "../Service/ApiURl's";
import { Grid, styled, Typography, Paper, ButtonBase } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ProductDetails from "./ProductDetails";
import { useNavigate } from "react-router-dom";

const ProductsList = () => {
  const [products, setproducts] = useState([]);
  const navigate = useNavigate();

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    width: 200,
    height: 200,
  });

  useEffect(() => {
    ApiURlS.getAllProducts()
      .then((res) => {
        setproducts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [productDetailsDialog, setproductDetailsDialog] = useState("");
  const [productDetails, setproductDetails] = useState("");
  const opendetails = (product) => {
    setproductDetails(product);
    setproductDetailsDialog(true);
  };
  const closedetails = () => {
    setproductDetailsDialog(false);
  };

  const condition = localStorage.getItem("condition");
  const AddToCart = (pid) => {
    if (condition === null) {
      navigate("/login");
    } else {
      const cid = localStorage.getItem("cartid");
      ApiURlS.addProductToCart(pid, cid)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const buyNow = (pid) => {
    if (condition === null) {
      navigate("/login");
    } else {
      navigate(`/checkout/${pid}`);
    }
  };

  const role = localStorage.getItem("role");

  return (
    <div>
      <Grid container spacing={2}>
        {products.map((product, index) => {
          return (
            <>
              <Paper
                elevation={5}
                sx={{
                  p: 1,
                  margin: "auto",
                  flexGrow: 3,
                  my: 2,
                  width: 412,
                  mx: 2,
                  marginLeft: 4.5,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                }}
              >
                <Grid container spacing={2}>
                  <>
                    <Grid item>
                      <ButtonBase onClick={() => opendetails(product)}>
                        <Grid item key={index}>
                          <Img alt="product" src={product.productImage} />
                        </Grid>
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={8} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography gutterBottom variant="h5" component="div">
                            {product.productName}
                          </Typography>
                          {/* <Typography variant="h6" gutterBottom>
                            {product.productCategory?.categoryName}
                          </Typography> */}
                          <Grid item>
                            <Typography variant="h6" color="red">
                              ₹ {product.productPrice}
                            </Typography>
                          </Grid>
                          <br />
                          {role !== "1" ? (
                            <Grid container spacing={2}>
                              <Grid item>
                                <Typography
                                  component="Button"
                                  sx={{
                                    cursor: "pointer",
                                    paddingRight: 2,
                                    borderRadius: "20px",
                                    backgroundColor: "lightgoldenrodyellow",
                                  }}
                                  color="black"
                                  variant="h6"
                                  onClick={() => AddToCart(product.productId)}
                                >
                                  Add to Cart
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography
                                  component="Button"
                                  sx={{
                                    cursor: "pointer",
                                    paddingRight: 5,
                                    borderRadius: "20px",
                                    backgroundColor: "orange",
                                  }}
                                  color="black"
                                  variant="h6"
                                  onClick={() => buyNow(product.productId)}
                                >
                                  Buy Now
                                </Typography>
                              </Grid>
                            </Grid>
                          ) : null}
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                </Grid>
              </Paper>
            </>
          );
        })}
      </Grid>

      <Dialog
        open={productDetailsDialog}
        fullWidth="true"
        maxWidth="md"
        onClose={closedetails}
        size="md"
      >
        <DialogTitle>
          <h1> Product Details </h1>
          <IconButton
            aria-label="close"
            onClick={closedetails}
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
          <ProductDetails productDetails={productDetails} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsList;
