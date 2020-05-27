# weather-app-47
Demo API consumer app written in TS/JS and hosted on Firebase cloud functions.
Openweathermap api

Run postman or Curl to POST request to /weather REST end point with 'data' filed with cityname or pincode as value to get weather info JSON response.
Run GET method on /getWeatherSingle?city=cityNameOrPincode to get on browser or postman.

Sample Response format is trimmed to serve main purpose of exercise.
<code><json>
  {
  "city": "Windsor",
  "Local Time": "Wednesday, May 27th 2020, 5:19:42 pm",
  "Temperature": "27.37 Celsius",
  "Feels Like": "27.46 Celsius",
  "Min": "26 Celsius",
  "Max": "28.89 Celsius",
  "Humidity": 61
  }</json>
</code>
