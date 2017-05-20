var model = {
    GeoLocalize: function() {
        //https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
        // Modified with my function processor
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function processor(lat = 38.7293334, long = -121.2751474) {
            JGeo = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + '&lon=' + long + '&units=metric&appid=eb5d3093d7e824e8a57c0037fc66c1ea';
            var currentGeoLocation = [lat, long, JGeo];
            console.log("currentGeoLocation at Processor():");
            console.log(currentGeoLocation);
            model.obtainWeather(currentGeoLocation);
            ViewModel1.kolon(long);
            ViewModel1.kolat(lat);
            model.getMap();
            model.obtainRGeo();

        };

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

    getNYTimes: function(){
      var NYTKey = '&api_key=df8caa62f6d142c7bc7c4e5a56d37ea7'
      var NYTUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + ViewModel1.city() + "&sort=newest" + NYTKey;
      console.log("NYTimes URL get:")
      console.log(NYTUrl);

      $.getJSON(NYTUrl, function(data){
        ViewModel1.articlesNYT(data.response.docs);
      }).fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
    console.log( "Request Failed: " + err);
  })
},

  getWiki: function(){
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + ViewModel1.city() + '&format=json';
    var wikiTimer = setTimeout(function(){
      console.log("Unable to obtain the latest.  Please check your connection for Wiki.");
    }, 8000);

    $.ajax({
      url: wikiUrl,
      dataType: 'jsonp',
      jsonp: 'callback',
      success: function( response ){
        console.log("Wiki's Response");
        console.log(response);
        ViewModel1.wikiHeader(response[1]);
        ViewModel1.wikiArticle(response[2]);
        ViewModel1.wikiLink(response[3]);
        for (var i = 0; i < response[1].length; i ++){
        ViewModel1.wikiArray.push({
          title: response[1][i],
          desc: response[2][i],
          link: response[3][i]});
          //console.log(i)
        }
        clearTimeout(wikiTimer);
      }
    })

  },

    obtainWeather: function(geo) {
        console.log('Obtaining the Weather! :D ')
        //console.log(geo)
        $.getJSON(geo[2], function(data) {
            controller.weatherize(data);
            ViewModel1.weatherdata(data);
            console.log(data);
        })
    },

    obtainRGeo: function(){
      $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng='+ ViewModel1.kolat() + "," + ViewModel1.kolon() + '&key=AIzaSyC9AjHKQO7uPcP3qj0b__1NI0xMXXgPBrc&results_type=locality|administrative_area_level_1',
      function(gdata){
        console.log(gdata);
        ViewModel1.city(gdata.results["0"].address_components[3].long_name);
        ViewModel1.state(gdata.results["0"].address_components[5].long_name);
        ViewModel1.address(gdata.results["0"].formatted_address);
        model.getNYTimes();
        model.getWiki();
      })
    },

    getMap: function() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: ViewModel1.kolat(),
                lng: ViewModel1.kolon()
            },
            zoom: 13
        });
        var marker = new google.maps.Marker({
            position: {
                lat: ViewModel1.kolat(),
                lng: ViewModel1.kolon()
            },
            animation: google.maps.Animation.DROP,
            map: map,
            // icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magnifying_glass_icon.svg/1024px-Magnifying_glass_icon.svg.png",
            title: "You are here! :D"
        });

        var infowin = new google.maps.InfoWindow({
            content: "Do you see me? "
        });
        marker.addListener('click', function() {
            infowin.open(map, marker);
        })
    }
}

var controller = {
        init: function() {
            model.GeoLocalize()
        },

        weatherize: function(wdata) {
            /*  this.temp = ko.observable(Math.floor(wdata.main.temp));
              this.iconID = ko.observable("http://openweathermap.org/img/w/" + wdata.weather[0].icon + ".png");
              this.city = ko.observable(wdata.name);
              console.log(this.temp(),this.iconID(),this.city());*/
            ViewModel1.temp('Your current temperature is ' + Math.floor(wdata.main.temp*(9/5)+32)) + '"&deg;F"';
            ViewModel1.iconID("http://openweathermap.org/img/w/" + wdata.weather["0"].icon + ".png");
            ViewModel1.weatherdes(wdata.weather[0].description);
          }
        }

        var ViewModel1 = {
            weatherdata: ko.observableArray(),
            temp: ko.observable(),
            iconID: ko.observable(),
            city: ko.observable(),
            state: ko.observable(),
            kolon: ko.observable(),
            kolat: ko.observable(),
            address: ko.observable(),
            weatherdes: ko.observable(),
            articlesNYT: ko.observable(),
            wikiArticle: ko.observable(),
            wikiLink: ko.observable(),
            wikiHeader: ko.observable(),
            wikiArray: ko.observableArray(),
        }

        controller.init();
        ko.applyBindings(ViewModel1);
