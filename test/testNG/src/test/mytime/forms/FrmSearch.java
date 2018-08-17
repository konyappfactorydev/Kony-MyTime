package test.mytime.forms;

import test.common.AppElement;
import test.mytime.MyTimeWidgetId;

public class FrmSearch {
	
	public FrmSearch() throws Exception{
		AppElement frmSearchHamImg = new AppElement(MyTimeWidgetId.getWidgetId("frmSearchMyTime_imgHamburgerButton"));
	}

	public boolean isFrmSearchVisible() throws Exception {
		if(AppElement.isElementVisible("id",MyTimeWidgetId.getWidgetId("frmSearchMyTime_imgHamburgerButton")))
			return true;
		else
			return false;
	}
}