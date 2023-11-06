import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const OrderCard = ({
  id,
  productId,
  productName,
  unitPrice,
  totalPrice,
  quantity,
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
}) => {
  return (
    <Card
      sx={{
        minWidth: "80%",
        padding: "10px 20px",
        textAlign: "left",
        marginLeft: "10%",
        marginBottom: "15px",
        background:"rgba(255,255,255, 0.8)"
      }}
      elevation="0"
    >
      <CardContent>
        <Typography
          sx={{ fontSize: "50px", fontWeight: "600", marginBottom: "10px" }}
        >
          <span style={{ color: "grey" }}>#{id}</span> • {productName}
        </Typography>
        <Typography sx={{ mb: 0.5 }} color="text.secondary">
          Product ID : {productId}
        </Typography>
        <Typography variant="body2">
          Unit Price : LKR {unitPrice}.00 | Quantity: {quantity}
          <br />
          <span style={{ fontWeight: "500", fontSize: "20px" }}>
            Total Price : LKR {totalPrice}.00
          </span>
          <br/>
          Delivery Information: {address} <br />
          Order Placed : {orderDate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
      </CardActions>
    </Card>
  );
};

export default OrderCard;
