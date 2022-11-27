import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import ApiURlS from "../Service/ApiURl's";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { FileUploader } from "react-drag-drop-files";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  MenuItem,
} from "@mui/material";

const AddProduct = ({ close }) => {
  const [productName, setproductName] = useState("");
  const [productDescription, setproductDescription] = useState("");
  const [productPrice, setproductPrice] = useState("");
  const [productCategoryId, setproductCategoryId] = useState("");
  const [categories, setcategories] = useState([]);

  const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
  const [file, setFile] = useState(null);
  const handleFileChange = (file) => {
    setFile(file);
  };

  useEffect(() => {
    ApiURlS.getAllProdCategories()
      .then((res) => {
        setcategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
    const base64 = await convertBase64(file);
    const body = {
      productCategoryId,
      productDescription,
      productName,
      productPrice,
      productImage: base64,
    };
    ApiURlS.addProducts(body)
      .then((res) => {
        close();
        console.log(res.data);
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
                value={productName}
                label="Product Name"
                onChange={(e) => setproductName(e.target.value)}
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
                value={productDescription}
                label="Product Description"
                multiline
                maxRows={7}
                onChange={(e) => setproductDescription(e.target.value)}
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
                value={productPrice}
                label="Product Price}"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {<CurrencyRupeeIcon />}
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setproductPrice(e.target.value)}
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
                value={productCategoryId}
                label="Product Category"
                onChange={(e) => setproductCategoryId(e.target.value)}
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
              <FileUploader
                hoverTitle="Drop Here"
                label="Drop your profile picture here"
                handleChange={handleFileChange}
                name="file"
                types={fileTypes}
              />
            </Grid>
          </Grid>
          <Button
            onClick={(e) => handleSubmit(e)}
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

export default AddProduct;
