import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Menu, Divider } from "@mui/material";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import SecurityUpdateGoodIcon from "@mui/icons-material/SecurityUpdateGood";
import AccountCircle from "@mui/icons-material/AccountCircle";

function ResponsiveAppBar() {
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/products");
  };

  function goToLogin() {
    navigate("/login");
  }

  const username = localStorage.getItem("username");
  const profile = localStorage.getItem("dp");
  const condition = localStorage.getItem("condition");
  const role = localStorage.getItem("role");

  return (
    <AppBar
      enableColorOnDark="true"
      sx={{ backgroundColor: "#ffa31a" }}
      position="sticky"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ color: "black" }}
          >
            <SecurityUpdateGoodIcon />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/products"
            sx={{ flexGrow: 1, textDecoration: "none", color: "black" }}
          >
            SMART BUY
          </Typography>
          <Divider />

          {condition !== "true" ? (
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle
                sx={{ width: 30, height: 30 }}
                onClick={goToLogin}
              />
            </IconButton>
          ) : (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar
                  alt={username}
                  src={profile}
                  sx={{ width: 45, height: 45 }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {role === "1" ? (
                  <>
                    {" "}
                    <MenuItem>
                      <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/logindetails"
                        sx={{ textDecoration: "none", color: "black" }}
                      >
                        Admin Dashboard
                      </Typography>
                    </MenuItem>
                  </>
                ) : null}

                <MenuItem>
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/mycart"
                    sx={{ textDecoration: "none", color: "black" }}
                  >
                    My Cart
                  </Typography>
                </MenuItem>
                {role !== 1 ? (
                  <>
                    <MenuItem>
                      <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/myorders"
                        sx={{ textDecoration: "none", color: "black" }}
                      >
                        My Orders
                      </Typography>
                    </MenuItem>
                    <MenuItem>
                      <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        onClick={logout}
                        sx={{ textDecoration: "none", color: "black" }}
                      >
                        Logout
                      </Typography>
                    </MenuItem>
                  </>
                ) : null}
              </Menu>
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
