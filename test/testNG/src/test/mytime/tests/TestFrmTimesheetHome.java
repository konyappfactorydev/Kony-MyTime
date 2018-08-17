package test.mytime.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import test.mytime.MyTimeBaseTest;
import test.mytime.AppSpecificFunctions;
import test.mytime.forms.FrmSearch;
import test.mytime.forms.FrmTimesheetHistory;
import test.mytime.forms.FrmTimesheetHome;

public class TestFrmTimesheetHome extends MyTimeBaseTest{
	
	@Test
	public void testNavigationFromFooter() throws Exception{
		FrmTimesheetHome homeObj;
		FrmTimesheetHistory historyObj;
		FrmSearch searchObj; 
		historyObj = AppSpecificFunctions.navigateToFrmTimesheetHistory();
		Assert.assertTrue(historyObj.isFrmHistoryVisible());
		homeObj = AppSpecificFunctions.navigateToFrmTimesheetHome();
		Assert.assertTrue(homeObj.isFrmHomeVisible());
		searchObj = AppSpecificFunctions.navigateToFrmTimesheetSearch();
		Assert.assertTrue(searchObj.isFrmSearchVisible());
		homeObj = AppSpecificFunctions.navigateToFrmTimesheetHome();
		Assert.assertTrue(homeObj.isFrmHomeVisible());
	}
}
