import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: "#7b1fa2",
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  heroDescription: {
    color: "white",
  },
  btnOrange: {
    color: "white",
    backgroundColor: "orange",
  },
}));

export default function Hero() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h4"
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom
              className={classes.heroDescription}
            >
              World of Cloths
            </Typography>
            <Typography
              variant="h6"
              align="center"
              className={classes.heroDescription}
              paragraph
            >
              The dress covers her shoulders halfway and flows down into a fancy
              court neckline. It's a loose fit which makes the dress look
              comfortable, yet elegant and stylish. Her arms are completely
              uncovered.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Subscribe to news letter
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    component={Link}
                    to="track-order"
                    variant="contained"
                    className={classes.btnOrange}
                  >
                    Track your order
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
}
