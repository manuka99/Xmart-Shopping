import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Api from "../../util/Api";
import { useNavigate } from "react-router";
import Chip from "@material-ui/core/Chip";
import CategoryIcon from "@material-ui/icons/Category";
import swal from "sweetalert";
import { fetch_cart_data_success } from "../../redux";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    gridGap: "10px",
  },
}));

function Index({ oldProducts, fetch_cart_data_success }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [products, setProducts] = useState(oldProducts ? oldProducts : []);

  useEffect(() => {
    if (!oldProducts) {
      Api()
        .get("/product")
        .then((res) => setProducts(res.data))
        .catch((error) => console.log(error));
    }
    // eslint-disable-next-line
  }, []);

  const addToCart = (product) => {
    Api()
      .post("/cart/add", { products: [{ id: product._id, quantity: 1 }] })
      .then((res) => {
        swal("Product was added to cart");
        fetch_cart_data_success(res.data.cart);
      })
      .catch((err) =>
        swal(
          "Product was not added to the cart, you must be authenticated and the product must have enough stock"
        )
      );
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Grid container spacing={6}>
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={4} md={3}>
              <Card elevation={4} className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={product.image}
                  title={product.name}
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="subtitle2">
                    <b> {product.name}</b>
                  </Typography>
                  <Typography variant="caption">
                    {product.description}
                  </Typography>
                  <Chip
                    size="small"
                    label={`Rs ${product.price}`}
                    color="secondary"
                  />
                  <Chip
                    size="small"
                    icon={<CategoryIcon />}
                    label={product.category}
                    color="primary"
                  />
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={() => navigate(`/${product._id}`)}
                  >
                    View
                  </Button>
                  <Button
                    onClick={() => addToCart(product)}
                    size="small"
                    color="primary"
                    variant="contained"
                  >
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </main>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_cart_data_success: (data) => dispatch(fetch_cart_data_success(data)),
  };
};

export default connect(null, mapDispatchToProps)(Index);
