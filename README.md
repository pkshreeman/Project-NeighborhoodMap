### Parameters of openweathermap JSON
#### <http://openweathermap.org/current#current_JSON>
```JSON
{"coord":
{"lon":145.77,"lat":-16.92},
"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],
"base":"cmc stations",
"main":{"temp":293.25,"pressure":1019,"humidity":83,"temp_min":289.82,"temp_max":295.37},
"wind":{"speed":5.1,"deg":150},
"clouds":{"all":75},
"rain":{"3h":3},
"dt":1435658272,
"sys":{"type":1,"id":8166,"message":0.0166,"country":"AU","sunrise":1435610796,"sunset":1435650870},
"id":2172797,
"name":"Cairns",
"cod":200}
```
coord
- coord.lon City geo location, longitude
- coord.lat City geo location, latitude

weather (more info Weather condition codes)
- weather.id Weather condition id
- weather.main Group of weather parameters (Rain,
Snow, Extreme etc.)
- weather.description Weather condition within the group
- weather.icon Weather icon id
base Internal parameter

main
- main.temp Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
- main.pressure Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa
- main.humidity Humidity, %
- main.temp_min Minimum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
- main.temp_max Maximum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
- main.sea_level Atmospheric pressure on the sea level, hPa
- main.grnd_level Atmospheric pressure on the ground level, hPa

wind
- wind.speed Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
- wind.deg Wind direction, degrees (meteorological)

clouds
- clouds.all Cloudiness, %

rain
- rain.3h Rain volume for the last 3 hours

snow
- snow.3h Snow volume for the last 3Â hours

dt Time of data calculation, unix, UTC

sys
- sys.type Internal parameter
- sys.id Internal parameter
- sys.message Internal parameter
- sys.country Country code (GB, JP etc.)
- sys.sunrise Sunrise time, unix, UTC
- sys.sunset Sunset time, unix, UTC

id City ID

name City name

cod Internal parameter
