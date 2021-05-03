import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

export default function AddressForm({ order, setOrder }) {
  const handleForm = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Delivery details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="buyer_name"
            name="buyer_name"
            label="Buyer name"
            fullWidth
            autoComplete="given-name"
            value={order.buyer_name}
            onChange={handleForm}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="buyer_phone"
            name="buyer_phone"
            label="Buyer contact number"
            fullWidth
            autoComplete="number"
            value={order.buyer_phone}
            onChange={handleForm}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="buyer_email"
            name="buyer_email"
            label="Buyer email"
            fullWidth
            autoComplete="email"
            value={order.buyer_email}
            onChange={handleForm}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <InputLabel id="demo-simple-select-helper-label">
              Delivery Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="delivery_type"
              name="delivery_type"
              value={order.delivery_type}
              onChange={handleForm}
            >
              <MenuItem value="pickup">Store pickup</MenuItem>
              <MenuItem value="delivery">Home delivery</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {order.delivery_type === "delivery" && (
          <Grid item xs={12}>
            <TextField
              required
              id="delivery_address"
              name="delivery_address"
              label="Delivery Address"
              fullWidth
              autoComplete="shipping address-line1"
              value={order.delivery_address}
              onChange={handleForm}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                name="saveAddress"
                value="yes"
                checked
              />
            }
            label="Use the above email address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
