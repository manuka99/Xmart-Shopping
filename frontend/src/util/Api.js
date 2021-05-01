import axios from "axios";
import swal from "sweetalert";

export default function Api(nonApi = false) {
  let user_token = localStorage.getItem("xmart_user_token");
  const api = axios.create({
    baseURL: `http://localhost:5000${nonApi ? "" : "/api"}`,
    timeout: 5000,
    headers: {
      Authorization: user_token,
      "Content-Type": "application/json",
    },
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      //  const originalRequest = error.config;
      if (error.response) {
        if (error.response.status === 401) {
          swal("Please log in to access this route");
        } else if (error.response.status === 403) {
          //no required roles
          swal({
            title: "403: You do not have permision for the requested content.",
            text:
              "You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation, if you think this is an mistake please refresh or try log in again.",
            icon: "error",
          });
        } else if (error.response.status === 404) {
          swal({
            title: "404!",
            text: "Page requested not found",
            icon: "error",
          });
          return Promise.reject(error);
        } else if (error.response.status === 419) {
          swal("Unexpected error 419: Refresh the webpage and try again");
        } else if (error.response.status === 422) {
          if (error.response.data) swal(error.response.data.message);
          //   return Promise.reject(error);
        } else if (error.response.status === 423) {
          //password confirmation
          return Promise.reject(error);
        } else if (error.response.status === 500) {
          if (error.response.data.message) swal(error.response.data.message);
          else swal(error);
          return Promise.reject(error);
        } else {
          swal(error);
          return Promise.reject(error);
        }
      } else {
        swal(error);
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );

  return api;
}
