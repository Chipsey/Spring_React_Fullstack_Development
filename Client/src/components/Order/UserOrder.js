import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";

import "./styles.css";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Loading from "../Loading/Loading";
import { fetchOrderByEmail } from "../../actions/order";
import OrderCard from "./OrderCard";

const UserOrder = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.authData);
  const ordersData = useSelector((state) => state.order.orders);

  useEffect(() => {
    dispatch(fetchOrderByEmail(userData.email));
  }, [dispatch, userData.email]);

  const isSignup = userData !== null ? true : false;

  if (!ordersData[0]) {
    return <Loading />;
  }
  if (!isSignup) {
    return (
      <div>
        <Loading />
        <div
          style={{
            marginTop: "20px",
            fontSize: "30px",
            fontFamily: "playlist",
            color: "green",
          }}
        >
          Sign In First!
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: "80px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="https://png.pngtree.com/thumb_back/fh260/background/20230518/pngtree-the-candy-shop-at-gordon-s-wizarding-world-image_2536653.jpg"
        alt="background"
        className="product--background"
      />
      <div style={{ marginTop: "200px" }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={11}
            container
            // alignItems="center"
            // justifyContent="center"
          >
            {console.log(ordersData)}
            {ordersData.map((order) => (
              <Grid item xs={12}>
                <OrderCard
                  id={order.id}
                  userName={userData.name}
                  userId={userData.id}
                  productId={order.productId}
                  productName={order.productName}
                  unitPrice={order.unitPrice}
                  customerEmail={order.customerEmail}
                  totalPrice={order.totalPrice}
                  quantity={order.quantity}
                  deliveryPerson={order.deliveryPerson}
                  address={order.address}
                  deliveryPersonId={order.deliveryPersonId}
                  orderDate={order.orderDate}
                  cancelled={order.cancelled}
                  userRole={userData.role}
                  deliveryApproved={order.deliveryApproved}
                  approvalDate={order.approvalDate}
                  packedDate={order.packedDate}
                  deliveryStartDate={order.deliveryStartDate}
                  approved={order.approved}
                  packed={order.packed}
                  delivered={order.delivered}
                  deliveryStart={order.deliveryStart}
                  deliveredDate={order.deliveredDate}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default UserOrder;
