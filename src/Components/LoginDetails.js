import React, { useState } from "react";
import { Paper, Button, Box, Grid } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import AddProduct from "./AddProduct";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddCategory from "./AddCategory";
import AddEvent from "./AddEvent";
import AddCoupon from "./AddCoupon";
import ProductTableList from "./ProductTableList";
import CategoryTableList from "./CategoryTableList";
import CouponTableList from "./CouponTableList";
import EventTableList from "./EventTableList";

const LoginDetails = () => {
  const role = localStorage.getItem("role");

  const paperStyle1 = {
    padding: 20,
    paddingLeft: 40,
    height: "20vh",
    marginLeft: 50,
    marginTop: 50,
    width: 200,
  };

  const [product, setproduct] = useState(false);
  const openAddProduct = () => {
    setproduct(true);
  };
  const closeAddProduct = () => {
    setproduct(false);
  };

  const [category, setcategory] = useState(false);
  const openAddCategory = () => {
    setcategory(true);
  };
  const closeAddCatgory = () => {
    setcategory(false);
  };

  const [coupon, setcoupon] = useState(false);
  const openAddCoupon = () => {
    setcoupon(true);
  };
  const closeAddCoupon = () => {
    setcoupon(false);
  };

  const [event, setevent] = useState(false);
  const openAddEvent = () => {
    setevent(true);
  };
  const closeAddEvent = () => {
    setevent(false);
  };

  const [productlist, setproductlist] = useState(false);
  const openProductList = () => {
    setproductlist(true);
  };
  const closeProductList = () => {
    setproductlist(false);
  };

  const [categoryList, setcategoryList] = useState(false);
  const openCategoryList = () => {
    setcategoryList(true);
  };
  const closeCategoryList = () => {
    setcategoryList(false);
  };

  const [couponList, setcouponList] = useState(false);
  const openCouponList = () => {
    setcouponList(true);
  };
  const closeCouponList = () => {
    setcouponList(false);
  };

  const [eventList, seteventList] = useState(false);
  const openEventList = () => {
    seteventList(true);
  };
  const closeEventList = () => {
    seteventList(false);
  };

  return (
    <div>
      {role === "1" ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={10} columns={{ xs: 10, sm: 24, md: 26 }}>
            <Grid item xs={6}>
              <Paper elevation={4} style={paperStyle1}>
                <h2 variant="h2"> Products </h2>
                <Button
                  variant="contained"
                  onClick={openAddProduct}
                  color="success"
                >
                  Add Product
                </Button>
                <br />
                <Button
                  style={{ marginTop: 20 }}
                  variant="contained"
                  color="primary"
                  onClick={() => openProductList()}
                >
                  Product List
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={4} style={paperStyle1}>
                <h2> Product Categories </h2>
                <Button
                  variant="contained"
                  onClick={() => openAddCategory()}
                  color="success"
                >
                  Add Category
                </Button>
                <br />
                <Button
                  style={{ marginTop: 20 }}
                  variant="contained"
                  color="primary"
                  onClick={() => openCategoryList()}
                >
                  Category List
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={4} style={paperStyle1}>
                <h2> Coupons </h2>
                <Button
                  variant="contained"
                  onClick={() => openAddCoupon()}
                  color="success"
                >
                  Add Coupon
                </Button>
                <br />
                <Button
                  style={{ marginTop: 20 }}
                  variant="contained"
                  color="primary"
                  onClick={() => openCouponList()}
                >
                  Coupon List
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={4} style={paperStyle1}>
                <h2> Events </h2>
                <Button
                  variant="contained"
                  onClick={() => openAddEvent()}
                  color="success"
                >
                  Add Event
                </Button>
                <br />
                <Button
                  style={{ marginTop: 20 }}
                  variant="contained"
                  color="primary"
                  onClick={() => openEventList()}
                >
                  Event List
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      ) : null}

      {/* Add Product */}
      <Dialog
        open={product}
        fullWidth="true"
        maxWidth="lg"
        onClose={closeAddProduct}
        size="lg"
      >
        <DialogTitle>
          <h2> Add Product </h2>
          <IconButton
            aria-label="close"
            onClick={closeAddProduct}
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
          <AddProduct close={closeAddProduct} />
        </DialogContent>
      </Dialog>

      {/* Add Category */}
      <Dialog
        open={category}
        fullWidth="true"
        maxWidth="md"
        onClose={closeAddCatgory}
        size="md"
      >
        <DialogTitle>
          <h2> Add Category </h2>
          <IconButton
            aria-label="close"
            onClick={closeAddCatgory}
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
          <AddCategory close={closeAddCatgory} />
        </DialogContent>
      </Dialog>

      {/* Add Coupon */}
      <Dialog
        open={coupon}
        fullWidth="true"
        maxWidth="md"
        onClose={closeAddCoupon}
        size="md"
      >
        <DialogTitle>
          <h2> Add Coupon </h2>
          <IconButton
            aria-label="close"
            onClick={closeAddCoupon}
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
          <AddCoupon close={closeAddCoupon} />
        </DialogContent>
      </Dialog>

      {/* Add Event */}
      <Dialog
        open={event}
        fullWidth="true"
        maxWidth="lg"
        onClose={closeAddEvent}
        size="lg"
      >
        <DialogTitle>
          <h2> Add Event </h2>
          <IconButton
            aria-label="close"
            onClick={closeAddEvent}
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
          <AddEvent close={closeAddEvent} />
        </DialogContent>
      </Dialog>

      {/* Product List */}
      <Dialog
        open={productlist}
        fullWidth="true"
        maxWidth="lg"
        onClose={closeProductList}
        size="lg"
      >
        <DialogTitle>
          <h2> Products </h2>
          <IconButton
            onClick={closeProductList}
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
          <ProductTableList />
        </DialogContent>
      </Dialog>

      {/* Category List */}
      <Dialog
        open={categoryList}
        fullWidth="true"
        maxWidth="lg"
        onClose={closeCategoryList}
        size="lg"
      >
        <DialogTitle>
          <h2> Product Categories </h2>
          <IconButton
            onClick={closeCategoryList}
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
          <CategoryTableList />
        </DialogContent>
      </Dialog>

      {/* Coupon List */}
      <Dialog
        open={couponList}
        fullWidth="true"
        maxWidth="lg"
        onClose={closeCouponList}
        size="lg"
      >
        <DialogTitle>
          <h2> Coupons </h2>
          <IconButton
            onClick={closeCouponList}
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
          <CouponTableList />
        </DialogContent>
      </Dialog>

      {/* Event List */}
      <Dialog
        open={eventList}
        fullWidth="true"
        maxWidth="lg"
        onClose={closeEventList}
        size="lg"
      >
        <DialogTitle>
          <h2> Events </h2>
          <IconButton
            onClick={closeEventList}
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
          <EventTableList />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginDetails;
