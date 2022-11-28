import React, { useState, useEffect } from "react";
import ApiURlS from "../Service/ApiURl's";
import {
  styled,
  Grid,
  Paper,
  Typography,
  ButtonBase,
  Button,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const userid = localStorage.getItem("userid");
  const { productid } = useParams();
  const [count, setcount] = useState(1);
  const [coupons, setcoupons] = useState([]);

  const [product, setproduct] = useState("");
  const [finalPrice, setfinalPrice] = useState("");

  const [enteredCoupon, setenteredCoupon] = useState("");

  useEffect(() => {
    ApiURlS.getAllCoupon()
      .then((res) => {
        setcoupons(res.data);
      })
      .catch((err) => console.log(err));
    ApiURlS.getProduct(productid)
      .then((res) => {
        setproduct(res.data);
        setfinalPrice(res.data.productPrice);
      })
      .catch((err) => console.log(err));
  }, []);

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    width: 200,
    height: 200,
  });

  const [clickedDiscount, setclickedDiscount] = useState("");
  const applyCoupon = () => {
    setfinalPrice(finalPrice - product.productPrice * (clickedDiscount / 100));
  };

  function decCount() {
    if (count === 1) {
      setcount(1);
    } else {
      setcount(count - 1);
    }
  }

  const placeOrder = (e) => {
    e.preventDefault();
    const data = {
      productId: productid,
      userId: userid,
      quantity: count,
      totalAmount: finalPrice,
      status: "Order Placed",
      orderId: Math.random().toString(36).slice(2, 9),
    };
    console.log(data);
    ApiURlS.placeOrder(data)
      .then((res) => {
        console.log(res.data);
        navigate("/myorders");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Paper
        elevation={5}
        sx={{
          p: 1,
          my: 2,
          marginLeft: 9,
          width: 1670,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Typography variant="h3" sx={{ marginLeft: 4 }}>
          {" "}
          Check Out{" "}
        </Typography>
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
              <Grid item xs sm={2} md={4} lg={4}>
                <Typography
                  sx={{ textAlign: "left", marginLeft: 4.5 }}
                  variant="h6"
                >
                  Quantity
                </Typography>
                <Button onClick={() => decCount()} variant="outlined">
                  -
                </Button>
                <span> {count} </span>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setcount(count + 1);
                    console.log(count);
                    setfinalPrice(product.productPrice * (count + 1));
                  }}
                >
                  +
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={2}>
            <Typography variant="h6" component="div">
              ₹ {finalPrice}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={30}>
          <Grid item></Grid>
          <Grid item></Grid>
          <Grid item></Grid>
          <Grid item>
            <TextField
              fullWidth
              className="formtext"
              margin="dense"
              variant="outlined"
              placeholder="Enter Coupon Code "
              value={enteredCoupon}
              label="Coupon Code"
              onChange={(e) => setenteredCoupon(e.target.value)}
            />
            <Button onClick={() => applyCoupon()}>APPLY</Button>
          </Grid>
          <Grid item>
            <Button
              onClick={(e) => placeOrder(e)}
              variant="contained"
              color="success"
            >
              {" "}
              Place Order{" "}
            </Button>
          </Grid>
        </Grid>

        <hr />
      </Paper>
      <Typography variant="h4" sx={{ color: "orange", marginLeft: 9 }}>
        Available Coupons
      </Typography>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        {coupons.map((coupon) => {
          return (
            <Grid item xs={6} sm={4} md={4}>
              <ButtonBase
                sx={{ borderColor: "orange" }}
                onClick={() => {
                  setenteredCoupon(coupon.couponCode);
                  setclickedDiscount(coupon.couponDiscount);
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 1,
                    marginLeft: 10,
                    marginTop: 3,
                    width: "auto",
                    backgroundColor: "orange",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "black", marginLeft: 1 }}
                    component="div"
                  >
                    With a flat discount {coupon.couponDiscount}% for all
                    mobiles
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: "black" }}
                    component="div"
                  >
                    Use code "{coupon.couponCode}"
                  </Typography>
                </Paper>
              </ButtonBase>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Checkout;
