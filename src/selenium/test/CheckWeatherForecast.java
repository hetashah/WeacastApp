package selenium.test;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.json.simple.JSONObject;
import org.junit.*;


public class CheckWeatherForecast {
	
	//mubai-00000.1.43003
	public static void main(String[] args){
	
	try{
		System.setProperty("webdriver.chrome.driver", "C:\\Users\\heta\\Documents\\Masters\\sem2\\cmpe273\\cmpe273 class\\project273\\jar downloads\\chromedriver.exe");
		ChromeDriver driver = new ChromeDriver();
		//WebDriver driver = new FirefoxDriver();
		String baseURL = "http://localhost:8080/WeacastApp/index.html";
		driver.get(baseURL);
		
		driver.findElement(By.cssSelector("ul.nav.navbar-nav.navbar-right li:first-child a")).click();
		Thread.sleep(1000);
		driver.findElement(By.cssSelector("#searchCities")).sendKeys("Mumbai, India");
		Thread.sleep(1000);
		driver.findElement(By.xpath("//*[@id='00000.1.43003']")).click();
		String temp = driver.findElement(By.cssSelector("#Temperature")).getText();
		String currenttemp = getTempFromWebService();
		System.out.println(temp);
		System.out.println(currenttemp);
		//assert
		
	}
	catch(Exception ex){
		ex.printStackTrace();
	}
	
	}
	
	public static String getTempFromWebService(){
		String currentoutput="";
		String weather="0";
		JSONParser parser = new JSONParser();
		try{
		URL url = new URL("http://api.wunderground.com/api/7ecfc720b9bbcb56/conditions/q/zmw:00000.1.43003.json");
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		conn.setRequestProperty("Accept", "application/json");
		
		BufferedReader br = new BufferedReader(new InputStreamReader(
				(conn.getInputStream())));
	 
			String output;
			System.out.println("Output from Server .... \n");
			while ((output = br.readLine()) != null) {
				currentoutput += output;
				System.out.println(output);
			}
	 
			conn.disconnect();
			
			Object obj = parser.parse(currentoutput);
			JSONObject jsonobject = (JSONObject) obj;
			JSONObject currentobser = (JSONObject) jsonobject.get("current_observation");
			weather = (String) currentobser.get("temp_f");
			//System.out.println(weather);
		}
		catch(Exception ex){
			ex.printStackTrace();
		}
		
		return weather;
	}
}
