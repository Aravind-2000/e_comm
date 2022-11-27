import React, { useState } from "react";
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
  FormHelperText,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FileUploader } from "react-drag-drop-files";
import ApiURlS from "../../Service/ApiURl's";
import "../../Css/Content.css";

const AdminSignup = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setpassword] = useState("");
  const [repassword, setrepassword] = useState("");

  const paperStyle = {
    // backgroundColor: "black",
    // color: "orange",
    padding: 50,
    height: "75vh",
    width: 500,
    margin: "10px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
  const [file, setFile] = useState(null);
  const handleFileChange = (file) => {
    setFile(file);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [showPassword1, setShowPassword1] = useState(false);
  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  //File Converter
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkingPasswords(password, repassword)) {
      if (file) {
        const base64 = await convertBase64(file);
        const signupdetails = {
          email,
          password,
          username,
          phoneNumber,
          profilePicture: base64,
        };
        ApiURlS.doSignupAsAdmin(signupdetails)
          .then((res) => {
            console.log(res.data);
            navigate("/login");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const signupdetails_1 = {
          email,
          password,
          username,
          phoneNumber,
        };
        ApiURlS.doSignupAsAdmin(signupdetails_1)
          .then((res) => {
            console.log(res.data);
            navigate("/login");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const [error, seterror] = useState("");

  const checkingPasswords = (pass1, pass2) => {
    if (pass1.trim() === pass2.trim()) {
      setpassword(pass1);
      return true;
    } else {
      seterror("Both passwords doesn't match");
      return false;
    }
  };

  return (
    <div>
      <Paper elevation={5} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Admin Sign Up</h2>
          <br />
        </Grid>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <TextField
                className="formtext"
                label="E-Mail"
                value={email}
                type={"email"}
                placeholder="Enter your E-Mail"
                onChange={(e) => setemail(e.target.value)}
                fullWidth
                required
              />
              <br />
              <TextField
                type={showPassword ? "text" : "password"}
                className="formtext"
                style={{ marginTop: 20 }}
                label="Password"
                value={password}
                placeholder="Enter Password"
                onChange={(e) => setpassword(e.target.value)}
                fullWidth
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
              <br />
              <TextField
                type={showPassword1 ? "text" : "password"}
                className="formtext"
                style={{ marginTop: 20 }}
                label="Password"
                value={repassword}
                placeholder="Re-Enter Password"
                onChange={(e) => setrepassword(e.target.value)}
                fullWidth
                variant="outlined"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword1}
                        onMouseDown={handleMouseDownPassword1}
                      >
                        {showPassword1 ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormHelperText error>
                {error === null ? null : error}{" "}
              </FormHelperText>
              <br />
              <TextField
                className="formtext"
                label="Username"
                style={{ marginTop: 20 }}
                value={username}
                placeholder="Enter username"
                onChange={(e) => setusername(e.target.value)}
                fullWidth
                required
              />
              <br />
              <TextField
                className="formtext"
                label="Phone Number"
                value={phoneNumber}
                style={{ marginTop: 20 }}
                placeholder="Enter phone number"
                onChange={(e) => setphoneNumber(e.target.value)}
                fullWidth
                required
              />
              <br />
              <div style={{ marginTop: 10, marginBottom: 20 }}>
                <span>
                  <h3> Add your Profile Picture </h3>
                </span>
                <FileUploader
                  hoverTitle="Drop Here"
                  label="Drop your profile picture here"
                  handleChange={handleFileChange}
                  name="file"
                  types={fileTypes}
                />
              </div>
              <br />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
                fullWidth
              >
                Sign Up
              </Button>
            </Grid>
            <br />
            <Grid container spacing={2}>
              <Typography style={{ marginLeft: 100, marginTop: 20 }}>
                <span>
                  <b> Already have an Account ? </b>
                </span>
                <Link href="login">Login</Link>
              </Typography>
            </Grid>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default AdminSignup;
