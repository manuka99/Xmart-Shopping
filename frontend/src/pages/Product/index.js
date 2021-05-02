import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Api from "../../util/Api";
import { useParams } from "react-router";
import Chip from "@material-ui/core/Chip";
import CategoryIcon from "@material-ui/icons/Category";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "85%",
    marginLeft: theme.spacing(4),
    padding: theme.spacing(2),
    flexBasis: "1",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gridGap: "12px",
  },
  cover: {
    width: "100%",
  },
}));

export default function Index() {
  const classes = useStyles();
  const { pid } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    Api()
      .get(`/product/${pid}`)
      .then((res) => setProduct(res.data))
      .catch((err) => setProduct({}));
  }, [pid]);

  const addToCart = (product) => {
    Api()
      .post("/cart/add", { products: [{ id: product._id, quantity: 1 }] })
      .then((res) => swal("Product was added to cart"))
      .catch((err) =>
        swal(
          "Product was not added to the cart, you must be authenticated and the product must have enough stock"
        )
      );
  };

  return product._id ? (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {product.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {product.description}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Size: {product.size}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Stock: {product.stock}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            SKU: {product.sku}
          </Typography>
          <Chip size="medium" label={`Rs ${product.price}`} color="secondary" />
          <Chip
            size="medium"
            icon={<CategoryIcon />}
            label={product.category}
            color="primary"
          />
          <Box mt={4}>
            <Button
              onClick={() => addToCart(product)}
              size="small"
              color="primary"
              variant="contained"
            >
              Add to cart
            </Button>
          </Box>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image={product.image}
        title="Live from space album cover"
      />
    </Card>
  ) : (
    <h1>Product not found</h1>
  );
}
