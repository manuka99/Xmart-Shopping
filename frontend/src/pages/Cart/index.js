import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import Api from "../../util/Api";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

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
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function Index() {
  const [cart, setCart] = useState({});
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    Api()
      .get("/cart")
      .then((res) => setCart(res.data))
      .catch((err) => console.log(err));
  }, []);

  const checkOut = () => {};

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
                </CardContent>
                <div className={classes.controls}>
                  <IconButton aria-label="previous">
                    {theme.direction === "rtl" ? (
                      <SkipNextIcon />
                    ) : (
                      <SkipPreviousIcon />
                    )}
                  </IconButton>
                  <IconButton aria-label="play/pause">
                    <PlayArrowIcon className={classes.playIcon} />
                  </IconButton>
                  <IconButton aria-label="next">
                    {theme.direction === "rtl" ? (
                      <SkipPreviousIcon />
                    ) : (
                      <SkipNextIcon />
                    )}
                  </IconButton>
                </div>
              </div>
              <CardMedia
                className={classes.cover}
                image={product.data.image}
                title="Live from space album cover"
              />
            </Card>
          ))}
        {cart && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={checkOut}
          >
            Checkout ( Rs {cart.payment_value})
          </Button>
        )}
      </div>
    </>
  );
}
