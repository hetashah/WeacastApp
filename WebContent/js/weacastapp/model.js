function ApiCall(city_zmw){
		
		//url:'http://api.wunderground.com/api/7ecfc720b9bbcb56/conditions/q/CA/' + cityfinal + '.json',
		//url:'http://api.wunderground.com/api/7ecfc720b9bbcb56/conditions/q/zmw:94101.1.99999.json',
		
			$.ajax( {
				 url:'http://api.wunderground.com/api/7ecfc720b9bbcb56/forecast/hourly/astronomy/conditions/q/zmw:' + city_zmw + '.json',
	             type:'GET',
				 dataType: 'jsonp',
				 timeout: 15000,
				 //data: 'queryPlace=mahe',
	             error: function(xhr, status, error){
					alert(status);
                },
                success:function(handleResponse){					
					GetDailyWeather(handleResponse,city_zmw);
					
                }
	          });
		
		}
		
function GetDailyWeather(Data,city_zmw)
		{
			//Parse the City.JSON and creates "theWeather" Object by calling "WeatherObject" Function. 
			var theWeather = new weatherObject(Data.current_observation.display_location.city,Data.current_observation.temp_f,Data.current_observation.temp_c,Data.current_observation.observation_time,
			 Data.current_observation.weather,Data.current_observation.wind_string,Data.moon_phase.sunrise.hour,Data.sun_phase.sunset.hour,Data.current_observation.pressure_in,Data.current_observation.wind_mph,
			Data.current_observation.wind_string,Data.current_observation.wind_dir,Data.current_observation.icon_url,Data.current_observation.display_location.latitude,Data.current_observation.display_location.longitude,city_zmw);

			
			localStorage.setItem('WeatherKey',JSON.stringify(theWeather));
			localStorage.setItem('HourlyKey',JSON.stringify(Data.hourly_forecast));
			localStorage.setItem('ForecastKey',JSON.stringify(Data.forecast.txt_forecast));
			showDetails(theWeather);
			
			
			
		}
		
function weatherObject(city,tempF,tempC,retrivedTime,weather,windstring,sunrise,sunset,pressurein,windmph,windstr,winddir,iconurl,latitude,longitude,cityzmw)
	{
		this.city = city;
		this.tempF= tempF;
		this.tempC= tempC;
		this.retrivedTime= retrivedTime;
		this.weather= weather;
		this.windstring= windstring;
		this.sunrise= sunrise;
		this.sunset= sunset;
		this.pressurein= pressurein;
		this.windmph= windmph;
		this.windstr= windstr;
		this.winddir= winddir;
		this.iconurl=iconurl;
		this.latitude = latitude;
		this.longitude = longitude;
		this.cityzmw = cityzmw;
	}
	
function showDetails(theWeather){
			
	if(theWeather.weather != null && theWeather.weather != " "){
			loadAnimatedWeatherIcons(theWeather.weather);
	}
			$("#Citytitle").html(theWeather.city);
			$("#CityDateTime").empty();
			$("#CityDateTime").append("Updated " + getCurrentDateAndTime());
			$("#Temperature").html(theWeather.tempF).append(" F");
			if(theWeather.weather != null && theWeather.weather != " "){
			$("#Condition").html(theWeather.weather);
			}
			$("#tempc").html(theWeather.tempC).append(" C");
			$("#wind").html(theWeather.windmph).append(" mph ");
			$("#winddir").html(theWeather.winddir);
			$("#pressure").html(theWeather.pressurein);
			$("#sunrise").html(theWeather.sunrise).append(" AM ");
			$("#sunset").html(theWeather.sunset).append(" PM ");
			
		}
		
function loadAnimatedWeatherIcons(weathercond){
			
			 var skycons = new Skycons({"color": "black"});
			var iconWeather=Skycons.PARTLY_CLOUDY_DAY;
			var weatherCondition = weathercond;
			
			if(weatherCondition != null && weatherCondition != " "){
				if(weatherCondition.toLowerCase().indexOf("rain") >= 0)
					iconWeather=Skycons.RAIN;
				else if(weatherCondition.toLowerCase().indexOf("fog") >=0 || weatherCondition.toLowerCase().indexOf("haze") >=0)
					iconWeather=Skycons.FOG;
				else if(weatherCondition.toLowerCase().indexOf("snow") >=0)
					iconWeather=Skycons.SNOW;
				else if(weatherCondition.toLowerCase().indexOf("WIND") >=0)
					iconWeather=Skycons.WIND;
				else if(weatherCondition.toLowerCase().indexOf("partly") >=0 && weatherCondition.toLowerCase().indexOf("cloud") >= 0)
					iconWeather=Skycons.PARTLY_CLOUDY_DAY;
				else if(weatherCondition.toLowerCase().indexOf("mostly") >=0 && weatherCondition.toLowerCase().indexOf("cloud") >= 0)
					iconWeather=Skycons.CLOUDY;
				else if(weatherCondition.toLowerCase().indexOf("clear") >=0)
					iconWeather=Skycons.CLEAR_DAY;
				else
					iconWeather=Skycons.PARTLY_CLOUDY_DAY;
					
					
			// you can add a canvas by it's ID...
			skycons.add("icon1",iconWeather);

			// start animation!
			skycons.play();
			}
		}
		
function getCurrentDateAndTime(){
			
			var monthNames = [ "January", "February", "March", "April", "May", "June",
							"July", "August", "September", "October", "November", "December" ];
			var currentDate = new Date;
			var getDatetime = monthNames[(currentDate.getMonth())] + "," + currentDate.getDate() + " At " + currentDate.getHours() + ":" + currentDate.getMinutes();
			return getDatetime;
		}