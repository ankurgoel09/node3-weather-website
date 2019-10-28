const request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYW5rdXJnb2VsIiwiYSI6ImNrMXJtd20xZjA1eWozYnQ2aTVwc3o4dDAifQ.gG-vdXwjIYslalvPSHuU2Q&limit=1'
        request({url: url, json: true}, (error, response) =>{

            if (error){
                callback('In if condition for low level errors', undefined)
            }
            else if (response.body.features.length === 0) {
                return callback('Unable to find location, try anathor', undefined)
            } 
            else{
                callback(undefined, {
                    place_name: response.body.features[0].place_name,
                    longitude: response.body.features[0].center[0],
                    latitude: response.body.features[0].center[1]
                })
            }
        })
}

module.exports = geocode