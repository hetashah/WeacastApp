package selenium.test;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.*;


public class test {
	
	ChromeDriver driver;
	
	@BeforeMethod
	public void setup(){
		try{
			System.setProperty("webdriver.chrome.driver", "C:\\Users\\heta\\Documents\\Masters\\sem2\\cmpe273\\cmpe273 class\\project273\\jar downloads\\chromedriver.exe");
		    driver = new ChromeDriver();
			//WebDriver driver = new FirefoxDriver();
			String baseURL = "http://localhost:8080/WeacastApp/index.html";
			driver.get(baseURL);
		}
		catch(Exception ex){
			ex.printStackTrace();
		}
	}
	
	@Test
	public void checktemp(){
		
		try{
		driver.findElement(By.cssSelector("ul.nav.navbar-nav.navbar-right li:first-child a")).click();
		//Thread.sleep(1000);
		Thread.sleep(2000);
		driver.findElement(By.cssSelector("#searchCities")).sendKeys("Mumbai");
		//Thread.sleep(2000);
		Thread.sleep(4000);
		driver.findElement(By.xpath("//*[@id='00000.1.43003']")).click();
		//Thread.sleep(1000);
		Thread.sleep(2000);
		String temp = driver.findElement(By.cssSelector("#Temperature")).getText();
		Thread.sleep(2000);
		System.out.println("temp" + temp);
		String currenttemp = Long.toString(getTempFromWebService());
		System.out.println(currenttemp);
		Assert.assertEquals(temp, currenttemp + " F");
		driver.findElement(By.cssSelector("#addCities")).click();
		Thread.sleep(2000);
		//System.out.println(temp);
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
		}
		driver.quit();
	}
	
	@Test
	public Long getTempFromWebService(){
	
		String currentoutput="";
		Long weather = null;
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
			weather = (Long) currentobser.get("temp_f");
			System.out.println(weather);
		}
		catch(Exception ex){
			ex.printStackTrace();
		}
		
		return weather;
	
	}

}
