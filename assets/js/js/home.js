var searchBtn = document.querySelector("#search-btn");
var tempToday = document.querySelector("#today-temp");
var humidityToday = document.querySelector("#today-humidity");
var windToday = document.querySelector("#today-wind");
var city = document.querySelector("#city-name");

searchBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var cityName = document.querySelector("#locations")
    cityName = cityName.value.trim();
    
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d0ae432636e8c95d3a3e262f3d975633&units=imperial`


    // Make API call to OpenWeatherMap
    fetch(apiUrl)
        .then(function(response) {
          // request was successful
          if (response.ok) {
            //console.log(response);
            response.json().then(function(data) {
                // 'Data' is for today's weather forecast
                todayWeather(data);

                // Take Lat/Lon from our city in order to get the 5 day forecast
                var lat = data.coord.lat 
                var lon = data.coord.lon
                // Making 5 day weather forecast
                fiveDayForecast(lat,lon);

            });
        };
    });
// temp, humidity, wind, UV index
});

var todayWeather = function(data) {
    console.log(data);

              var location = data.name 
              city.textContent = location

              var temp = data.main.temp
              tempToday.textContent = "The temperature today is " + temp
            
              var humidity = data.main.humidity
              humidityToday.textContent = "The humidity today is " + humidity
              

              var wind = data.wind.speed
              windToday.textContent = "The wind today is " + wind
};

var fiveDayForecast = function(lat,lon) {
    var fiveDayApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=d0ae432636e8c95d3a3e262f3d975633&units=imperial`
 // Make API call to OpenWeatherMap
    fetch(fiveDayApiUrl)
        .then(function(response) {
          // request was successful
          if (response.ok) {
            //console.log(response);
            response.json().then(function(data) {
                console.log("Five Day Weather Data", data);
                // we are separating just the next 5 days of weather 
               // get just daily weather from the Data
                var weekWeather = data.daily;
                // getting just Day 1 - 5 from Daily weather (tomorrow- day 5)
                weekWeather = weekWeather.slice(1,6)
                
                // use indexing to get each day's weather from array
                var tomorrowWeather = weekWeather[0]
                var tomorrowTemp = weekWeather[0].temp.day

                // two days from now is index1 from weekWeather
                var twoDaysFromNowWeather = weekWeather[1]
                var twoDaysWeather = weekWeather[1].temp.day
            });
        };
    });
    

}
