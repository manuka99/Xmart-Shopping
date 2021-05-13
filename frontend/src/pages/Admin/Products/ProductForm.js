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
  const [productInfo, setProductInfo] = useState(oldData ? oldData : {});

  const handleForm = (event) => {
    setProductInfo({
      ...productInfo,
      [event.target.name]: event.target.value,
    });
  };

  const createNewProduct = () => {
    Api()
      .post("/admin/product", productInfo)
      .then((res) => {
        swal(res.data.message);
      })
      .catch((err) =>
        err.response && err.response.data
          ? swal(err.response.data.message)
          : swal("Failed to save product")
      );
  };

  const updateProduct = () => {
    Api()
      .put(`/admin/product/${oldData._id}`, productInfo)
      .then((res) => {
        swal(res.data.message);
      })
      .catch((err) =>
        err.response && err.response.data
          ? swal(err.response.data.message)
          : swal("Failed to save product")
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
          {oldData ? `Update product ${oldData._id}` : "Create new product"}
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
            id="name"
            label="Product name"
            name="name"
            value={productInfo.name}
            autoFocus
            onChange={handleForm}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="image"
            label="Product image"
            name="image"
            value={productInfo.image}
            onChange={handleForm}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="description"
            label="Product description"
            name="description"
            value={productInfo.description}
            onChange={handleForm}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="sku"
            label="SKU"
            id="sku"
            value={productInfo.sku}
            onChange={handleForm}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="price"
            label="Product price"
            id="price"
            value={productInfo.price}
            onChange={handleForm}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="size"
            label="Product size"
            id="size"
            value={productInfo.size}
            onChange={handleForm}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="stock"
            label="Product stock"
            id="stock"
            value={productInfo.stock}
            onChange={handleForm}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="category"
            label="Product category"
            id="category"
            value={productInfo.category}
            onChange={handleForm}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={oldData ? updateProduct : createNewProduct}
          >
            {oldData ? "Update product" : "Create product"}
          </Button>
        </form>
      </div>
    </Container>
  );
}
