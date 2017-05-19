var model = {
    GeoLocalize: function() {
        //https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
        // Modified with my function processor
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function processor(lat=38.7293334,long=-121.2751474){
          JGeo = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + '&lon=' + long + '&units=metric&appid=eb5d3093d7e824e8a57c0037fc66c1ea';
          var currentGeoLocation = [lat, long, JGeo]
          console.log(currentGeoLocation)
          model.obtainWeather(currentGeoLocation);
        }
        function success(pos) {
            var crd = pos.coords;
            processor(crd.latitude, crd.longitude);
            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
        };

        function error(err) {
            processor();
            console.warn(`ERROR(${err.code}): ${err.message}`);
            console.warn('Default Coordinates are used.')
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
    },

    obtainWeather: function(geo) {
        console.log('Obtaining the Weather! :D ')
        console.log(geo)
        $.getJSON(geo[2],function(data){
          ViewModel.weatherize(data);
          console.log(data);
        })
    },

    getMap: function() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 35.233200,
                lng: -91.717283
            },
            zoom: 13
        });
        var tribeca = {
            lat: 35.233200,
            lng: -91.717283
        };
        var marker = new google.maps.Marker({
            position: tribeca,
            map: map,
            title: "Whoo"
        });
        var infowin = new google.maps.InfoWindow({
            content: "Do you see me? "
        });
        marker.addListener('click', function() {
            infowin.open(map, marker);
        })
    }
}

var ViewModel = {
    init: function() {
        model.GeoLocalize()
    },

    weatherize: function(wdata) {
        var temp = ko.observable(Math.floor(wdata.main.temp));
        var iconID = ko.observable("http://openweathermap.org/img/w/" + wdata.weather[0].icon + ".png");
        var city = ko.observable(wdata.name);
        console.log(temp(),iconID(),city())
    }
}

ViewModel.init();
ko.applyBindings(ViewModel.weatherize)
