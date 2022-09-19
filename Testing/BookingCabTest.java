// Generated by Selenium IDE
import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.core.IsNot.not;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Alert;
import org.openqa.selenium.Keys;
import java.util.*;
import java.net.MalformedURLException;
import java.net.URL;
public class BookingCabTest {
  private WebDriver driver;
  private Map<String, Object> vars;
  JavascriptExecutor js;
  @Before
  public void setUp() {
    driver = new ChromeDriver();
    js = (JavascriptExecutor) driver;
    vars = new HashMap<String, Object>();
  }
  @After
  public void tearDown() {
    driver.quit();
  }
  @Test
  public void bookingCab() {
    driver.get("http://localhost:3000/");
    driver.manage().window().setSize(new Dimension(1401, 753));
    driver.findElement(By.name("username")).click();
    driver.findElement(By.name("username")).sendKeys("kumara");
    driver.findElement(By.name("password")).click();
    driver.findElement(By.name("password")).click();
    driver.findElement(By.name("password")).sendKeys("kumara123");
    driver.findElement(By.cssSelector("span")).click();
    driver.findElement(By.cssSelector(".form-select")).click();
    {
      WebElement dropdown = driver.findElement(By.cssSelector(".form-select"));
      dropdown.findElement(By.xpath("//option[. = 'Nugegoda']")).click();
    }
    driver.findElement(By.cssSelector(".card:nth-child(4) > .btn")).click();
    driver.findElement(By.name("destination")).click();
    driver.findElement(By.name("destination")).sendKeys("kiribathgoda");
    driver.findElement(By.cssSelector(".btn-success")).click();
    {
      WebElement element = driver.findElement(By.cssSelector(".btn-success"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    {
      WebElement element = driver.findElement(By.tagName("body"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element, 0, 0).perform();
    }
  }
}