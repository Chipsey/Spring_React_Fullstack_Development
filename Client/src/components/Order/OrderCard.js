import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditOrder from "./EditOrder"; // Import the EditOrder component
import { updateOrder } from "../../actions/order";

const OrderCard = ({
  id,
  userName,
  userId,
  productId,
  productName,
  unitPrice,
  customerEmail,
  totalPrice,
  quantity,
  cancelled,
  deliveryPerson,
  deliveryApproved,
  address,
  deliveryPersonId,
  orderDate,
  userRole,
  approvalDate,
  packedDate,
  deliveryStartDate,
  approved,
  packed,
  delivered,
  deliveryStart,
  deliveredDate,
}) => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.authData);

  const currentOrder = {
    id,
    productId,
    productName,
    unitPrice,
    customerEmail,
    totalPrice,
    quantity,
    cancelled,
    deliveryPerson,
    deliveryApproved,
    address,
    deliveryPersonId,
    orderDate,
    userRole,
    approvalDate,
    packedDate,
    deliveryStartDate,
    approved,
    packed,
    delivered,
    deliveryStart,
    deliveredDate,
  };

  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleApproveClick = () => {
    const updatedOrder = { ...currentOrder, approved: true };
    dispatch(updateOrder(id, updatedOrder));
  };

  const handlePackedClick = () => {
    const updatedOrder = { ...currentOrder, packed: true };
    dispatch(updateOrder(id, updatedOrder));
  };

  const handleStartDeliveryClick = () => {
    const updatedOrder = {
      ...currentOrder,
      deliveryStart: true,
      deliveryPerson: userName,
      deliveryPersonId: userId,
    };
    dispatch(updateOrder(id, updatedOrder));
  };

  const handleDeliveredClick = () => {
    const updatedOrder = {
      ...currentOrder,
      delivered: true,
    };
    dispatch(updateOrder(id, updatedOrder));
  };

  const handleApproveDeliveryClick = () => {
    const updatedOrder = {
      ...currentOrder,
      deliveryApproved: true,
    };
    dispatch(updateOrder(id, updatedOrder));
  };

  return (
    <Card
      sx={{
        minWidth: "80%",
        padding: "10px 20px",
        textAlign: "left",
        marginLeft: "10%",
        marginBottom: "15px",
        background: cancelled
          ? "rgba(255, 214, 214, 0.8)"
          : "rgba(255,255,255, 0.8)",
      }}
      elevation="0"
    >
      <CardContent>
        <Typography
          sx={{ fontSize: "50px", fontWeight: "600", marginBottom: "10px" }}
        >
          <span style={{ color: "grey" }}>#{id}</span> • {productName}
        </Typography>
        <Typography
          variant="body2"
          style={{ fontWeight: "500", color: "grey" }}
        >
          Customer Email: {customerEmail}
        </Typography>
        <Typography sx={{ mb: 0.5 }} color="text.secondary">
          Product ID: {productId}
        </Typography>
        <Typography variant="body2">
          Unit Price: LKR {unitPrice}.00 | Quantity: {quantity}
          <br />
          <span style={{ fontWeight: "500", fontSize: "20px" }}>
            Total Price: LKR {totalPrice}.00
          </span>
          <br />
          Delivery Information: {address} <br />
          Order Placed: {orderDate}
        </Typography>
      </CardContent>
      <CardActions>
        {cancelled && (
          <Button size="small" variant="disabled" style={{ color: "red" }}>
            Order Cancelled
          </Button>
        )}
        {userRole === "USER" && !packed && !cancelled && (
          <Button size="small" onClick={handleEditClick}>
            Edit
          </Button>
        )}
        {userRole === "ADMIN" && !approved && !cancelled && (
          <Button size="small" onClick={handleApproveClick}>
            Approve
          </Button>
        )}
        {userRole === "ADMIN" && approved && !packed && (
          <Button size="small" onClick={handlePackedClick}>
            Packed
          </Button>
        )}
        {userRole === "ADMIN" && packed && !deliveryStart && (
          <Button size="small" variant="disabled">
            Waiting for picking up delivery
          </Button>
        )}
        {userRole === "DELIVERY" && packed && !deliveryStart && (
          <Button size="small" onClick={handleStartDeliveryClick}>
            Pick Up the order
          </Button>
        )}
        {userRole === "DELIVERY" &&
          !delivered &&
          deliveryStart &&
          userData.id === deliveryPersonId && (
            <Button size="small" onClick={handleDeliveredClick}>
              Delivery done
            </Button>
          )}
        {userRole === "DELIVERY" && delivered && !deliveryApproved && (
          <Button size="small" variant="disabled" style={{ color: "green" }}>
            Waiting for user approval
          </Button>
        )}
        {userRole === "USER" && delivered && !deliveryApproved && (
          <Button
            size="small"
            onClick={handleApproveDeliveryClick}
            style={{ color: "green" }}
          >
            Approve delivery
          </Button>
        )}
        {delivered && (
          <Button
            variant="disabled"
            size="small"
            onClick={handleApproveDeliveryClick}
            style={{ color: "green" }}
          >
            Order delivered
          </Button>
        )}
      </CardActions>
      {!cancelled && (
        <div style={{ display: "flex" }}>
          <Button
            variant="disabled"
            style={{
              background: approved ? "green" : "grey",
              color: "white",
              borderRadius: "0px",
            }}
          >
            PENDING APPROVED
          </Button>
          <Button
            variant="disabled"
            style={{
              background: packed ? "orange" : "grey",
              color: "white",
              borderRadius: "0px",
            }}
          >
            ORDER PACKED
          </Button>
          <Button
            variant="disabled"
            style={{
              background: deliveryStart ? "#2d48c2" : "grey",
              color: "white",
              borderRadius: "0px",
            }}
          >
            SHIPPED
          </Button>
          <Button
            variant="disabled"
            style={{
              background: delivered ? "#b32dc2" : "grey",
              color: "white",
              borderRadius: "0px",
            }}
          >
            ENJOY THE PACKAGE
          </Button>
          <Button
            variant="disabled"
            style={{
              background: deliveryApproved ? "black" : "grey",
              color: "white",
              borderRadius: "0px",
            }}
          >
            DELIVERY APPROVED
          </Button>
        </div>
      )}

      {isEditModalOpen && (
        <EditOrder
          order={{
            id,
            productId,
            productName,
            unitPrice,
            customerEmail,
            totalPrice,
            quantity,
            oldQuantity: quantity,
            deliveryPerson,
            address,
            deliveryPersonId,
            orderDate,
            approvalDate,
            packedDate,
            deliveryStartDate,
            approved,
            packed,
            delivered,
            deliveryStart,
            deliveredDate,
          }}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </Card>
  );
};

export default OrderCard;
