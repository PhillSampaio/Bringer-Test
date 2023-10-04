// Initializing ---------------------------------
require('dotenv').config()

const express   = require('express')
const app       = express()

const generateTokenEndpoint     = require('./endpoints/GenerateToken')
const trackingParcelEndpoint    = require('./endpoints/TrackingParcel')
// Initializing ---------------------------------


// Setup ----------------------------------------
app.use(express.json())
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return next();
});
// Setup ----------------------------------------

// Routes ---------------------------------------
// Generate token endpoint
app.use('/Generate_Token', generateTokenEndpoint)

// Tracking parcel endpoint
app.use("/Tracking_parcel", trackingParcelEndpoint)
// Routes ---------------------------------------


// Starting -------------------------------------
app.listen(5000, () => {
    console.log("Server started on port 5000");
})
// Starting -------------------------------------