import { useState, useEffect } from "react";
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Button, Modal, Divider, TextField, InputLabel, Select, MenuItem, FormControl, Snackbar, Alert} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material/";

const warehouseOptions = [
  "Dallas",
  "Seattle",
  "New York City",
  "Chicago",
  "Miami",
  "San Diego",
];

const Home = () => {
  const [rows, setRows] = useState([]);
  const [renderModal, setRenderModal] = useState(false);
  const [newSKU, setNewSKU] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [newInventoryCount, setNewInventoryCount] = useState(0);
  const [newRetailPrice, setNewRetailPrice] = useState(0);
  const [newRating, setNewRating] = useState(0);
  const [newWarehouses, setNewWarehouses] = useState([]);
  const [renderEdit, setRenderEdit] = useState(false);
  const [updatedID, setUpdatedID] = useState("");
  const [updatedSKU, setUpdatedSKU] = useState("");
  const [updatedProductName, setUpdatedProductName] = useState("");
  const [updatedInventoryCount, setUpdatedInventoryCount] = useState(0);
  const [updatedRetailPrice, setUpdatedRetailPrice] = useState(0);
  const [updatedRating, setUpdatedRating] = useState(0);
  const [updatedWarehouses, setUpdatedWarehouses] = useState([]);
  const [renderWarningSnackbar, setRenderWarningSnackbar] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/products/get-all")
      .then((res) => {
        setRows(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])
  
  const handleEdit = (values) => {
    setUpdatedID(values._id);
    setUpdatedSKU(values.sku);
    setUpdatedProductName(values.product_name);
    setUpdatedInventoryCount(values.inventory_count);
    setUpdatedRetailPrice(values.retail_price);
    setUpdatedRating(values.rating);
    setUpdatedWarehouses(values.warehouses);
    setRenderEdit(true);
  };

  const handleDelete = (values) => {
    const deleteURL =
      "http://localhost:8000/products/delete-product/" + values._id;
    axios
      .delete(deleteURL)
      .then((res) => {
        axios
          .get("http://localhost:8000/products/get-all")
          .then((res) => {
            setRows(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };
  
  const handleAdd = () => {
    setRenderModal(true);
  }

  const handleClose = () => {
    setRenderModal(false);
  }

  const handleEditClose = () => {
    setRenderEdit(false);
  };

  const resetAddFields = () => {
    setNewSKU("");
    setNewProductName("");
    setNewInventoryCount(0);
    setNewRetailPrice(0);
    setNewWarehouses([]);
    setNewRating(0);
  }

  const resetUpdateFields = () => {
    setUpdatedID("");
    setUpdatedSKU("");
    setUpdatedProductName("");
    setUpdatedInventoryCount(0);
    setUpdatedRetailPrice(0);
    setUpdatedWarehouses([]);
    setUpdatedRating(0);
  };

  const submitNewProduct = () => {

    if (newSKU === "" || newProductName == "" || newInventoryCount == 0 || newRetailPrice == 0 || newRating == 0 || newWarehouses.length == 0){
      setRenderWarningSnackbar(true);
      return;
    }

    const newProductObject = {
      sku: newSKU,
      product_name: newProductName,
      inventory_count: newInventoryCount,
      retail_price: newRetailPrice,
      rating: newRating,
      warehouses: newWarehouses
    };
    axios
      .post("http://localhost:8000/products/create-product", newProductObject)
      .then((res) => {
        resetAddFields();
        axios
          .get("http://localhost:8000/products/get-all")
          .then((res) => {
            setRows(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    setRenderModal(false);
  }

  const submitUpdatedProduct = () => {

    if (
      updatedSKU === "" ||
      updatedProductName == "" ||
      updatedRetailPrice == 0
    ) {
      setRenderWarningSnackbar(true);
      return;
    }

    const updatedProductObject = {
      sku: updatedSKU,
      product_name: updatedProductName,
      inventory_count: updatedInventoryCount,
      retail_price: updatedRetailPrice,
      rating: updatedRating,
      warehouses: updatedWarehouses,
    };
    const updateURL =
      "http://localhost:8000/products/update-product/" + updatedID;
    axios
      .put(updateURL, updatedProductObject)
      .then((res) => {
        resetUpdateFields();
        axios
          .get("http://localhost:8000/products/get-all")
          .then((res) => {
            setRows(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    setRenderEdit(false);
  };

  const handleCSV = () => {
    axios
      .get("http://localhost:8000/products/get-CSV")
      .then((res) => {
        window.open("http://localhost:8000/products/get-CSV");
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div
      style={{
        width: "80vw",
        maxHeight: "80vh",
        marginLeft: "10vw",
        marginTop: "7.5vh",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "2%",
          alignItems: "center"
        }}
      >
        <Typography variant="h4">Products</Typography>
        <div style={{display: "flex", flexDirection: "column"}}>
          <Button variant="contained" onClick={handleAdd} sx={{marginBottom: "3%"}}>
            Add Product
          </Button>
          <Button variant="contained" onClick={handleCSV}>
            Export to CSV
          </Button>
        </div>
      </div>
      <Divider sx={{width: "100%", marginBottom : "2%"}}/>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>SKU</TableCell>
              <TableCell align="right">Product Name</TableCell>
              <TableCell align="right">Inventory Count</TableCell>
              <TableCell align="right">Retail Price</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Warehouses</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.sku}>
                <TableCell align="right">{row.sku}</TableCell>
                <TableCell align="right">{row.product_name}</TableCell>
                <TableCell align="right">{row.inventory_count}</TableCell>
                <TableCell align="right">{row.retail_price}</TableCell>
                <TableCell align="right">{row.rating}</TableCell>
                <TableCell align="right">{row.warehouses.join(", ")}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(row)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(row)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={renderModal}
        sx={{
          marginTop: "20vh",
          marginLeft: "20vw",
          width: "60vw",
          height: "60vh",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            position: "absolute",
            borderRadius: "15px",
          }}
        >
          <div style={{ marginLeft: "5%", marginTop: "2%", marginRight: "2%" }}>
            <Typography variant="h4">Add Product</Typography>
            <Divider style={{ marginTop: "1%", width: "90%" }} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "10%",
              marginRight: "10%",
              marginTop: "2%",
              height: "40vh",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <FormControl
              component="fieldset"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <TextField
                variant="standard"
                label="SKU"
                onChange={(event) => setNewSKU(event?.target.value)}
              />
              <TextField
                style={{ marginTop: "5%" }}
                variant="standard"
                label="Product Name"
                onChange={(event) => setNewProductName(event?.target.value)}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "5%",
                }}
              >
                <TextField
                  variant="standard"
                  label="Inventory Count"
                  onChange={(event) =>
                    setNewInventoryCount(event?.target.value)
                  }
                  type="number"
                />
                <TextField
                  variant="standard"
                  label="Retail Price"
                  onChange={(event) => setNewRetailPrice(event?.target.value)}
                  type="number"
                />
                <TextField
                  variant="standard"
                  label="Rating"
                  onChange={(event) => setNewRating(event?.target.value)}
                  type="number"
                />
                <FormControl style={{ width: "10%" }}>
                  <InputLabel id="warehouse_label">Warehouses</InputLabel>
                  <Select
                    variant="standard"
                    value={newWarehouses}
                    multiple
                    label="Warehouses"
                    labelId="warehouse_label"
                    onChange={(event) => {
                      setNewWarehouses(event.target.value);
                    }}
                  >
                    {warehouseOptions.map((warehouse) => {
                      return (
                        <MenuItem key={warehouse} value={warehouse}>
                          {warehouse}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            </FormControl>
          </div>
          <Divider style={{ margin: "2%", width: "90%" }} />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "10%",
              marginRight: "10%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Button sx={{ marginRight: "10%" }} onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" onClick={submitNewProduct}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        open={renderEdit}
        sx={{
          marginTop: "20vh",
          marginLeft: "20vw",
          width: "60vw",
          height: "60vh",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            position: "absolute",
            borderRadius: "15px",
          }}
        >
          <div style={{ marginLeft: "5%", marginTop: "2%", marginRight: "2%" }}>
            <Typography variant="h4">Edit Product Details</Typography>
            <Divider style={{ marginTop: "1%", width: "90%" }} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "10%",
              marginRight: "10%",
              marginTop: "2%",
              height: "40vh",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <FormControl
              component="fieldset"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <TextField
                variant="standard"
                label="SKU"
                onChange={(event) => setUpdatedSKU(event?.target.value)}
                defaultValue={updatedSKU}
              />
              <TextField
                style={{ marginTop: "5%" }}
                variant="standard"
                label="Product Name"
                onChange={(event) => setUpdatedProductName(event?.target.value)}
                defaultValue={updatedProductName}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "5%",
                }}
              >
                <TextField
                  variant="standard"
                  label="Inventory Count"
                  onChange={(event) =>
                    setUpdatedInventoryCount(event?.target.value)
                  }
                  type="number"
                  defaultValue={updatedInventoryCount}
                />
                <TextField
                  variant="standard"
                  label="Retail Price"
                  onChange={(event) =>
                    setUpdatedRetailPrice(event?.target.value)
                  }
                  type="number"
                  defaultValue={updatedRetailPrice}
                />
                <TextField
                  variant="standard"
                  label="Rating"
                  onChange={(event) => setUpdatedRating(event?.target.value)}
                  type="number"
                  defaultValue={updatedRating}
                />
                <FormControl style={{ width: "10%" }}>
                  <InputLabel id="warehouse_label">Warehouses</InputLabel>
                  <Select
                    variant="standard"
                    value={updatedWarehouses}
                    multiple
                    label="Warehouses"
                    labelId="warehouse_label"
                    onChange={(event) => {
                      setUpdatedWarehouses(event.target.value);
                    }}
                  >
                    {warehouseOptions.map((warehouse) => {
                      return (
                        <MenuItem key={warehouse} value={warehouse}>
                          {warehouse}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            </FormControl>
          </div>
          <Divider style={{ margin: "2%", width: "90%" }} />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "10%",
              marginRight: "10%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Button sx={{ marginRight: "10%" }} onClick={handleEditClose}>
                Cancel
              </Button>
              <Button variant="contained" onClick={submitUpdatedProduct}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <Snackbar
        open={renderWarningSnackbar}
        autoHideDuration={3000}
        onClose={() => setRenderWarningSnackbar(false)}
      >
        <Alert
          severity="warning"
          onClose={() => setRenderWarningSnackbar(false)}
        >
          Please complete all fields
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Home;