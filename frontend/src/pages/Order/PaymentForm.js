import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import Api from "../../util/Api";
import swal from "sweetalert";

export default function PaymentForm({ order, setOrder, payment, setPayment }) {
  const handleFormOrder = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };
  const handleFormPayment = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleRequestPin = () => {
    payment.mobile_no && payment.mobile_no.length === 9
      ? Api()
          .post(`/payment/gateway/mobile/request-pin/${payment.mobile_no}`, {})
          .then((res) => swal(res.data.message))
          .catch((err) => {
            if (err.response && err.response.data)
              swal(err.response.data.message);
          })
      : swal("Enter a valid 9 digit mobile number");
  };

  return (
    <React.Fragment>
      <Box mb={2}>
        <Typography variant="h6" gutterBottom>
          Payment details
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl>
            <InputLabel id="demo-simple-select-helper-label">
              Payment method
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="payment_type"
              name="payment_type"
              value={order.payment_type}
              onChange={handleFormOrder}
            >
              <MenuItem value="card">Credit / Debit card</MenuItem>
              <MenuItem value="mobile">Mobile payment</MenuItem>
              <MenuItem value="COD">Cash on delivery</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {order.payment_type === "card" ? (
          <>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="card_no"
                name="card_no"
                label="Card number"
                fullWidth
                autoComplete="cc-number"
                onChange={handleFormPayment}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="card_cvc"
                name="card_cvc"
                label="card_cvc"
                helperText="Last three digits on signature strip"
                fullWidth
                autoComplete="cc-csc"
                onChange={handleFormPayment}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="expDate"
                label="Expiry date"
                fullWidth
                autoComplete="cc-exp"
                onChange={handleFormPayment}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="card_holder_name"
                name="card_holder_name"
                label="Name on card"
                fullWidth
                autoComplete="cc-name"
                onChange={handleFormPayment}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox color="secondary" name="saveCard" value="yes" />
                }
                label="Remember credit card details for next time"
              />
            </Grid>
          </>
        ) : order.payment_type === "mobile" ? (
          <>
            <Grid item xs={6}>
              <TextField
                required
                id="mobile_no"
                name="mobile_no"
                label="Mobile number"
                fullWidth
                autoComplete="phone"
                onChange={handleFormPayment}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                size="small"
                color={
                  payment.mobile_no && payment.mobile_no.length === 9
                    ? "primary"
                    : "secondary"
                }
                onClick={handleRequestPin}
              >
                Request pin
              </Button>
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                id="pin"
                name="pin"
                label="Pin "
                helperText="(4 digit pin number sent via sms)"
                fullWidth
                autoComplete="pin"
                onChange={handleFormPayment}
              />
            </Grid>
          </>
        ) : (
          <Typography variant="body1" color="textSecondary">
            Cash on delivery, sometimes called collect on delivery or cash on
            demand, is the sale of goods by mail order where payment is made on
            delivery rather than in advance. If the goods are not paid for, they
            are returned to the retailer.
          </Typography>
        )}
      </Grid>
    </React.Fragment>
  );
}
