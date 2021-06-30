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
            if(driver.getTitle().equals("TestDW")) {

                WebElement element = driver.findElement(By.xpath("/html/body/div[2]/form/div[2]/input[1]"));

                element.sendKeys("test@harsha.com");

                try {
                    Thread.sleep(3000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                    return false;
                }
                System.out.println("Closing the child app");
                driver.close();
                System.out.println("Switching to the Parent App");
                driver.switchTo().window(tabs2.get(0));
            }
        }
        System.out.println("Returning as True");
        return true;
    }


}