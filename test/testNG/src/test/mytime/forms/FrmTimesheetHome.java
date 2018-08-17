package test.mytime.forms;

import test.common.AppElement;
import test.mytime.MyTimeWidgetId;

public class FrmTimesheetHome {
	
	public FrmTimesheetHome() throws Exception{
		AppElement timesheetHomeHamburgerButton = new AppElement(MyTimeWidgetId.getWidgetId("frmTimesheetHome_imgHamburger"));
	}
	
	
	public boolean isFrmHomeVisible() throws Exception {
		if(AppElement.isElementVisible("id",MyTimeWidgetId.getWidgetId("frmTimesheetHome_imgHamburger")))
			return true;
		else
			return false;
	}
}