package test.mytime.forms;

import test.common.AppElement;
import test.common.SgConfiguration;
import test.mytime.AppSpecificFunctions;
import test.mytime.MyTimeWidgetId;

public class FrmLogin {

	public FrmLogin() throws Exception {
		AppElement frmLoginTbUsername = new AppElement(MyTimeWidgetId.getWidgetId("frmLogin_tbUsername"));
	}

	public void typeUserName(String uName) throws Exception {
		AppElement tbUsername = new AppElement(MyTimeWidgetId.getWidgetId("frmLogin_tbUsername"));
		tbUsername.type(uName);
	}

	public void typePassword(String password) throws Exception {
		AppElement tbPassword = new AppElement(MyTimeWidgetId.getWidgetId("frmLogin_tbPassword"));
		tbPassword.type(password);
	}

	public void clickReConfigure() throws Exception {
		AppElement lblReconfigure = new AppElement(MyTimeWidgetId.getWidgetId("frmLogin_flxReconfigure"));
		lblReconfigure.click();
	}

	public void clickLogin() throws Exception {
		AppElement btnLogin = new AppElement(MyTimeWidgetId.getWidgetId("frmLogin_btnLogin"));
		btnLogin.click();
	}

	public void clickEnableTouchId() throws Exception {
		AppElement btnEnableTouchId = new AppElement(MyTimeWidgetId.getWidgetId("frmLogin_btnEnable"));
		btnEnableTouchId.click();
	}

	public FrmTimesheetHelp doLogin(String uName, String password) throws Exception {
		typeUserName(uName);
		typePassword(password);
		clickLogin();
		if (SgConfiguration.getInstance().isIOS()) {
			try {
				if (AppElement.waitForEnable(MyTimeWidgetId.getWidgetId("frmLogin_btnEnable"),70)) {
					clickEnableTouchId();
				}
			} catch (Exception e) {
				System.out.println("No popup appread..");
			}
			
		}
		AppSpecificFunctions.handlingDevicePermissions();
		AppSpecificFunctions.handleSync();
		return new FrmTimesheetHelp();
	}
	
	public boolean isFrmLoginVisible() throws Exception {
		if(AppElement.isElementVisible("id",MyTimeWidgetId.getWidgetId("frmLogin_tbUsername")))
			return true;
		else
			return false;
	}

}
