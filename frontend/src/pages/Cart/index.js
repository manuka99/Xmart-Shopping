import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Api from "../../util/Api";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import swal from "sweetalert";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { fetch_cart_data_success } from "../../redux";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: "column",
    gridGap: theme.spacing(4),
  },
  root: {
    display: "flex",
    justifyContent: "space-between",
    width: "60%",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 150,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

function Index({ fetch_cart_data_success }) {
  const [cart, setCart] = useState({});
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    Api()
      .get("/cart")
      .then((res) => setCart(res.data))
      .catch((err) => console.log(err));
  }, []);

  const updateCart = () => {
    console.log(cart);
    Api()
      .post("/cart", cart)
      .then((res) => {
        swal(res.data.message);
        setCart({ ...cart, payment_value: res.data.cart.payment_value });
        fetch_cart_data_success(res.data.cart);
      })
      .catch((err) => console.log(err));
  };

  const checkOut = () => {
    Api()
      .post("/order", { products: cart.products })
      .then((res) => navigate(`/order/${res.data._id}`))
      .catch((err) => console.log(err));
  };

  const updateQty = (index, type) => {
    var newCart = cart;
    if (type === "-")
      newCart.products[index].quantity = newCart.products[index].quantity - 1;
    else
      newCart.products[index].quantity = newCart.products[index].quantity + 1;
    if (newCart.products[index].quantity < 1) {
      newCart.products[index].quantity = 1;
      swal("Minimum product quantity must be 1");
    }
    setCart({ ...newCart });
  };

  const deleteProduct = (index) => {
    var newCartProducts = cart.products;
    newCartProducts.splice(index, 1);
    setCart({ ...cart, products: newCartProducts });
  };

  return (
    <>
      <h1>Shopping cart</h1>
      <p>
        {cart.products ? cart.products.length : 0} items added to shopping cart
      </p>
      <div className={classes.main}>
        {cart.products &&
          cart.products.map((product, index) => (
            <Card key={index} elevation={4} className={classes.root}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Link component="h6" variant="h6" to={`/${product.data._id}`}>
                    {product.data.name}
                  </Link>
                  <Typography variant="subtitle1" color="textSecondary">
                    Rs {product.data.price}
                  </Typography>
                  <Button
                    aria-label="delete"
                    size="small"
                    variant="outlined"
                    color="secondary"
                    onClick={() => deleteProduct(index)}
                  >
                    Delete <DeleteForeverIcon color="secondary" />
                  </Button>
                </CardContent>
                <div className={classes.controls}>
                  <IconButton
                    aria-label="-"
                    onClick={() => updateQty(index, "-")}
                  >
                    <IndeterminateCheckBoxIcon color="secondary" />
                  </IconButton>
                  <IconButton aria-label={product.quantity} size="small">
                    {product.quantity}
                  </IconButton>
                  <IconButton
                    aria-label="+"
                    onClick={() => updateQty(index, "+")}
                  >
                    <AddBoxIcon color="primary" />
                  </IconButton>
                </div>
              </div>
              <CardMedia
                className={classes.cover}
                image={product.data.image}
                title={product.data.name}
              />
            </Card>
          ))}
        {cart && (
          <>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={updateCart}
            >
              Update cart
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={checkOut}
            >
              Checkout ( Rs {cart.payment_value})
            </Button>
          </>
        )}
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_cart_data_success: (data) => dispatch(fetch_cart_data_success(data)),
  };
};

export default connect(null, mapDispatchToProps)(Index);
