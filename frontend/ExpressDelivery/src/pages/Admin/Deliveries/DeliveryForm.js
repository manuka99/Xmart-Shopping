import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import swal from "sweetalert";
import Api from "../../../util/Api";
import StorefrontIcon from "@material-ui/icons/Storefront";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  bg: {
    backgroundColor: "white",
  },
}));

export default function ProductForm({ oldData, closeForm }) {
  const classes = useStyles();
  const [deliveryInfo, setDeliveryInfo] = useState(oldData ? oldData : {});

  const handleForm = (event) => {
    setDeliveryInfo({
      ...deliveryInfo,
      [event.target.name]: event.target.value,
    });
  };

  const createNewDelivery = () => {
    Api()
      .post("/admin/delivery", deliveryInfo)
      .then((res) => {
        swal("Data saved successfully");
      })
      .catch((err) =>
        err.response && err.response.data
          ? swal(err.response.data.message)
          : swal("Failed to save data")
      );
  };

  const updateDelivery = () => {
    Api()
      .patch(`/admin/delivery/${oldData._id}`, deliveryInfo)
      .then((res) => {
        swal("Data saved successfully");
      })
      .catch((err) =>
        err.response && err.response.data
          ? swal(err.response.data.message)
          : swal("Failed to save data")
      );
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.bg}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <StorefrontIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {oldData ? `Update delivery ${oldData._id}` : "Create new delivery"}
        </Typography>
        {closeForm && (
          <Button variant="outlined" color="secondary" onClick={closeForm}>
            Close
          </Button>
        )}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="buyername"
            label="Buyer name"
            name="buyername"
            value={deliveryInfo.buyername}
            autoFocus
            onChange={handleForm}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Buyer email"
            name="email"
            type="email"
            value={deliveryInfo.email}
            onChange={handleForm}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="telephone"
            label="Buyer telephone"
            name="telephone"
            value={deliveryInfo.telephone}
            onChange={handleForm}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="address"
            label="Delivery address"
            id="address"
            value={deliveryInfo.address}
            onChange={handleForm}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="paymentType"
            label="Payment Type"
            id="paymentType"
            value={deliveryInfo.paymentType}
            onChange={handleForm}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="paymentValue"
            label="Payment Value"
            id="paymentValue"
            value={deliveryInfo.paymentValue}
            onChange={handleForm}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={oldData ? updateDelivery : createNewDelivery}
          >
            {oldData ? "Update delivery" : "Create delivery"}
          </Button>
        </form>
      </div>
    </Container>
  );
}
