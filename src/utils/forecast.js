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
                // Sunrise and sunset
                function Unix_timestamp(t)
                    {
                    var dt = new Date(t*1000);
                    var hr = dt.getHours();
                    var m = "0" + dt.getMinutes();
                    var s = "0" + dt.getSeconds();
                    return hr+ ':' + m.substr(-2) + ':' + s.substr(-2);  
                    }

                callback(undefined, {
                    forecast : response.body.daily.data[0].summary + ' Current Temp is ' + response.body.currently.temperature + ', with highest Temp is ' + response.body.daily.data[0].temperatureHigh + ' and ' + 'Lowest Temp is ' + response.body.daily.data[0].temperatureLow,
                    location : response.body.timezone,
                    SunRiseSunSet : 'Sun rise at '+ Unix_timestamp(response.body.daily.data[0].sunriseTime) + ' and ' + 'Sun set at ' + Unix_timestamp(response.body.daily.data[0].sunsetTime)
                })
            }
        })
}

module.exports = forecast