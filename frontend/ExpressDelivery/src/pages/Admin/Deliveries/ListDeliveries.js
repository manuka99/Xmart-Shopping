import React, { useState, useEffect } from "react";
import Api from "../../../util/Api";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Box, Button, Typography } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import swal from "sweetalert";
import { useNavigate } from "react-router";
import Modal from "@material-ui/core/Modal";
import DeliveryForm from "./DeliveryForm";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  model: {
    overflow: "auto",
  },
});

function Listdeliveries() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [deliveries, setDeliveries] = useState([]);
  const [open, setOpen] = useState(false);
  const [opendelivery, setOpendelivery] = useState({});

  useEffect(() => {
    Api()
      .get("/admin/delivery")
      .then((res) => setDeliveries(res.data))
      .catch((err) => console.log(err));
  }, []);

  const deletedelivery = (id, index) => {
    Api()
      .delete(`/admin/delivery/${id}`)
      .then((res) => {
        var newdeliveries = deliveries;
        newdeliveries.splice(index, 1);
        setDeliveries(newdeliveries);
        swal("delivery was deleted successfully");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Modal
        className={classes.model}
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <DeliveryForm oldData={opendelivery} closeForm={() => setOpen(false)} />
      </Modal>
      <Box mt={6}>
        <Typography variant="h4" gutterBottom>
          Manage deliveries ({deliveries.length})
        </Typography>
        <TableContainer component={Paper}>
          <Button
            color="secondary"
            aria-label="Delete delivery"
            component="span"
            size="large"
            startIcon={<AddCircleIcon />}
            onClick={() => navigate("/admin/delivery/form")}
          >
            New Delivery
          </Button>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Buyer name</TableCell>
                <TableCell align="right">Payment value&nbsp;(RS)</TableCell>
                <TableCell align="right">Payment Type</TableCell>
                <TableCell align="right">Buyer Email</TableCell>
                <TableCell align="right">Buyer Mobile</TableCell>
                <TableCell align="right">Delivery Address</TableCell>
                <TableCell align="right">Edit</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveries.map((delivery, index) => (
                <TableRow key={delivery._id}>
                  <TableCell>#{index + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    {delivery.buyername}
                  </TableCell>
                  <TableCell align="right">{delivery.paymentValue}</TableCell>
                  <TableCell align="right">{delivery.paymentType}</TableCell>
                  <TableCell align="right">{delivery.email}</TableCell>
                  <TableCell align="right">{delivery.telephone}</TableCell>
                  <TableCell align="right">{delivery.address}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      aria-label="Edit delivery"
                      component="span"
                      onClick={() => {
                        setOpendelivery(delivery);
                        setOpen(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="secondary"
                      aria-label="Delete delivery"
                      component="span"
                      onClick={() => deletedelivery(delivery._id, index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default Listdeliveries;
