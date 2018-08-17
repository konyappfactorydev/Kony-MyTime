package test.mytime.forms;

import test.common.AppElement;
import test.mytime.MyTimeWidgetId;

public class FrmTimesheetHelp {
	
	public FrmTimesheetHelp() throws Exception{
		AppElement timesheetHelperFlex = new AppElement(MyTimeWidgetId.getWidgetId("frmTimesheetHelp_btnClose"));
	}
	
	public FrmTimesheetHome closeHelperLayer() throws Exception{
		AppElement closeButton = new AppElement(MyTimeWidgetId.getWidgetId("frmTimesheetHelp_btnClose"));
		closeButton.click();
		return new FrmTimesheetHome();
	}
}