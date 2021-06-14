package com.kony.jasUserCode;

import java.util.Map;

import org.json.JSONObject;
import org.openqa.selenium.chrome.ChromeDriver;

public interface SeleniumInteraction {
    JSONObject messageReceived(JSONObject jsonObject);
    public void initDriver(ChromeDriver chromeDriver);
    public Map<String, String> userCapabilities();
}
