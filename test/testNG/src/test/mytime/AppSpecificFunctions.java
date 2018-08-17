package test.mytime;

import test.common.Alerts;
import test.common.AppElement;
import test.common.Segment;
import test.common.SgConfiguration;
import test.mytime.forms.FrmTimesheetHome;
import test.mytime.forms.FrmTimesheetHistory;
import test.mytime.forms.FrmSearch;


public class AppSpecificFunctions {
	
	public static void handleSync() {
		 int retry = 15;
			try {
				while(retry>0 &&AppElement.waitForName("Syncing Data...")){
					Thread.sleep(5000);
					retry--;
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	}
	public static void handlingDevicePermissions() throws Exception {
		if(SgConfiguration.getInstance().isAndroid()) {
			if(AppElement.waitForEnable("com.android.packageinstaller:id/permission_allow_button",30)) 
			{
				Alerts.acceptAlert();
			}
	}
		else
		{
			if(AppElement.waitForName("Allow",30)) 
			{
				Alerts.acceptAlert();
			}
		}
	}
	
	public static boolean datacheckForSegement(String segId, String widgetId) throws Exception {
		if(!AppElement.waitForEnable(MyTimeWidgetId.getWidgetId(segId)))
		{
			return false;
		}
		Segment segObj = new Segment(MyTimeWidgetId.getWidgetId(segId),MyTimeWidgetId.getWidgetId(widgetId));
		int length = segObj.getSegmentSizeVisibleOnScreen();
		if(length == 0)
			return false;
		else
		    return true;
	} 
	
	
	public static String viewGroup() {
		return "android.view.ViewGroup";
	}
	
	public static FrmTimesheetHome navigateToFrmTimesheetHome() throws Exception {
		AppElement flxHome = new AppElement(MyTimeWidgetId.getWidgetId("tempFooterNavigation_imgTimesheetActiveFooter"));
		flxHome.click();
		return new FrmTimesheetHome();
	}
	public static FrmTimesheetHistory navigateToFrmTimesheetHistory() throws Exception {
		AppElement flxHome = new AppElement(MyTimeWidgetId.getWidgetId("tempFooterNavigation_imgTimeSheetHistoryFooter"));
		flxHome.click();
		return new FrmTimesheetHistory();
	}
	public static FrmSearch navigateToFrmTimesheetSearch() throws Exception {
		AppElement flxHome = new AppElement(MyTimeWidgetId.getWidgetId("tempFooterNavigation_imgSearchFooter"));
		flxHome.click();
		return new FrmSearch();
	}
}
