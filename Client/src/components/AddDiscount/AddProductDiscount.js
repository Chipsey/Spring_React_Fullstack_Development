import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Box,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../actions/product";

import "./styles.css";
import { updateDetails, deleteProduct } from "../../actions/product";

const AddProductDiscount = () => {
  const [errors, setErrors] = useState({});
  const products = useSelector((state) => state.products);

  const [productData, setProductData] = useState({
    product_name: "",
    price: "",
    description: "",
    discount: "",
    endDate: "",
  });

  const [currentId, setCurrentId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Define an array to hold error messages
    const formErrors = [];

    // Check for required fields
    if (!productData.product_name) {
      formErrors.push("Product Name is required");
    }
    if (!productData.description) {
      formErrors.push("Description is required");
    }
    if (!productData.price) {
      formErrors.push("Price is required");
    }
    if (!productData.discount) {
      formErrors.push("Discount is required");
    }
    if (!productData.endDate) {
      formErrors.push("End Date is required");
    }
    // Add additional required fields here

    // If there are any errors, set the errors state and return
    if (formErrors.length > 0) {
      setErrors(formErrors);
      return;
    }

    // If no errors, proceed with form submission
    dispatch(updateDetails(currentId, productData));
    clear();
  };

  const clear = () => {
    setProductData({
      product_name: "",
      price: "",
      description: "",
      discount: "",
      endDate: "",
    });
  };

  const handleCardClick = (clickedProduct) => {
    setProductData({
      product_name: clickedProduct.product_name,
      price: clickedProduct.price,
      description: clickedProduct.description,
      discount: clickedProduct.discount, // Populate category and gender when clicking a card
      endDate: clickedProduct.endDate,
    });

    setCurrentId(clickedProduct.id);
  };

  return (
    <Container maxWidth>
      <Paper
        className="paper"
        style={{
          position: "relative",
          maxWidth: "25%",
          maxHeight: "4000px",
          margin: "170px 0 0 50%",
          transform: "translate(-50%, 0)",
        }}
        elevation={0}
      >
        <Typography
          variant="h6"
          style={{
            marginBottom: "20px",
          }}
        >
          {currentId ? "Add Details" : "Select Product"}
        </Typography>
        <Paper
          className="paper"
          fullWidth
          style={{
            position: "relative",
            display: "flex",
            maxWidth: "100%",
            overflowY: "scroll",
            maxHeight: "350px",
          }}
          elevation={0}
        >
          <form
            autoComplete="off"
            noValidate
            className="form"
            onSubmit={handleSubmit}
          >
            <TextField
              sx={{ my: 0.5 }}
              name="product_name"
              variant="outlined"
              label="Product Name"
              fullWidth
              required
              value={productData.product_name}
              onChange={(e) =>
                setProductData({ ...productData, product_name: e.target.value })
              }
              error={Boolean(errors.product_name)}
              helperText={errors.product_name}
              onFocus={() => {
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
              required
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
              name="price"
              variant="outlined"
              label="Price"
              fullWidth
              required
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
            <TextField
              sx={{ my: 0.5 }}
              multiline
              name="discount"
              variant="outlined"
              style={{ marginTop: "30px" }}
              label="Discount(%)"
              fullWidth
              required
              value={productData.discount}
              onChange={(e) =>
                setProductData({ ...productData, discount: e.target.value })
              }
              error={Boolean(errors.discount)}
              helperText={errors.discount}
              onFocus={() => {
                setErrors({ ...errors, discount: "" });
              }}
            />
            {/* <TextField
              sx={{ my: 0.5 }}
              multiline
              name="endDate"
              variant="outlined"
              style={{ marginTop: "30px" }}
              label="End Date"
              fullWidth
              required
              value={productData.endDate}
              onChange={(e) =>
                setProductData({ ...productData, endDate: e.target.value })
              }
              error={Boolean(errors.endDate)}
              helperText={errors.endDate}
              onFocus={() => {
                setErrors({ ...errors, endDate: "" });
              }}
            /> */}
            <input
              type="date"
              name="endDate"
              style={{ marginTop: "30px" }}
              required
              value={productData.endDate}
              onChange={(e) =>
                setProductData({ ...productData, endDate: e.target.value })
              }
              onFocus={() => {
                setErrors({ ...errors, endDate: "" });
              }}
            />
            <TextField
              sx={{ my: 0.5 }}
              multiline
              name="selectedFile"
              variant="outlined"
              label="Image URL"
              fullWidth
              value={productData.selectedFile}
              onChange={(e) =>
                setProductData({ ...productData, selectedFile: e.target.value })
              }
              error={Boolean(errors.selectedFile)}
              helperText={errors.selectedFile}
              onFocus={() => {
                setErrors({ ...errors, selectedFile: "" });
              }}
            />

            <TextField
              sx={{ my: 0.5 }}
              multiline
              fullWidth
              name="xsq"
              variant="outlined"
              label="Extra Small Quantity"
              value={productData.xsq}
              onChange={(e) =>
                setProductData({ ...productData, xsq: e.target.value })
              }
            />

            <TextField
              sx={{ my: 0.5 }}
              multiline
              fullWidth
              name="sq"
              variant="outlined"
              label="Small Quantity"
              value={productData.sq}
              onChange={(e) =>
                setProductData({ ...productData, sq: e.target.value })
              }
            />

            <TextField
              sx={{ my: 0.5 }}
              multiline
              fullWidth
              name="mq"
              variant="outlined"
              label="Medium Quantity"
              value={productData.mq}
              onChange={(e) =>
                setProductData({ ...productData, mq: e.target.value })
              }
            />

            <TextField
              sx={{ my: 0.5 }}
              multiline
              fullWidth
              name="lq"
              variant="outlined"
              label="Large Quantity"
              value={productData.lq}
              onChange={(e) =>
                setProductData({ ...productData, lq: e.target.value })
              }
            />

            <TextField
              sx={{ my: 0.5 }}
              multiline
              fullWidth
              name="xlq"
              variant="outlined"
              label="XL Quantity"
              value={productData.xlq}
              onChange={(e) =>
                setProductData({ ...productData, xlq: e.target.value })
              }
            />

            <TextField
              sx={{ my: 0.5 }}
              multiline
              fullWidth
              name="xxlq"
              variant="outlined"
              label="XXL Quantity"
              value={productData.xxlq}
              onChange={(e) =>
                setProductData({ ...productData, xxlq: e.target.value })
              }
            />

            <TextField
              sx={{ my: 0.5 }}
              multiline
              fullWidth
              name="txlq"
              variant="outlined"
              label="3XL Quantity"
              value={productData.txlq}
              onChange={(e) =>
                setProductData({ ...productData, txlq: e.target.value })
              }
            />

            <TextField
              sx={{ my: 0.5 }}
              multiline
              fullWidth
              name="fxlq"
              variant="outlined"
              label="4XL Quantity"
              value={productData.fxlq}
              onChange={(e) =>
                setProductData({ ...productData, fxlq: e.target.value })
              }
            />
          </form>
        </Paper>
        <Button
          sx={{ my: 0.5 }}
          className="buttonSubmit"
          variant="outlined"
          size="large"
          onClick={handleSubmit}
          type="submit"
          style={{
            background: "black",
            borderRadius: "20px",
            marginTop: "30px",
            color: "white",
            fontSize: "small",
          }}
        >
          {currentId ? "Update" : "Select"}
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
            fontSize: "smaller",
          }}
          fullWidth
        >
          Clear
        </Button>
      </Paper>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          mt: 2,
        }}
      >
        {products.map((product) => (
          <Card
            key={product.id}
            style={{
              margin: "10px",
              maxWidth: "300px",
            }}
          >
            <CardMedia
              component="img"
              alt={product.product_name}
              height="140"
              image={product.coverimage}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.product_name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100%", // Ensure the text doesn't overflow the container
                }}
              >
                {product.description}
              </Typography>
            </CardContent>
            <Button
              onClick={() => handleCardClick(product)}
              size="small"
              variant="outlined"
              style={{
                background: "black",
                borderRadius: "20px",
                marginBottom: "10px",
                color: "white",
                fontSize: "small",
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => dispatch(deleteProduct(product.id))}
              size="small"
              variant="outlined"
              style={{
                background: "black",
                borderRadius: "20px",
                marginBottom: "10px",
                marginLeft: "10px",
                color: "white",
                fontSize: "small",
              }}
            >
              Delete
            </Button>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default AddProductDiscount;
