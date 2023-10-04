// Initializing ---------------------------------
const express   = require('express')
const router    = express.Router()

const { generateToken }  = require('../utils')
// Initializing ---------------------------------


// POST Routes ----------------------------------
router.post("", (req, res) => {

    // Authenticate user first

    if(!req.body.email || !req.body.password) {
        return res.status(400).send("Invalid request.")
    }

    const token = generateToken(req.body.email, req.body.password)
    
    if (!token) return res.status(500).send("Failed to generate token.")

    res.status(200).json({accessToken: token})
})
// POST Routes ----------------------------------

// Export ---------------------------------------
module.exports = router
// Export ---------------------------------------