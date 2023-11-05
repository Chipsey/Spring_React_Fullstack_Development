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
import {
  fetchProducts,
  updateDetails,
  deleteProduct,
} from "../../actions/product"; // Make sure to import `updateDetails`
import { Link } from "react-router-dom";

import "./styles.css";

const AddProductInfoForm = () => {
  const [errors, setErrors] = useState({});
  const products = useSelector((state) => state.products);

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    imageUrls: [],
    quantity: "",
    addQuantity: "",
  });

  const [currentId, setCurrentId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = [];

    if (!productData.name) {
      formErrors.push("Product Name is required");
    }
    if (!productData.description) {
      formErrors.push("Description is required");
    }
    if (!productData.price) {
      formErrors.push("Price is required");
    }
    if (!productData.addQuantity) {
      productData.addQuantity = 0;
    }

    if (formErrors.length > 0) {
      setErrors(formErrors);
      return;
    }

    const newQuantity =
      parseInt(productData.quantity) + parseInt(productData.addQuantity);

    dispatch(
      updateDetails(currentId, { ...productData, quantity: newQuantity })
    );
    clear();
  };

  const clear = () => {
    setProductData({
      name: "",
      price: "",
      description: "",
      imageUrls: [],
      quantity: "",
      addQuantity: "",
    });
  };

  const handleCardClick = (clickedProduct) => {
    setProductData({
      name: clickedProduct.name,
      price: clickedProduct.price,
      description: clickedProduct.description,
      imageUrls: clickedProduct.imageUrls, // Populate imageUrls correctly
      quantity: clickedProduct.quantity,
    });

    setCurrentId(clickedProduct.id);
  };

  const addImageURL = () => {
    const newImageURL = prompt("Enter a new image URL"); // You can use a better UI for this
    if (newImageURL) {
      setProductData((prevData) => ({
        ...prevData,
        imageUrls: [...prevData.imageUrls, newImageURL],
      }));
    }
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
          {currentId ? "Add Details" : "Edit/Add Products"}
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
              value={productData.name}
              onChange={(e) =>
                setProductData({ ...productData, name: e.target.value })
              }
              error={Boolean(errors.name)}
              helperText={errors.name}
              onFocus={() => {
                setErrors({ ...errors, name: "" });
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
              name="imageUrls"
              variant="outlined"
              label="ImageUrls"
              fullWidth
              required
              value={productData.imageUrls.join(", ")}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  imageUrls: e.target.value
                    .split(", ")
                    .filter((url) => url.trim() !== ""),
                })
              }
            />
            <Button
              sx={{ my: 0 }}
              size="small"
              onClick={addImageURL}
              style={{
                border: "0.5px solid",
                borderRadius: "10px",
                color: "black",
                margin: "10px 0px",
                fontSize: "smaller",
              }}
              fullWidth
            >
              CLICK TO ADD MORE IMAGES
            </Button>

            <TextField
              sx={{ my: 0.5 }}
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
              name="quantity"
              variant="outlined"
              label="Quantity"
              fullWidth
              required
              value={productData.quantity}
              onChange={(e) =>
                setProductData({ ...productData, quantity: e.target.value })
              }
              error={Boolean(errors.quantity)}
              helperText={errors.quantity}
              onFocus={() => {
                setErrors({ ...errors, quantity: "" });
              }}
            />
            <TextField
              sx={{ my: 3 }}
              name="addQuantity"
              variant="outlined"
              label="addQuantity"
              fullWidth
              value={productData.addQuantity}
              onChange={(e) =>
                setProductData({ ...productData, addQuantity: e.target.value })
              }
              error={Boolean(errors.addQuantity)}
              helperText={errors.addQuantity}
              onFocus={() => {
                setErrors({ ...errors, addQuantity: "" });
              }}
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
            marginTop: "10px",
            color: "white",
            fontSize: "small",
          }}
        >
          {currentId ? "Update" : "Select"}
        </Button>
        <Button
          sx={{ my: 0 }}
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
        <Link to="/addproduct" style={{ textDecoration: "none" }}>
          <Typography
            fullWidth
            style={{
              fontSize: "13px",
              fontWeight: "600",
            }}
            variant="filled"
          >
            + ADD PRODUCTS +
          </Typography>
        </Link>
      </Paper>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          paddingY: "50px",
          mt: 2,
        }}
        style={{ background: "#ebebeb" }}
      >
        {products.map((product) => (
          <Card
            key={product.id}
            style={{
              margin: "10px",
              maxWidth: "300px",
              height: "400px",
            }}
          >
            <CardMedia
              component="img"
              alt={product.name}
              height="150"
              image={product.imageUrls[0]}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {product.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100%",
                }}
              >
                {product.description}
              </Typography>

              <Typography
                variant="h6"
                color="text.primary"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: "500",
                }}
              >
                LKR {product.price}.00
              </Typography>
              <Typography
                variant="body2"
                color="text.primary"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: "500",
                }}
              >
                Available Quantity: {product.quantity}
              </Typography>
            </CardContent>
            <Button
              onClick={() => handleCardClick(product)}
              size="small"
              style={{
                background: "black",
                marginBottom: "0px",
                color: "white",
                fontSize: "small",
                borderRadius: "0",
                position: "relative",
                width: "50%",
                height: "50px",
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => dispatch(deleteProduct(product.id))}
              size="small"
              style={{
                position: "relative",
                width: "50%",
                marginBottom: "0px",
                borderRadius: "0",
                color: "white",
                background: "rgb(138, 56, 56)",
                fontSize: "small",
                height: "50px",
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

export default AddProductInfoForm;
