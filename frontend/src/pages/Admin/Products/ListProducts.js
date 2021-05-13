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
import ProductForm from "./ProductForm";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  model: {
    overflow: "auto",
  },
});

function ListProducts() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openProduct, setOpenProduct] = useState({});

  useEffect(() => {
    Api()
      .get("admin/product")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteProduct = (id, index) => {
    Api()
      .delete(`admin/product/${id}`)
      .then((res) => {
        var newProducts = products;
        newProducts.splice(index, 1);
        setProducts(newProducts);
        swal("Product was deleted successfully");
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
        <ProductForm oldData={openProduct} closeForm={() => setOpen(false)} />
      </Modal>
      <Box mt={6}>
        <Typography variant="h4" gutterBottom>
          Manage products ({products.length})
        </Typography>
        <TableContainer component={Paper}>
          <Button
            color="secondary"
            aria-label="Delete product"
            component="span"
            size="large"
            startIcon={<AddCircleIcon />}
            onClick={() => navigate("/admin/products/form")}
          >
            New Product
          </Button>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Product name</TableCell>
                <TableCell align="right">Price&nbsp;(RS)</TableCell>
                <TableCell align="right">SKU</TableCell>
                <TableCell align="right">Size</TableCell>
                <TableCell align="right">Stock</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Edit</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={product._id}>
                  <TableCell>#{index + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell align="right">{product.price}</TableCell>
                  <TableCell align="right">{product.sku}</TableCell>
                  <TableCell align="right">{product.size}</TableCell>
                  <TableCell align="right">{product.stock}</TableCell>
                  <TableCell align="right">{product.category}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      aria-label="Edit product"
                      component="span"
                      onClick={() => {
                        setOpenProduct(product);
                        setOpen(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="secondary"
                      aria-label="Delete product"
                      component="span"
                      onClick={() => deleteProduct(product._id, index)}
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

export default ListProducts;
