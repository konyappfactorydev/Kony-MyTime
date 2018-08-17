package test.mytime.tests;

import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import test.common.AppElement;
import test.mytime.MyTimeBaseTest;
import test.mytime.MyTimeWidgetId;
import test.mytime.forms.FrmTimesheetHome;
import test.mytime.forms.FrmTimesheetHelp;

public class TestFrmHelp extends MyTimeBaseTest{
	
	@BeforeMethod
	public void setupBeforeTest() throws Exception{
		AppElement ele = null;
		try {
			ele = new AppElement(MyTimeWidgetId.getWidgetId("frmTimesheetHelp_flxHelperImages"));
		} catch (Exception e) {
			doLogout();
		}
	}
	
	@Test
	public void testCloseHelperLayer() throws Exception{
		FrmTimesheetHelp frmTimesheetHelpObj = new FrmTimesheetHelp();
		FrmTimesheetHome frmTimesheetHomeObj = frmTimesheetHelpObj.closeHelperLayer();
		Assert.assertTrue(frmTimesheetHomeObj.isFrmHomeVisible());
	}
}
