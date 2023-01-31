const axios = require('axios');

const API_Key = ''
const PFController = {};

PFController.getPets = async(req, res, next) => {
    try {
        const result = await axios.get(
            `https://api.petfinder.com/v2/{CATEGORY}/{ACTION}?{parameter_1}={value_1}&{parameter_2}={value_2}`
        );
    
    }
}


module.exports = PFController;

