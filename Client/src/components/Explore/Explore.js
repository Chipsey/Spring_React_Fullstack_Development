import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../actions/product";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Pagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import Loading from "../Loading/Loading";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(16); // Number of items to display per page

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const count =
    !isNaN(products.length) && !isNaN(itemsPerPage)
      ? Math.ceil(products.length / itemsPerPage)
      : 1;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!currentItems) {
    return <Loading />;
  }

  return (
    <div className="product-list-container">
      <Grid container spacing={3}>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}></Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          <Grid container spacing={3}>
            {currentItems.map((product) => (
              <Grid item key={product.id} xs={6} sm={4} md={3} lg={3} xl={3}>
                <Card
                  sx={{ marginBottom: 2 }}
                  elevation={0}
                  className="explore--card"
                >
                  <Link
                    to={`/explore/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <CardMedia
                      component="img"
                      style={{ objectFit: "cover", height: "350px" }}
                      image={product.imageUrls[1]}
                      alt={product.name}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h7"
                        component="div"
                        style={{
                          color: "black",
                          fontWeight: "600",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "100%",
                        }}
                        className="explore--card--name"
                      >
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
                        className="explore--card--details"
                      >
                        {product.description}
                        <br />
                        <Typography
                          variant="h7"
                          margin={0}
                          style={{ fontWeight: "600" }}
                          className="explore--card--price"
                        >
                          LKR {product.price}.00
                        </Typography>
                        <br />
                        {/* Likes: {product.likes}
                        <br /> */}
                        {/*{product.color}*/}
                      </Typography>
                      <BottomNavigation
                        showLabels
                        style={{ backgroundColor: "transparent" }}
                      >
                        <Link to="/">
                          <BottomNavigationAction
                            label="Add to Cart"
                            icon={<ShoppingCartIcon />}
                            style={{ color: "#cfcfcf" }}
                          />
                        </Link>
                      </BottomNavigation>
                    </CardContent>
                  </Link>
                </Card>
              </Grid>
            ))}
          </Grid>
          <div className="pagination">
            <Pagination
              count={count}
              page={currentPage}
              onChange={(event, page) => handlePageChange(page)}
              variant="outlined"
              shape="rounded"
            />
          </div>
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={3} xl={1} />
      </Grid>
    </div>
  );
};

export default ProductList;
