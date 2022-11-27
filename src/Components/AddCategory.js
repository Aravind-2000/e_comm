import { Box, TextField, Button } from "@mui/material";
import { Grid } from "@mui/material";
import React, { useState } from "react";
import ApiURlS from "../Service/ApiURl's";

const AddCategory = ({ close }) => {
  const [categoryName, setcategoryName] = useState("");
  const [categoryDescription, setcategoryDescription] = useState("");

  const handleSubmit = () => {
    const data = { categoryName, categoryDescription };
    ApiURlS.addProdCategory(data)
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
            <Grid item xs={8} md={6} lg={6}>
              <TextField
                fullWidth
                className="formtext"
                margin="dense"
                variant="outlined"
                placeholder="Enter Category Name "
                value={categoryName}
                label="Category Name"
                onChange={(e) => setcategoryName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={8} md={6} lg={6}>
              <TextField
                fullWidth
                className="formtext"
                margin="dense"
                variant="outlined"
                placeholder="Enter Category Description "
                value={categoryDescription}
                label="Category Description"
                onChange={(e) => setcategoryDescription(e.target.value)}
                required
              />
            </Grid>
          </Grid>
          <Button
            onClick={(e) => handleSubmit(e)}
            color="primary"
            style={{ marginLeft: 10, marginTop: 20 }}
            variant="contained"
          >
            Save
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddCategory;
