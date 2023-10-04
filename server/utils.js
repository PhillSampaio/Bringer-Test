// Setup ----------------------------------------------------
const axios     = require('axios');
const jwt       = require('jsonwebtoken')
// Setup ----------------------------------------------------


// Functions ------------------------------------------------
const generateToken         = (email, pass) => {
    try {
        const user      = {
            email   : email, 
            password: pass
        }
        const secret        = email + pass    
        const accessToken   = jwt.sign(user, secret)
    
        return accessToken
    } catch (err) {     
        return false;
    }
}
const getHttpRequest        = (url, params = {}, headers = {}) => {
    return axios.get(url, {params : params, headers: headers})
}
const processTrackingData   = (data) => {
    
    try {
        let result = {
            "tracking_number"           : data.label.tracking_number,
            "external_tracking_number"  : data.label.external_tracking_number,
            "parcel_tracking_items"     : []
        };
    
        const itemsLength = data.parcel_tracking_items.length
        for(let i=0; i < itemsLength; i++) {
            
            const item      =  data.parcel_tracking_items[i]
            const date      = new Date(item.timestamp)
            
            /*
            This could be wrong, but based on the data I have available, I identified the "trackingCodeVendorId" with ID "312" as the 
            customs vendor ID for packages with tax due.
            */ 
            const taxVendorId   = 312;

            // Building approximate address field 
            const location      = item.location ? item.location + ", " + item.country.isoCode : item.state + ", " + item.city + ", " + item.country.isoCode
            
            // Building description field 
            let description   = [{description : 'N/A'}]
            if (item.tracking_code_vendor) {
                description = item.tracking_code_vendor.tracking_code.tracking_code_locales.filter((tcl) => tcl.locale.isoCode === 'en')
            } else if (item.tracking_code) {
                description = item.tracking_code.tracking_code_locales.filter((tcl) => tcl.locale.isoCode === 'en')
            }
            description = description[description.length - 1].description

            /*
             I am not able to find a reliable way to identify when the package is in-transit, delivered or just shipped. 
             I am relying on the position from the array and description to determine if the item was 
             'just shipped', is 'in-transit' or delivered'.
            */
            let state       = 'in-transit'
            if (i === (itemsLength -1)) state = 'shipped' 
            if (i === 0 && description.replace('delivered', '').length < description.length) state = 'delivered'

            // Building parcel tracking item
            let parcelTrackingItem = {
                "date"        : date.toLocaleString('default', { month: 'short', day: '2-digit' }) + ", " + date.getFullYear(),
                "time"        : date.toLocaleString('default', { hour: '2-digit', minute: '2-digit' }),                
                "location"    : location,
                "taxDue"      : item.tracking_code_vendor && item.tracking_code_vendor.id === taxVendorId,                
                "state"       : state,
                "id"          : item.id,
                "stateDescription" : description,
            }

            result.parcel_tracking_items.push(parcelTrackingItem);
        }

        return result;
    } catch (err) { 
        //TODO: Handle failure appropriately       
        return false;
    }
}
// Functions ------------------------------------------------

// Exports --------------------------------------------------
module.exports = { 
    generateToken,
    getHttpRequest,
    processTrackingData
}
// Exports --------------------------------------------------