let fs = require("fs");
let moment = require("moment");
let json2csv = require("json2csv").parse;
let path = require("path");
let mongoose = require("mongoose");
let express = require("express");
let router = express.Router();

let productSchema = require("../Models/Products");

const fields = ['sku', 'product_name', 'inventory_count', 'retail_price', 'rating', 'warehouses']

// CREATE Product
router.route("/create-product").post((req, res, next) => {
  productSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// READ all Products
router.route("/get-all").get((req, res, next) => {
  productSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// UPDATE a single Product
router.route("/update-product/:id").put((req, res, next) => {
  productSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    }
  );
});

// DELETE Product
router.route("/delete-product/:id").delete((req, res, next) => {
  productSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// READ CSV
router.get("/get-CSV", function (req, res, next) {
  productSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      let csv;
      try {
        csv = json2csv(data, { fields });
      } catch (err) {
          console.log(err)
        return next(err);
      }
      const dateTime = moment().format("YYYYMMDDhhmmss");
      const filePath = path.join(
        __dirname,
        "csv-" + dateTime + ".csv"
      );
      fs.writeFile(filePath, csv, function (err) {
        if (err) {
            console.log(err)
          return next(err);
        } else {
          setTimeout(function () {
            fs.unlink(filePath, () => {console.log("File Deleted")}); // delete this file after 30 seconds
          }, 10000);
          
          res.download(filePath, "csv-" + dateTime + ".csv");
        }
      });
    }
  });
});

module.exports = router;
