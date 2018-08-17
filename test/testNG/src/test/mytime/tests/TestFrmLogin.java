package test.mytime.tests;

import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import test.common.AppElement;
import test.mytime.AppSpecificFunctions;
import test.mytime.MyTimeBaseTest;
import test.mytime.MyTimeWidgetId;
import test.mytime.forms.FrmLogin;



public class TestFrmLogin extends MyTimeBaseTest{
	
	
	@BeforeMethod
	public void setupBeforeTest() throws Exception{
		AppElement ele = null;
		try {
			 ele = new AppElement(MyTimeWidgetId.getWidgetId("frmLogin_tbUsername"));
		} catch (Exception e) {
			doLogout();
		}
	}
	
	@Test
	public void testAppLoginWithDefaultSetup() throws Exception{
		AppSpecificFunctions.handlingDevicePermissions();
		FrmLogin frmLogin = new FrmLogin();
	    frmLogin.doLogin(sgconfig.getKeyValue("username"), sgconfig.getKeyValue("password"));
		Assert.assertTrue(AppElement.waitForEnable(MyTimeWidgetId.getWidgetId("frmTimesheetHelp_flxHelperImages")));
	}
	
}
