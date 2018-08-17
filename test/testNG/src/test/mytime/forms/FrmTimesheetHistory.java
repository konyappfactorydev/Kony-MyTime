package test.mytime.forms;

import test.common.AppElement;
import test.mytime.MyTimeWidgetId;

public class FrmTimesheetHistory {
	
	public FrmTimesheetHistory() throws Exception{
		AppElement timesheetHistoryHamButton = new AppElement(MyTimeWidgetId.getWidgetId("frmTimesheetHistory_btnTimesheetHistoryHamburgerMenu"));
	}
	
	public boolean isFrmHistoryVisible() throws Exception {
		if(AppElement.isElementVisible("id",MyTimeWidgetId.getWidgetId("frmTimesheetHistory_btnTimesheetHistoryHamburgerMenu")))
			return true;
		else
			return false;
	}
}