import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useState } from "react";
import ApiURlS from "../Service/ApiURl's";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  let navigate = useNavigate();
  const paperStyle = {
    padding: 50,
    height: "65vh",
    width: 500,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "50px 0", marginLeft: "12.5rem" };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const logindetails = { email, password };
    ApiURlS.getLoginDetails(logindetails)
      .then((res) => {
        getCartId(res.data.userId);
        localStorage.setItem("userid", res.data.userId);
        localStorage.setItem("username", res.data.userName);
        localStorage.setItem("email", res.data.userEmail);
        localStorage.setItem("dp", res.data.profilePicture);
        localStorage.setItem("role", res.data.roleFlag);
        localStorage.setItem("condition", true);
        setError(false);
        if (res.data.roleFlag === 1) {
          navigate("/logindetails");
        } else {
          navigate("/products");
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  const getCartId = (id) => {
    axios
      .get(`http://localhost:8080/cart/getcartid/` + id)
      .then((res) => {
        localStorage.setItem("cartid", res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Paper elevation={5} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Login</h2>
          <br />
          <form onSubmit={handleSubmit} autoComplete="off">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <TextField
                  className="formtext"
                  label="E-Mail"
                  value={email}
                  placeholder="Enter E-Mail"
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                />
                <br />
                <br />
                <TextField
                  type={showPassword ? "text" : "password"}
                  className="formtext"
                  label="Password"
                  value={password}
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  style={{ marginTop: 20 }}
                  variant="outlined"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={btnstyle}
                >
                  Login
                </Button>
              </Grid>
              <Grid container spacing={2}>
                <Button
                  style={{
                    color: "white",
                    backgroundColor: "green",
                    marginLeft: 160,
                    marginTop: 30,
                  }}
                >
                  <Link
                    href="signup"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Create An Account
                  </Link>
                </Button>

                {error ? (
                  <Typography style={{ color: "red", margin: 50 }}>
                    Bad Credentials , E-Mail or Password is wrong
                  </Typography>
                ) : null}
              </Grid>
            </Box>
          </form>
        </Grid>
      </Paper>
    </div>
  );
};

export default Login;
