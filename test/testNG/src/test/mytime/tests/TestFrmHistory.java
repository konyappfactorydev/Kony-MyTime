package test.mytime.tests;

import org.testng.Assert;
import org.testng.annotations.Test;

import test.mytime.AppSpecificFunctions;
import test.mytime.MyTimeBaseTest;
import test.mytime.forms.FrmSearch;
import test.mytime.forms.FrmTimesheetHistory;
import test.mytime.forms.FrmTimesheetHome;

public class TestFrmHistory extends MyTimeBaseTest{
	
	@Test
	public void testNavigationFromFooter() throws Exception{
		FrmTimesheetHome homeObj;
		FrmTimesheetHistory historyObj;
		FrmSearch searchObj; 
		homeObj = AppSpecificFunctions.navigateToFrmTimesheetHome();
		Assert.assertTrue(homeObj.isFrmHomeVisible());
		historyObj = AppSpecificFunctions.navigateToFrmTimesheetHistory();
		Assert.assertTrue(historyObj.isFrmHistoryVisible());
		searchObj = AppSpecificFunctions.navigateToFrmTimesheetSearch();
		Assert.assertTrue(searchObj.isFrmSearchVisible());
		historyObj = AppSpecificFunctions.navigateToFrmTimesheetHistory();
		Assert.assertTrue(historyObj.isFrmHistoryVisible());
	}
}
