if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv')
  dotenv.config()

}
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const moment = require('moment');
const timezone = require('moment-timezone')
// moment().format(); 
const port = 1900
const APIkey = process.env.NODE_EXT_API 
const URL = process.env.NODE_EXT_URL
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello'))

app.get('/getWeatherSingle', async (req, res) => {
    if (req.query.city) {
        let cityList = []
        cityList.push(req.query.city)
        await getWeather(cityList)
        .then(function (result) {
            res.send(result[0]);
        })
        
    } else { res.send('Please provide city names or pincodes as data filed in POST') }

})

app.post('/weather', async (req, res) => {

    if (req.body.data) {
        await getWeather(req.body.data)
        .then(function (result) {
            res.send(JSON.stringify(result));
        })

    } else { 
      res.send('Please provide city names or pincodes as data filed in POST')
     }

})

const getLocalTime = function(offset){
  let time = moment().utc()
  time = moment().utcOffset(offset/3600)
  return time.format("dddd, MMMM Do YYYY, h:mm:ss a")
}
const getWeather = async (cityList) => {
    let done = false
    let resultList = []
    if (cityList.length) {
        for(let i=0;i<=cityList.length;i++){
            let city = cityList[i]
            await axios.get(URL, {
                params: {
                    q: city,
                    units:'metric',
                    APPID: APIkey
                }
            })
                .then(function (response) {
                    let responseD = response.data
                    let data = responseD
                    let time = getLocalTime(responseD.timezone)
                    let JSONv = {
                      'city':response.data.name, 
                      'Local Time':time, 
                      'Weather':data.weather.main, 
                      'Temperature':data.main.temp+' Celcius',
                      'Feels Like':data.main.feels_like+' Celcius',
                      'Min':data.main.temp_min+' Celcius',
                      'Max':data.main.temp_max+' Celcius',
                      'Humidity':data.main.humidity
                    }
                    resultList.push(JSONv)
                    
                })
                .catch(function (error) {
                    console.log(error)
                    return error
                })
                if(i==cityList.length-1){
                    
                    done = true
                    return resultList
                }
        }
    
    if(done){
        return resultList
    }
        
    }

}
app.listen(port, () => console.log(`Weather-app-47 listening at http://localhost:${port}`))
