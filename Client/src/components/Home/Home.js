import React, { useEffect, useState } from "react";
import { Button, Container } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../../actions/product";

import Grid from "@mui/system/Unstable_Grid";
import styled from "@mui/system/styled";
import Typography from "@mui/material/Typography";
import GppGoodRoundedIcon from "@mui/icons-material/GppGoodRounded";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import "./style.css";

import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import ConsoleTextAnimation from "./ConsoleTextAnimation";
import DeliverExploreOrder from "../Explore/ExploreOrders";
import AdminOrder from "../Order/AdminOrder";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  border: "0px solid",
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(1),
  borderRadius: "50px",
  height: "10px",
  textAlign: "center",
}));

const VideoPlayer = ({ videoSource }) => {
  return (
    <div className="video-container">
      <video src={videoSource} autoPlay loop className="video-element" />
    </div>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const userData = useSelector((state) => state.auth.authData);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items to display per page

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  if (!currentItems) {
    return <Loading />;
  }
  return (
    <Container maxWidth="100%" style={{ marginTop: "150px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="image-container">
            <img
              src="https://png.pngtree.com/thumb_back/fh260/background/20230518/pngtree-the-candy-shop-at-gordon-s-wizarding-world-image_2536653.jpg"
              alt="Background"
              style={{ width: "100%" }}
              className="image-element"
            />
          </div>

          <div className="home-image-content">
            <ConsoleTextAnimation /> {/* Include the animation here */}
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
              {currentItems.map((item) => (
                <SwiperSlide className="swiper-slide" item key={item.id}>
                  <Link
                    to={`/explore/${item.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <img src={item.imageUrls[1]} alt={item.name} />
                    <Typography
                      variant="body2"
                      className="new-arrivals-title"
                      color="white"
                    >
                      {item.name}
                    </Typography>
                  </Link>
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
          </div>
        </Grid>
      </Grid>
      {userData?.role === "DELIVERY" && <DeliverExploreOrder />}
      {userData?.role === "ADMIN" && <AdminOrder />}

      {/* <Grid container spacing={2}>
        <Grid item xs={12} style={{ textAlign: "left" }}>
          <VideoPlayer videoSource="video1.mp4" />
          <div
            className="still-not-signup"
            style={{ position: "relative", top: "-380px", marginLeft: "100px" }}
          >
            <Typography
              variant="h2"
              color="white"
              style={{
                background: `linear-gradient(to right, #9fc6ed, #ffffff)`,
                WebkitBackgroundClip: "text",
                color: "transparent",
                width: "16%",
                fontWeight: 400,
                textShadow: "0 0 10px rgba(255,255,255,0.1)",
              }}
            >
              Xillica
            </Typography>
            <Typography
              variant="body"
              color="white"
              style={{
                fontWeight: 400,
                textShadow: "0 0 10px rgba(255,255,255,0.3)",
              }}
            >
              Where Shopping Meets Innovation!
            </Typography>
            <Typography
              variant="body2"
              color="white"
              style={{ fontWeight: 400, marginTop: "30px" }}
            >
              Still not a member?
            </Typography>
            <Link to="/auth">
              <Button
                variant="contained"
                style={{
                  marginTop: "30px",
                  background: `linear-gradient(to right, #5580ab, #85aed6)`,
                }}
              >
                Let's Get Started
                <GppGoodRoundedIcon style={{ width: "30px" }} />
              </Button>
            </Link>
          </div>
        </Grid>
      </Grid> */}
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item></Item>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
