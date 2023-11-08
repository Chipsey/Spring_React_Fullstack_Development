import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../actions/product";
import {
  Typography,
  Grid,
  Container,
  Box,
  TextField,
  Button,
} from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import "./styles.css";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import Loading from "../Loading/Loading";
import ProductList from "./Explore";
import { addOrder } from "../../actions/order";

const initialState = {
  customerEmail: "",
  quantity: null,
  productId: null,
  unitPrice: null,
  totalPrice: null,
  orderDate: null,
  productName: "",
  address: "",
};

const ImageCarousel = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.authData);
  const product = useSelector((state) => state.singleProduct);

  const isSignup = userData !== null ? true : false;

  const { id } = useParams();

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (!product.id) {
    return <Loading />;
  }

  const handleSubmit = () => {
    dispatch(addOrder(formData));
  };

  const handleChange = (e) => {
    const currentDate = new Date();
    const quantity = parseInt(e.target.value, 10);
    setFormData({
      ...formData,
      productId: product.id,
      customerEmail: userData.email,
      address: userData.address,
      unitPrice: product.price,
      totalPrice: product.price * quantity,
      orderDate: currentDate,
      productName: product.name,
      quantity: quantity,
    });
  };
  return (
    <div
      style={{
        marginTop: "80px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={product.imageUrls[0]}
        alt={product.name}
        className="product--background"
      />
      <div style={{ marginTop: "200px" }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={6}
            container
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12}>
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                }}
                pagination={{ el: ".swiper-pagination", clickable: true }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                  clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper_container"
              >
                {product.imageUrls.map((item) => (
                  <SwiperSlide className="swiper-slide" item key={item.id}>
                    <img src={item} alt={item} />
                  </SwiperSlide>
                ))}
                <div className="slider-controller">
                  <div className="swiper-button-prev slider-arrow">
                    <ion-icon name="arrow-back-outline"></ion-icon>
                  </div>
                  <div className="swiper-button-next slider-arrow">
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                  </div>
                  <div className="swiper-pagination"></div>
                </div>
              </Swiper>
            </Grid>
          </Grid>
          <Grid
            item
            xs={4}
            alignItems="left"
            justifyContent="left"
            style={{ marginTop: "50px", textAlign: "left" }}
          >
            <Typography
              gutterBottom
              variant="h2"
              component="div"
              style={{
                color: "black",
                fontWeight: "500",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                maxWidth: "100%",
                fontSize: "50px",
              }}
              className="explore--card--name"
            >
              {product.name}
            </Typography>
            <Typography
              gutterBottom
              variant="body"
              component="div"
              style={{
                color: "black",
                // fontWeight: "300",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}
              className="explore--card--name"
            >
              {product.description}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              style={{
                color: "grey",
                // fontWeight: "300",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
                // fontSize: "30px",
              }}
              className="explore--card--name"
            >
              Available Quantity : {product.quantity}
            </Typography>
            <Typography
              gutterBottom
              variant="h7"
              component="div"
              style={{
                color: "black",
                // fontWeight: "300",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
                fontSize: "30px",
              }}
              className="explore--card--name"
            >
              LKR {product.price}.00
            </Typography>

            <form onSubmit={handleSubmit}>
              {isSignup ? (
                <>
                  <TextField
                    name="quantity"
                    label="Quantity"
                    onChange={handleChange}
                    variant="outlined"
                    style={{ marginTop: "30px" }}
                    required
                    half
                  />
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    style={{
                      maxWidth: "100%",
                      fontWeight: "500",
                      color: "grey",
                      marginTop: "20px",
                      fontSize: "15px",
                    }}
                    className="explore--card--name"
                  >
                    Ordering Address : {userData.address}
                  </Typography>
                  <Button
                    type="submit"
                    size="small"
                    style={{
                      position: "relative",
                      width: "50%",
                      borderRadius: "7px",
                      color: "white",
                      background: "rgb(56, 138, 56)",
                      fontSize: "15px",
                      height: "50px",
                    }}
                  >
                    ADD ORDER
                  </Button>
                </>
              ) : (
                <Typography
                  gutterBottom
                  variant="body2"
                  component="div"
                  style={{
                    fontFamily: "playlist",
                    color: "black",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                    fontWeight: "400",
                    marginTop: "30px",
                    fontSize: "20px",
                  }}
                  className="explore--card--name"
                >
                  SignIn to Continue the Order Process!!
                </Typography>
              )}
            </form>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </div>

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
        style={{ background: "rgba(0, 0, 0, 0.6" }}
      >
        <Typography variant="h2" color="white">
          EXPLORE XILLICA
        </Typography>
        <ProductList />
      </Box>
    </div>
  );
};

export default ImageCarousel;
