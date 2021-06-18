package com.kony.jasUserCode;

import org.json.JSONException;
import org.json.JSONObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.ArrayList;

public class SeleniumUserCode implements SeleniumInteraction {
    public ChromeDriver driver = null;
    public void initDriver(ChromeDriver chromeDriver) {
        this.driver = chromeDriver;
    }

    public JSONObject messageReceived(JSONObject jsonObject) {
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

                WebElement element = driver.findElement(By.xpath("//input[name = login && title = Email Address]"));
                element.sendKeys("dinesh.gioe@gmail.com");
                System.out.println("Entered the user name");
                WebElement element = driver.findElement(By.xpath("//input[name = password && title = 'Password']"));
                element.sendKeys("Rivert@9866");
                System.out.println("Entered the Password");

                WebElement element = driver.findElement(By.xpath("//input[name = login_submit && title = 'Authorize']"));
                element.click();
                System.out.println("Clicked on Login and waiting");

                try {
                    Thread.sleep(5000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                    return false;
                }

                WebElement element = driver.findElement(By.xpath("//button[title = Grant access to Box && value = Grant access to Box]"));
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
