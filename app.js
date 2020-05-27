const express = require('express')
const axios = require('axios')
const port = 1900
const APIkey = '5781ab79269d685e56fec57e60ece273'; // 
const URL = 'http://api.openweathermap.org/data/2.5/weather'
var bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', (req, res) => res.send('Hello'))
app.get('/getWeatherSingle', async (req, res) => {

    if (req.body.query) {
        console.log(req.body.query)
        // await getWeather(req.body.query).then(function (result) {
        //     // console.log(result);
        //     res.send(result);
        // })
        res.send('444')
    } else { res.send('Please provide city names or pincodes as data filed in POST') }

})

app.post('/getWeather', async (req, res) => {

    if (req.body.data) {
        await getWeather(req.body.data).then(function (result) {
            // console.log(result);
            res.send(result);
        })

    } else { res.send('Please provide city names or pincodes as data filed in POST') }

})

const getWeather = async (cityList) => {
    let done = false;
    let resultList = [];
    if (cityList.length) {
        
        for(let i=0;i<=cityList.length;i++){
            
                  let city = cityList[i];

            await axios.get(URL, {
                params: {
                    q: city,
                    APPID: APIkey
                }
            })
                .then(function (response) {
                    console.log('Weather report for '+city);
                    console.log(JSON.stringify(response.data));
                    resultList.push("{City:" + city + ", response:" + JSON.stringify(response.data) + "}");
                    
                })
                .catch(function (error) {
                    console.log(error);
                })
                if(i==cityList.length-1){
                    
                    done = true;
                    return resultList;
                }
        }
    
    if(done){
        return resultList;
    }
        
    }

}


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))