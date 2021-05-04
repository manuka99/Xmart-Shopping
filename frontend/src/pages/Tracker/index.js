import {
  Button,
  CssBaseline,
  Grid,
  makeStyles,
  TextField,
  Typography,
  Box,
} from "@material-ui/core";
import React, { useState } from "react";
import Api from "../../util/Api";

const useStyles = makeStyles((theme) => ({
  columnFlex: {
    display: "flex",
    flexDirection: "column",
    gridGap: theme.spacing(2),
  },
}));

export default function Index() {
  const classes = useStyles();
  const [order, setOrder] = useState({});
  const [searchID, setSearchID] = useState("");
  const searchOrder = () => {
    Api()
      .get(`/order/${searchID}`)
      .then((res) => setOrder(res.data))
      .catch((err) => {
        console.log(err);
        setOrder({});
      });
  };
  return (
    <Box mt={4}>
      <Grid container spacing={4}>
        <Grid item xs={5} className={classes.columnFlex}>
          <Typography variant="h5" gutterBottom>
            Track your order
          </Typography>
          <Typography variant="body2">
            To check your order status, please enter your order number below.
          </Typography>

          <TextField
            id="outlined-basic"
            label="Order Number"
            variant="outlined"
            color="primary"
            onChange={(e) => setSearchID(e.target.value)}
          />
          <Button color="primary" variant="contained" onClick={searchOrder}>
            Proceed
          </Button>
          <CssBaseline />
          <Typography>
            For questions about your order, please call Xmart Shopping at 011
            111 222.
          </Typography>
        </Grid>
        {order._id ? (
          <Grid item xs={5} className={classes.columnFlex}>
            <Typography variant="h6" gutterBottom>
              <b>Order Details</b>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Order ID : {order._id}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              <b>Delivery Details</b>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Delivery type : {order.delivery_type}
            </Typography>
            {order.delivery_type === "delivery" && (
              <Typography variant="body1" gutterBottom>
                Delivery address : {order.delivery_address}
              </Typography>
            )}
            <Typography variant="body1" gutterBottom>
              Delivery status : {order.delivery_status}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              <b>Payment Details</b>
            </Typography>
            <Typography variant="body1" gutterBottom>
              Payment value : {order.payment_value}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Payment type : {order.payment_type}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Payment status : {order.payment_status}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              <b>Products Details</b>
            </Typography>
            {order.products.map((product) => (
              <a
                href={`http://localhost:3000/` + product.id}
                target="_blank"
                rel="noreferrer"
              >
                (Qty * {product.quantity}) http://localhost:3000/{product.id}
              </a>
            ))}
          </Grid>
        ) : (
          <Grid item xs={6} className={classes.columnFlex}>
            <Typography variant="subtitle1" gutterBottom>
              <b>
                Sorry, No order details were found, check your Order ID again.
              </b>
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
