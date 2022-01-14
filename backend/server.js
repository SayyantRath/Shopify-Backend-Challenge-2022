let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');

let dbConfig = require('./data/db');

const productRoute = require('../backend/Routes/productRoutes');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully Connected to Database")
},
    error => {
        console.log('Failed to Connect to Database: ' + error)
    }
)

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use('/products', productRoute)

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
    console.log('Listening on port ' + port)
})

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    console.log(err.message);
    if (!err.stateCode) err.StatusCode = 500;
    res.status(err.StatusCode).send(err.message);
});