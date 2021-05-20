// import './App.css';
import { Box, Container } from "@material-ui/core";
import { useEffect } from "react";
import { connect } from "react-redux";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { fetch_cart_data, fetch_user_data } from "./redux";
import { AllRoutes } from "./routes/Routes";

function App(props) {
  useEffect(() => {
    props.fetch_user_data();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    props.fetch_cart_data();
    // eslint-disable-next-line
  }, [props.login, props.logout]);

  return (
    <div className="App">
      <Header />
      <Hero />
      <Box mt={2} mb={10}>
        <Container maxWidth="lg">{AllRoutes()}</Container>
      </Box>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.currentUser.loading,
    login: state.currentUser.login,
    logout: state.currentUser.logout,
    user_data: state.currentUser.user_data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_user_data: () => dispatch(fetch_user_data()),
    fetch_cart_data: () => dispatch(fetch_cart_data()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
