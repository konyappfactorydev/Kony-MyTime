package com.temenos.user.wsclient;

import java.util.HashMap;
import java.util.Map;
import org.json.JSONObject;
import org.openqa.selenium.WebDriver;

public interface CrossAppClientInterface {
    public JSONObject onMessage(JSONObject jsonObject);
    public void onInitWebDriver(WebDriver webDriver);
    default Map<String, String> getDriverCapabilities() {
        return new HashMap<String, String>();
    }
}
