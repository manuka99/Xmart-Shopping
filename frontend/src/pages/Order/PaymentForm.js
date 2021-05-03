import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

export default function PaymentForm({ order, setOrder, payment, setPayment }) {
  const handleFormOrder = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };
  const handleFormPayment = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
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
                id="card_holder_name"
                name="card_holder_name"
                label="Name on card"
                fullWidth
                autoComplete="cc-name"
                onChange={handleFormPayment}
              />
            </Grid>
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
                id="card_cvc"
                name="card_cvc"
                label="card_cvc"
                helperText="Last three digits on signature strip"
                fullWidth
                autoComplete="cc-csc"
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
        ) : (
          ""
        )}
      </Grid>
    </React.Fragment>
  );
}
