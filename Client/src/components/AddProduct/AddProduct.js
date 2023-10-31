import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
// import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import "./styles.css";
import { addProduct, updateProduct } from "../../actions/product";

import { validateProductForm } from "../../validation/formValidation";

const AddProductForm = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  // const sizeOptions = ["Small", "Medium", "Large", "XL", "XXL"]; // Add your size options here
  const categoryOptions = [
    "T-Shirts",
    "Jeans",
    "Dresses",
    "Shoes",
    "Accessories",
    "Tops",
    "Bottoms",
    "Outerwear",
    "Activewear",
    "Swimwear",
    "Lingerie",
    "Sleepwear",
    "Sportswear",
    "Formal Wear",
    "Casual Wear",
    "Workwear",
    "Maternity Wear",
    "Vintage Clothing",
    "Bohemian Clothing",
    "Streetwear",
    "Punk Clothing",
    "Goth Clothing",
    "Preppy Clothing",
    "Urban Clothing",
    "Ethical and Sustainable Clothing",
    "Shoes",
    "Accessories",
  ]; // Categories for a clothing shop
  const genderOptions = ["Men", "Women", "Unisex"]; // Gender options

  const [productData, setProductData] = useState({
    product_name: "",
    price: "",
    description: "",
    supplier: "",
    category: "",
    gender: "",
    coverImage: "",
  });

  // Get currentId and other data from Redux store
  const currentId = useSelector((state) => state.products.currentId);

  const product = useSelector((state) =>
    currentId ? state.products.find((p) => p.id === currentId) : null
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (product) setProductData(product);
  }, [product]);

  const handleSubmit = (error) => {
    try {
      error.preventDefault();
      const formErrors = validateProductForm(productData);
      setErrors(formErrors);

      // If there are errors, stop form submission
      if (Object.keys(formErrors).length > 0) {
        return;
      }

      if (currentId) {
        dispatch(updateProduct(currentId, productData));
      } else {
        dispatch(addProduct(productData));
      }

      if (Object.keys(formErrors).length > 0) {
        console.log(errors);
        return;
      }

      navigate("/addProductDetails");

      clear();
    } catch (error) {
      console.error(error);
    }
  };

  const clear = () => {
    setProductData({
      product_name: "",
      price: "",
      description: "",
      supplier: "",
      category: "",
      gender: "",
      coverImage: "",
    });
  };

  return (
    <Paper
      className="paper"
      style={{
        position: "relative",
        display: "flex",
        maxWidth: "35%",
        margin: "170px 0 0 50%",
        transform: "translate(-50%, 0)",
      }}
      elevation={0}
    >
      <form
        autoComplete="off"
        noValidate
        className="form"
        onSubmit={handleSubmit}
      >
        <Typography
          variant="h6"
          style={{
            marginBottom: "20px",
          }}
        >
          {currentId ? "Edit the Product" : "Add a Product"}
        </Typography>

        <TextField
          sx={{ my: 0.5 }}
          name="product_name"
          variant="outlined"
          label="Product Name"
          fullWidth
          value={productData.product_name}
          onChange={(e) =>
            setProductData({ ...productData, product_name: e.target.value })
          }
          error={Boolean(errors.product_name)}
          helperText={errors.product_name}
          onFocus={() => {
            // Clear the error for this field when it's focused
            setErrors({ ...errors, product_name: "" });
          }}
        />

        <TextField
          sx={{ my: 0.5 }}
          multiline
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          value={productData.description}
          onChange={(e) =>
            setProductData({ ...productData, description: e.target.value })
          }
          error={Boolean(errors.description)}
          helperText={errors.description}
          onFocus={() => {
            setErrors({ ...errors, description: "" });
          }}
        />

        <TextField
          sx={{ my: 0.5 }}
          multiline
          name="coverImage"
          variant="outlined"
          label="Cover Image URL"
          fullWidth
          value={productData.coverImage}
          onChange={(e) =>
            setProductData({ ...productData, coverImage: e.target.value })
          }
          error={Boolean(errors.coverImage)}
          helperText={errors.coverImage}
          onFocus={() => {
            setErrors({ ...errors, coverImage: "" });
          }}
        />

        <TextField
          sx={{ my: 0.5 }}
          name="supplier"
          variant="outlined"
          label="Supplier"
          fullWidth
          value={productData.supplier}
          onChange={(e) =>
            setProductData({ ...productData, supplier: e.target.value })
          }
          error={Boolean(errors.supplier)}
          helperText={errors.supplier}
          onFocus={() => {
            setErrors({ ...errors, supplier: "" });
          }}
        />

        <TextField
          sx={{ my: 0.5 }}
          name="price"
          variant="outlined"
          label="Price"
          fullWidth
          value={productData.price}
          onChange={(e) =>
            setProductData({ ...productData, price: e.target.value })
          }
          error={Boolean(errors.price)}
          helperText={errors.price}
          onFocus={() => {
            setErrors({ ...errors, price: "" });
          }}
        />

        <FormControl sx={{ my: 0.5 }} fullWidth>
          <InputLabel htmlFor="category-select">Category</InputLabel>
          <Select
            labelId="category-select"
            id="category-select"
            value={productData.category}
            onChange={(e) =>
              setProductData({ ...productData, category: e.target.value })
            }
            input={<Input />}
            error={Boolean(errors.category)}
            helperText={errors.category}
            onFocus={() => {
              setErrors({ ...errors, category: "" });
            }}
          >
            {categoryOptions.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ my: 0.5 }} fullWidth>
          <InputLabel htmlFor="gender-select">Gender</InputLabel>
          <Select
            labelId="gender-select"
            id="gender-select"
            value={productData.gender}
            onChange={(e) =>
              setProductData({ ...productData, gender: e.target.value })
            }
            input={<Input />}
            error={Boolean(errors.gender)}
            helperText={errors.gender}
            onFocus={() => {
              setErrors({ ...errors, gender: "" });
            }}
          >
            {genderOptions.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          sx={{ my: 0.5 }}
          className="buttonSubmit"
          variant="outlined"
          size="large"
          type="submit"
          style={{
            background: "black",
            borderRadius: "20px",
            marginTop: "30px",
            color: "white",
            fontSize: "small",
          }}
        >
          {currentId ? "Update" : "Create"}
        </Button>
        <Button
          sx={{ my: 0.5 }}
          variant="filled"
          color="secondary"
          size="small"
          onClick={clear}
          style={{
            background: "white",
            borderRadius: "20px",
            color: "black",
            fontSize: "small",
          }}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default AddProductForm;
