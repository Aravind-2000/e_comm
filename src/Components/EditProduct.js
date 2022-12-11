import {
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ApiURlS from "../Service/ApiURl's";

const EditProduct = ({ product, setProduct, close, getAll }) => {
  const editChange = (e) => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const [categories, setcategories] = useState([]);

  useEffect(() => {
    ApiURlS.getAllProdCategories()
      .then((res) => {
        setcategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const editImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setProduct({ ...product, productImage: base64 });
  };

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

  const editSubmit = (pid) => {
    let body = {
      productName: product?.productName,
      productDescription: product?.productDescription,
      productPrice: product?.productPrice,
      productCategoryId: product?.productCategoryId,
      productImage: product?.productImage,
    };
    console.log(body);
    ApiURlS.editProduct(pid, body)
      .then((res) => {
        console.log(res.data);
        getAll();
        close();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form autoComplete="off">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8} md={6} lg={4}>
              <TextField
                fullWidth
                className="formtext"
                margin="dense"
                variant="outlined"
                placeholder="Enter Product Name "
                value={product?.productName}
                name="productName"
                label="Product Name"
                onChange={(e) => {
                  editChange(e);
                }}
                required
              />
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <TextField
                fullWidth
                className="formtext"
                margin="dense"
                variant="outlined"
                placeholder="Enter Product Description "
                value={product?.productDescription}
                name="productDescription"
                label="Product Description"
                multiline
                maxRows={7}
                onChange={(e) => {
                  editChange(e);
                }}
                required
              />
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <TextField
                fullWidth
                className="formtext"
                margin="dense"
                variant="outlined"
                placeholder="Enter Product Price "
                value={product?.productPrice}
                name="productPrice"
                label="Product Price}"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {<CurrencyRupeeIcon />}
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  editChange(e);
                }}
                required
              />
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <TextField
                select
                fullWidth
                className="formtext"
                margin="dense"
                variant="outlined"
                placeholder="Enter Product Category "
                value={product?.productCategoryId}
                name="productCategoryId"
                label="Product Category"
                onChange={(e) => {
                  editChange(e);
                }}
                required
              >
                {categories?.map((val) => (
                  <MenuItem value={val.id}> {val.categoryName} </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={8} md={6} lg={4}>
              <span>
                <h3> Add your Product Image </h3>
              </span>
              <Grid item xs={8} md={6} lg={4}>
                <img
                  style={{
                    height: "5rem",
                    width: "5rem",
                    marginLeft: "1rem",
                  }}
                  alt=""
                  src={product?.productImage}
                ></img>
              </Grid>
              <input
                type="file"
                onChange={(e) => {
                  editImage(e);
                }}
              />
            </Grid>
          </Grid>
          <Button
            onClick={() => editSubmit(product.productId)}
            color="primary"
            style={{ marginLeft: 20 }}
            variant="contained"
          >
            Save
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default EditProduct;
