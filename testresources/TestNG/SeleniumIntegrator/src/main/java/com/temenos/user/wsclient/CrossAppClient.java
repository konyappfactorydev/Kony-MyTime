package com.temenos.user.wsclient;

import org.json.JSONException;
import org.json.JSONObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import com.temenos.user.wsclient.CrossAppClientInterface;

import java.util.ArrayList;
import java.util.Map;

public class CrossAppClient implements CrossAppClientInterface {
    public ChromeDriver driver = null;
    
    public void onInitWebDriver(WebDriver webDriver) {
        if(webDriver instanceof ChromeDriver) {
            this.driver = (ChromeDriver) webDriver;
        } else {
            System.out.println("Got a driver other than chrome driver");
        }
    }

    public JSONObject onMessage(JSONObject jsonObject) {
        boolean eventStatus = false;
        try {
            if(jsonObject.get("eventName").equals("enterUsername")) {
                System.out.println("Calling the enter UserName method  ----  ");
                eventStatus = enterUsername();
            }
            if(jsonObject.get("eventName").equals("TestsCompleted")) {
                System.out.println("Calling the enter TestsCompleted method  ----  ");
                eventStatus = enterUsername();
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        JSONObject eventDetails = new JSONObject();
        try {
            eventDetails.put("eventName", "executionDone");
            eventDetails.put("eventSuccess", eventStatus);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        System.out.println("Sending the success message back to the server");
        return eventDetails;
    }

    private boolean enterUsername() {
        ArrayList<String> tabs2 = new ArrayList<String>(driver.getWindowHandles());

        for(String windo : tabs2) {
            driver.switchTo().window(windo);
            System.out.println("Title of the app is - " + driver.getTitle());
            if(driver.getTitle().equals("Customer Log In")) {

                WebElement element = driver.findElement(By.xpath("//input[@name='login' and @title='Email Address']"));
                element.sendKeys("dinesh.gioe@gmail.com");
                System.out.println("Entered the user name");
                element = driver.findElement(By.xpath("//input[@name='password' and @title='Password']"));
                element.sendKeys("Rivert@9866");
                System.out.println("Entered the Password");

                element = driver.findElement(By.xpath("//input[@name='login_submit' and @title='Authorize']"));
                element.click();
                System.out.println("Clicked on Login and waiting");

                try {
                    Thread.sleep(5000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                    return false;
                }

                element = driver.findElement(By.xpath("//button[@title='Grant access to Box' and @value='Grant access to Box']"));
                element.click();
                System.out.println("Granting Access");

                try {
                    Thread.sleep(8000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                    return false;
                }
                //System.out.println("Closing the child app");
                //driver.close();
                System.out.println("Switching to the Parent App");
                driver.switchTo().window(tabs2.get(0));
            }
        }
        System.out.println("Returning as True");
        return true;
    }


}
