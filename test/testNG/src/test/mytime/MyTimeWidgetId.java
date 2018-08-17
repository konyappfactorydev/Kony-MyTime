package test.mytime;

import java.io.IOException;

import test.common.WidgetID;

public class MyTimeWidgetId {
	static WidgetID widgetIds;
	
	public MyTimeWidgetId() throws IOException{
		widgetIds = new WidgetID("widgetid.properties");
	}
	
	public static String getWidgetId(String key) throws Exception{
		if(widgetIds==null)
			widgetIds = new WidgetID("widgetid.properties");
		return widgetIds.getWidgetId(key);
	}
}
