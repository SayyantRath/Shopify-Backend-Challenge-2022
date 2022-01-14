const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productsSchema = new Schema({
    sku: {
        type: String
    },
    product_name: {
        type: String
    },
    inventory_count: {
        type: Number
    },
    retail_price: {
        type: Number
    },
    rating: {
        type: Number
    },
    warehouses: {
        type: [String]
    },
}, {
    collection: 'products'
});

module.exports = mongoose.model('Product', productsSchema);