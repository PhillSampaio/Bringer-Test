// Initializing ---------------------------------
const express   = require('express')
const router    = express.Router()

const { getHttpRequest, processTrackingData, test }  = require('../utils')
// Initializing ---------------------------------


// POST Routes ----------------------------------
router.get("/:tracking_number", (req, res) => {

    const headers   = { Authorization: `Bearer ${process.env.BPS_TOKEN}` }
    const url       = process.env.BPS_TRACKING_URL

    getHttpRequest(url, {}, headers).then((result) => {       
        const data = processTrackingData(result.data)
        res.status(200).json(data)
    }).catch((err) => {
        //TODO: Handle failure appropriately
        res.status(500).json("Tracking number not available, please try again later.")
    })
})
// POST Routes ----------------------------------

// Export ---------------------------------------
module.exports = router