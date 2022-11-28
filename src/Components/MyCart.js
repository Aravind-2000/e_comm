import React, { useState, useEffect } from "react";
import ApiURlS from "../Service/ApiURl's";
import { styled, Grid, Paper, Typography, ButtonBase } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ProductDetails from "./ProductDetails";
import { useNavigate } from "react-router-dom";
import Checkout from "./Checkout";
import { Route, Routes } from "react-router-dom";

const MyCart = () => {
  const Navigate = useNavigate();
  const userid = localStorage.getItem("userid");
  const [myCartItems, setmyCartItems] = useState([]);

  function getCart() {
    ApiURlS.getMyCart(userid)
      .then((res) => {
        setmyCartItems(res.data?.productsInCart);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getCart();
  }, []);

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    width: 200,
    height: 200,
  });

  const [productDetailsDialog, setproductDetailsDialog] = useState("");
  const [productDetails, setproductDetails] = useState("");
  const opendetails = (product) => {
    setproductDetails(product);
    setproductDetailsDialog(true);
  };
  const closedetails = () => {
    setproductDetailsDialog(false);
  };

  function removeFromCart(pid) {
    ApiURlS.removeProductFromCart(pid, localStorage.getItem("cartid"))
      .then((res) => {
        console.log(res.data);
        getCart();
      })
      .catch((err) => console.log(err));
  }

  const [tocheckout, settocheckout] = useState("");
  function checkout(item) {
    settocheckout(item);
    Navigate(`/checkout/${item}`);
  }

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
        {myCartItems.length !== 0 ? (
          <>
            <Typography variant="h4"> Shopping Cart </Typography>
            <br />
            <Typography variant="h6" sx={{ textAlign: "end" }}>
              Price
            </Typography>
            <hr />
            <br />
            <Grid spacing={2}>
              {myCartItems.map((items, index) => {
                return (
                  <>
                    <Grid container spacing={2}>
                      <Grid item>
                        <ButtonBase onClick={() => opendetails(items)}>
                          <Grid item key={index}>
                            <Img alt="product" src={items.productImage} />
                          </Grid>
                        </ButtonBase>
                      </Grid>
                      <Grid item xs={8} sm container>
                        <Grid item container sm direction="column" spacing={1}>
                          <Grid item xs>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {items.productName}
                            </Typography>
                          </Grid>
                          <Grid item xs sm={2} md={4} lg={4}>
                            <Typography
                              component="Button"
                              variant="h6"
                              onClick={() => checkout(items.productId)}
                              sx={{
                                color: "black",
                                backgroundColor: "yellow",
                                cursor: "pointer",
                                borderRadius: "7px",
                                mr: 3,
                              }}
                            >
                              Checkout
                            </Typography>
                            <Typography
                              component="Button"
                              variant="h6"
                              sx={{
                                color: "white",
                                backgroundColor: "red",
                                cursor: "pointer",
                                borderRadius: "7px",
                              }}
                              onClick={() => removeFromCart(items.productId)}
                            >
                              Delete
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography variant="h6" component="div">
                          ₹ {items.productPrice}
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
            You have Nothing in your cart. Add some products to the Cart{" "}
          </Typography>
        )}
      </Paper>

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
      <Routes>
        <Route
          exact
          path={"/checkout"}
          render={(props) => <Checkout {...props} product={tocheckout} />}
        />
      </Routes>
    </div>
  );
};

export default MyCart;
