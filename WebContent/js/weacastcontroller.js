//210713779116136 - facebook API ID
//$(document).ready(function(){
	
	requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        weacastapp: '../weacastapp'
    }
});

// Start the main app logic.
requirejs(['jquery', 'jqueryui', 'skycons', 'modernizr' ,'weacastapp/model'],
function($, jqueryui, skycons,modernizr, model) {
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.

	
	$(function(){
		var abc=null;
		//alert(abc);
		loadDefaultWeather();
		loadLocation();
		addHourlybuttons();
	});
	
	function loadDefaultWeather(){
		
		var items = JSON.parse(window.localStorage.getItem('WeatherKey'))

		if (items === null || items.length === 0)
		{
			//ApiCall("94101.1.99999");
			getCurrentGeoLocation();
		}
		else{
			ApiCall(items.cityzmw);
		}
	
	}
	
	function getCurrentGeoLocation(){
	
		if (navigator.geolocation)
		{
			 navigator.geolocation.getCurrentPosition(showPosition,errorShow, {maximumAge: 30000, timeout: 10000, enableHighAccuracy: true});
		}
		else{document.getElementById("demo").innerHTML="Geolocation is not supported by this browser.";}
	
	}
	
	function errorShow(){
		
	}
	
	function showPosition(position){
		lat = position.coords.latitude;
		lon = position.coords.longitude;
		ApiCallLatLong(lat +"," + lon);
		
	}
	
	
	function loadLocation(){
		//Load existing weather location from the localStorage
		if(JSON.parse(localStorage.getItem('locationKey')) != null){
		var obj = $.parseJSON(localStorage.getItem('locationKey'));
		
		for(var i=0;i<obj.length;i++){
		
		//following code creates div tag with two spans
		var newButtonDiv = $(document.createElement('div'))
		.attr({"id":"buttonDiv" + counter,"class":'buttonDiv'});
		//span :1
		var newButtonSpan = $(document.createElement('span'));
		newButtonSpan.after().html('<input type="button" name="b" class="WeatherButt" value = " '+  obj[i].cityname + '" id="'+ obj[i].cityzmw +'">');
		//span:2
		var newImageSpan = $(document.createElement('span'))
		.attr({"id":"image-" + obj[i].cityname,"class":'image1'});
		newImageSpan.after().html('<img src="img/cancel_icon.gif">');
		
		//Add span to div tag
		newButtonSpan.appendTo(newButtonDiv);
		newImageSpan.appendTo(newButtonDiv);
		newButtonDiv.appendTo("#showPlacesDiv");
		counter++;
	} // end -for
	}//end - if
	}
	
	//Set of global variables.
	var counter=0;
	var currentCity;
	var currentZmw;
	
	
	//When user clicks on Add Button [ to add selected city]
	$('#addCities').on('click',function(event){
	var insertCity,insertZmw;
	if(localStorage.getItem('WeatherKey') === null){
	alert("Search For Location Before Adding");
	}
	else{
	var theWeather = localStorage.getItem('WeatherKey');
	var jsonob = JSON.parse(theWeather);}
	
	//Allows only 6 Weather Location at a time
		if(counter>5){
		console.log("You have reached your maximum limit");
		return false;}
	
	var newButtonDiv = $(document.createElement('div'))
		.attr({"id":"buttonDiv" + counter,"class":'buttonDiv'});
	
	var newButtonSpan = $(document.createElement('span'));
	//It checks where search text-box is empty, if it is empty it reads value from localStorage. if localStorage is also empty it just returns.
	if(currentCity!=null){
	insertCity = currentCity;insertZmw=currentZmw;}
	else if(theWeather!=null){
	insertCity = jsonob.city;insertZmw=jsonob.cityzmw;}
	//newButtonSpan.after().html('<input type="button" name="b" class="WeatherButt" value = " '+  jsonob.city + '" id="'+jsonob.cityzmw+'">');}
	else{return;}
	
	newButtonSpan.after().html('<input type="button" name="b" class="WeatherButt" value = " '+  insertCity + '" id="'+ insertZmw +'">');
	var newImageSpan = $(document.createElement('span')).attr({"id":"image-" + currentCity,"class":'image1'});
	newImageSpan.after().html('<img src="img/cancel_icon.gif">');

	newButtonSpan.appendTo(newButtonDiv);
	newImageSpan.appendTo(newButtonDiv);
	newButtonDiv.appendTo("#showPlacesDiv");
	counter++;
	StoreWeatherLocation(insertCity,insertZmw);
	});	

	function StoreWeatherLocation(insertCity,insertZmw){
	var location = [];
	var currentPushLoc = {};
	
	currentPushLoc["cityname"] = insertCity;
	currentPushLoc["cityzmw"] = insertZmw;
	//push name and zmw into localstorage.
	if(localStorage.getItem('locationKey') != null){
	location = JSON.parse(localStorage.getItem('locationKey'));
	}
	location.push(currentPushLoc);
	localStorage.setItem('locationKey', JSON.stringify(location));
	}

// when user clicks on edit button it adds new class abc to show the image
	$('#editCities').on('click',function(event){
	//$('#image0').addClass('abc');
	
		$('#addCities').hide();
		$('#doneCities').show();
		$('span.image1').each(function( index ){
			$('.image1').addClass('abc');
		});
	
	});
	
//when user clicks on done button it removes the image button.
	$('#doneCities').on('click',function(event){
	$('#addCities').show();
		$('span.image1').each(function( index ){
			$('.image1').removeClass('abc');
		});
		$('#doneCities').hide();
	});
	
	
//when user clicks on cancel image button, it removes that div tag
	$(document.body).on('click','.image1',function(event){
	//alert(event.currentTarget.offsetParent.lastElementChild);
	
	//http://stackoverflow.com/questions/8127075/localstorage-json-how-can-i-delete-only-1-array-inside-a-key-since-localstora
	var city = event.currentTarget.id.split("-");
	
	var location = JSON.parse(localStorage.getItem('locationKey'));
	for(var i=0;i<location.length;i++)
		{
		if(location[i].cityname == city[1]){
			location.splice(i,1);}
		}
	console.log(location);
	localStorage.setItem('locationKey',JSON.stringify(location));	
	var divRemove = event.currentTarget.parentElement;
	divRemove.remove();
	counter--;
	});
	
//When user clicks on different locatioin button it loads new weather information.	
	$(document.body).on('click','.WeatherButt',function(event){
	ApiCall(event.target.id);
	});
	
	
		
//When clicks on drop - down option of citites, calls Weather API and get response as JSON.

	$(document.body).on('click','.cities',function(event){
		
		currentCity=event.currentTarget.innerText;
		currentZmw=event.target.id;
		var city_zmw=event.target.id;
		$("#searchCities").val(jQuery.trim(event.currentTarget.innerText));
		$(this).parent().hide();
		var weather = ApiCall(city_zmw);
		showDetails(weather);
		});
		
		
		
		function ApiCallLatLong(city_latlong){
		
		//url:'http://api.wunderground.com/api/7ecfc720b9bbcb56/conditions/q/CA/' + cityfinal + '.json',
		//url:'http://api.wunderground.com/api/7ecfc720b9bbcb56/conditions/q/zmw:94101.1.99999.json',
		
			$.ajax( {
				 url:'http://api.wunderground.com/api/7ecfc720b9bbcb56/forecast/hourly/astronomy/conditions/q/' + city_latlong + '.json',
	             type:'GET',
				 dataType: 'jsonp',
				 timeout: 15000,
				 //data: 'queryPlace=mahe',
	             error: function(xhr, status, error){
					alert(status);
                },
                success:function(handleResponse){					
					GetDailyWeather(handleResponse,0);
                }
	          });
		
		}
				
		
//Weather Object which get stores in localstorage
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
//When user types a character in input box, it calls "Complete API" to show Different cities of the World.
		$("#searchCities").on('input',function(event){
			
		var textbx = $('#searchCities').val();
		
		//ajax call to API
		//console.log(jQuery.trim(textbx).length);
		if(jQuery.trim(textbx).length > 0)
		{
			 $.ajax( {
				 url:'http://autocomplete.wunderground.com/aq?&query='+ $('#searchCities').val() +'&page=1&start=0&limit=8&cb=?',
	             type:'GET',
				 dataType: 'jsonp',
				 timeout: 15000,
				 //data: 'queryPlace=mahe',
	             error: function(xhr, status, error){
					alert(status);
                },
                success:function(handleResponse){	
					if($('#searchCities').val().length === 0){
						return;
					}
						cbWeatherFunction(handleResponse);
				
                }
	          });
		}	
		else
		{
			console.log($('#placeSearch').val());
			console.log($("#result1").length);
			if($("#result1").length !=0)
			{
			$("#result1").remove();
			}
		}
		}); //end .click(function(event))

//CallBack function from API call.		
		function cbWeatherFunction(data){
		var no;
		var places = [];
		var result='';
		
		var $div = $("<div id=result1></div>");
		if(data.RESULTS.length>4){
			no=4;}
		else{
			no=data.RESULTS.length;}
		for(var i=0;i<=no-1;i++)
		{
			//var span = $('<span></span>',{class:'countries',id:data.RESULTS[i].zmw});
			var span = $('<span></span>',{class:'cities',id:data.RESULTS[i].zmw});
			span.html(result + data.RESULTS[i].name + "</br><hr>");
			$div.append(span);
			//places[data.RESULTS[i].name]= data.RESULTS[i].zmw;	
			//result = result + data.RESULTS[i].name + "</br>";
		}
		//console.log($div.innerHTML);
		
		if($("#result1").length !=0){
			$("#result1").remove();}
		
		$('#options').append($div);
		}
		
		
		//add new buttons
		function addHourlybuttons(){
		var currentdate = new Date();
		var hours12;
		var hours = currentdate.getHours();
		var min = currentdate.getMinutes();
		var add;
		
		
		
		if(min>1){
			hours = hours+1;}

		$('#hourlybutton').append('<input type="button" class="hourlyEarly" value = "Previous Hours" id="0">');
		
		for(var i=0;i<5;i++){
			$('#hourlybutton').append('<input type="button" class="hourly" value = " '+  hours + '" id="'+ hours +'">');			
			if(hours>=23){
				hours = 0;}
			else{hours++;}
			}
			$('#hourlybutton').append('<input type="button" class="hourlyNext" value = "Next Hours" id="0">');
		}
		
		
		
		$(document.body).on('click','.hourlyNext',function(event){
			var hourlyButtons = $(".hourly");
			
			var hourid = (hourlyButtons[4].id);
			
			
			for(var i=0; i<=4; i++){
				if(hourid>=23){
					hourid=-1;}
				hourid= parseInt(hourid)+1;
				hourlyButtons[i].value = hourid;
				hourlyButtons[i].id = hourid;
			}
		})
		
		
		$(document.body).on('click','.hourlyEarly',function(event){
			var hourlyButtons = $(".hourly");
			
			//converts from 0-24 to 0-12
			var firstid = (hourlyButtons[0].id);
			//get current hour
			var hours = new Date().getHours();
			if(hours>=23?hours=0:hours=hours);
			var min = new Date().getMinutes();
			if(min>0){
				hours=hours+1;}
			else{
				hours=hours;}
			
			//reverse hours start by geeting first hour from button and subsraction 5 from it.
			var reversehour= firstid- 5;
			var newstarthour;
			
			if(reversehour>=hours){
				newstarthour = reversehour;}
			else{
				newstarthour = hours;}
			
			for(var i=0; i<=4; i++){
				hourlyButtons[i].value = newstarthour;
				hourlyButtons[i].id = newstarthour;
				newstarthour = newstarthour + 1;	
			}
		})

	
	$(document.body).on('click','.hourly',function(event){
		var currenttime = event.currentTarget.id;
		var today = new Date().getDate();
		var theweather={};
		if(JSON.parse(localStorage.getItem('HourlyKey')) != null){
			var obj = $.parseJSON(localStorage.getItem('HourlyKey'));
		for(var i=0;i<obj.length;i++)
			{
				
				if(currenttime == obj[i].FCTTIME.hour)
					{
					loadAnimatedWeatherIcons(obj[i].condition);
					$("#CityDateTime").empty();
					$("#CityDateTime").append("Updated " + getCurrentDateAndTime());
					$("#Temperature").html(obj[i].temp.english).append(" F");
					$("#Condition").html(obj[i].condition);
					$("#tempc").html(obj[i].temp.metric).append(" C");
					$("#winddir").html(obj[i].wdir.dir);
					break;
					}
			}
		}
	});
	
			});
