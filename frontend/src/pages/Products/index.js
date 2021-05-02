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

export default function Index({ oldProducts }) {
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

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* End hero unit */}
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={4} md={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={product.image}
                  title={product.name}
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h5">
                    {product.name}
                  </Typography>
                  <Typography>{product.description}</Typography>
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
                  <Button size="small" color="primary" variant="contained">
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
