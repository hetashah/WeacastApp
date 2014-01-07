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
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class WeacastFlow {
	
	
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
		Thread.sleep(2000);
		driver.findElement(By.cssSelector("#searchCities")).sendKeys("San Francisco");
		Thread.sleep(4000);
		driver.findElement(By.xpath("//*[@id='94101.1.99999']")).click();
		Thread.sleep(2000);
		driver.findElement(By.cssSelector("#locate")).click();
		Thread.sleep(4000);
		driver.findElement(By.cssSelector("#chart")).click();
		Thread.sleep(4000);
		//System.out.println(temp);
		driver.quit();
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
		}
	}
	
	


}
