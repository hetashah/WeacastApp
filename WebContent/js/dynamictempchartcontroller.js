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

requirejs(['jquery','jqueryui', 'modernizr'],
function($, jqueryui,modernizr) {
		$(function(){
			loadLocalStorageData();
		});
		
		function loadLocalStorageData(){
			var WeatherData = JSON.parse(localStorage.getItem('WeatherKey'));
			var HourlyData = JSON.parse(localStorage.getItem('HourlyKey'));
			var ForecastData = JSON.parse(localStorage.getItem('ForecastKey'));
			$('#cityheading').text(WeatherData.city);
			$('#oval').html(WeatherData.tempF + "F");
			loadForecast(ForecastData);
			test(HourlyData);
		}
		
		function loadForecast(ForecastData){
			for(var i=0; i <4; i++){
				console.log(ForecastData.forecastday[i].title);
				console.log(ForecastData.forecastday[i].fcttext);
				var newDiv = $(document.createElement('div')).attr({"id":"newDiv","class":'buttonDiv'});
				newDiv.after().html(ForecastData.forecastday[i].title +"<br>").attr({});
				var newSpan = $(document.createElement('span')).attr({"class":'spanDetails'});
				newSpan.after().html("&nbsp;&nbsp;&nbsp;&nbsp;" +ForecastData.forecastday[i].fcttext+"<hr>");
				newSpan.appendTo(newDiv);
				newDiv.appendTo("#details");
			}
		}
		
		
		function test(data)
		{
			var temps = new Array();
			var hr= new Array();
			$.each(data, function(index,value) {
				
				temps.push(data[index].temp.english);
				hr.push(data[index].FCTTIME.hour);
			});
			drawChart(hr,temps);
		}
		
		function drawChart(hr,temps){
			var data = new google.visualization.DataTable();
			data.addColumn('string','hr');
			data.addColumn('number','temps');
			data.addRows([
				[hr[0],parseInt(temps[0])],	
				[hr[1],parseInt(temps[1])],	
				[hr[2],parseInt(temps[2])],	
				[hr[3],parseInt(temps[3])],	
				[hr[4],parseInt(temps[4])],	
				[hr[5],parseInt(temps[5])],	
				[hr[6],parseInt(temps[6])],	
				[hr[7],parseInt(temps[7])]
			]);
			var options = {
			title: ' Temperature'
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
	  });
