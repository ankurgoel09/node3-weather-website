const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/5890b75c139d76560b2615fe1cec365b/'+ latitude +', '+ longitude +'?units=si'
        request({url, json: true}, (error, response) =>{

            if (error){
                callback('In if condition for low level errors', undefined)
            }
            else if (response.body.error) {
                callback('In response.body.error', undefined)
            } 
            else{
                callback(undefined, {
                    forecast : response.body.daily.data[0].summary + ' Temp is ' + response.body.currently.temperature,
                    location : response.body.timezone
                })
            }
        })
}

module.exports = forecast