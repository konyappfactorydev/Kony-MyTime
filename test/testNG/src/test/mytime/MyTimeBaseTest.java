package test.mytime;

import java.lang.reflect.Method;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Optional;
import org.testng.annotations.Parameters;
import test.common.AppBaseTest;
import test.common.AppElement;
import test.common.SgConfiguration;
import test.mytime.forms.FrmLogin;
import test.mytime.MyTimeWidgetId;

public class MyTimeBaseTest extends AppBaseTest{
	SgConfiguration sg = SgConfiguration.getInstance();
	@BeforeClass(alwaysRun = true)
	@Parameters({ "appNamePerClass", "packageNamePerClass",
		"activityNamePerClass", "bundleId" })
	
	public void beforeClass(
		@Optional("MyTime") String appNamePerClass,
		@Optional("com.kony.MyTime") String packageNamePerClass,
		@Optional(".MyTime") String activityNamePerClass,
		@Optional("com.kony.MyTime") String bundleId) throws Exception {
	
		super.beforeClass(sg.getKeyValue("appname"), sg.getKeyValue("apppackage"), 
		sg.getKeyValue("launchactivity"),sg.getKeyValue("bundle_id"));
	
	
	}

	/* (non-Javadoc)
	 * @see test.common.AppBaseTest#beforeSuite()
	 */
	@BeforeSuite(alwaysRun = true)
	public void beforeSuite() throws Exception {
		super.beforeSuite();
		
	}
	
	@BeforeMethod(alwaysRun = true)
	public void beforeMethod(Object[] inputParamsOfTestMethod, Method method) throws Exception {
	
		super.beforeMethod(method);
		//AppSpecificFunctions.handleSync();
	}

	 @AfterMethod(alwaysRun = true)
	    public void afterMethod(ITestResult result) throws Exception {
	          super.afterMethod(result);          
	          if ((result.getStatus() == ITestResult.FAILURE || result.getStatus() == ITestResult.SKIP)&& !AppBaseTest.skipAllTestsNow ){         
	                String methodName=result.getMethod().getMethodName();
	                if(methodName.equalsIgnoreCase("testAppLoginWithDefaultSetup") || methodName.equalsIgnoreCase("testAppLoginWithManualSetup"))
	                {
	                      AppBaseTest.skipAllTestsNow=true;
	                      return;
	                }                 
	                doLogout();
	                if(!doLogin())
	                      AppBaseTest.skipAllTestsNow=true;
	          }
	    }
	
	 @AfterSuite(alwaysRun = true)
	    public void afterSuite() throws Exception {			
			doLogout();
			super.afterSuite();
	    }
	 
	 public boolean doLogin() throws Exception{
	        FrmLogin frmLogin =  new FrmLogin();
	        frmLogin.typeUserName(sgconfig.getKeyValue("username"));
	        frmLogin.typePassword(sgconfig.getKeyValue("password"));
			frmLogin.clickLogin();
			if (SgConfiguration.getInstance().isIOS()) {
				try {
					if (AppElement.waitForEnable(MyTimeWidgetId.getWidgetId("frmLogin_btnEnable"),70)) {
						frmLogin.clickEnableTouchId();
					}
				} catch (Exception e) {
					System.out.println("No popup appread..");
				}
				
			}
			AppSpecificFunctions.handlingDevicePermissions();
			AppSpecificFunctions.handleSync();
	        return AppElement.waitForEnable(MyTimeWidgetId.getWidgetId("frmTimesheetHelp_flxHelperImages"));
	   
	  }
	 
	 public void doLogout() throws Exception{
		 try {
		 AppSpecificFunctions.navigateToFrmTimesheetHome();
		 }catch (Exception e) {
			 relaunchApp();					
		}
		 if(AppElement.isElementVisible("id",MyTimeWidgetId.getWidgetId("frmTimesheetHome_imgHamburger") )) {
		 AppElement hambimg = new AppElement(MyTimeWidgetId.getWidgetId("frmTimesheetHome_imgHamburger"));
		 hambimg.click();
	     AppElement btnLogout = new AppElement(MyTimeWidgetId.getWidgetId("frmHamburger_imgLogout"));
		 btnLogout.click();
		 }
		}
			

}
