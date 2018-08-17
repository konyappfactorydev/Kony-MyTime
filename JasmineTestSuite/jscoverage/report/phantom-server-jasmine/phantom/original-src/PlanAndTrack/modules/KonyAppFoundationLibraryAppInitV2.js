kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.log = kony.sdk.mvvm.log || {};
kony.sdk.mvvm.util = kony.sdk.mvvm.util || {};
kony.sdk.mvvm.constants = kony.sdk.mvvm.constants || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.BPT=kony.BPT||{};
kony.BPT.cacheData={};
kony.sdk.mvvm.appInit = function(appContext) {
    try {
      	kony.sdk.mvvm.initApplicationForms(appContext);
      	var username = frmLoginKA.tbxUserIDKA.text;
    	fetchUserDetails(username);
      	if(LocalAuthController.getInstance().isTouchIDSupported() && kony.store.getItem("FIRSTLOGIN") == null){
        	kony.store.setItem("FIRSTLOGIN",false);
          	kony.application.dismissLoadingScreen();
          	if(kony.BPT.userDetails){
              frmFingerPrintLogin.lblUserNameValKA.text = kony.BPT.userDetails;
            }
        	frmFingerPrintLoginKA.show();
        }
      	else{
			showFormOrderList();
        }
    } catch (err) {
		kony.application.dismissLoadingScreen();
        kony.sdk.mvvm.log.error("Error in app load : " + err);
    }
};

function showFormOrderList() {
    getQueryForSegment("Today");
	frmListKA.lblCreatedKA.text = kony.i18n.getLocalizedString("i18n.BPT.views.todayKA");
  	setFiltersVisibleForView();
  	kony.BPT.isLogin=1;
  	kony.BPT.manualFilterQuery="";
  	var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    var controller = INSTANCE.getFormController("frmListKA");
    var formModel=controller.getFormModel();
    formModel.setViewAttributeByProperty("segViewsKA","selectedRowIndex",[0,0]);
    var navObject = new kony.sdk.mvvm.NavigationObject();
    controller.loadDataAndShowForm(navObject);
   
};

function fetchUserDetails(username) {
	var options = {"access":"online"};
	objectService = kony.sdk.getCurrentInstance().getObjectService("BPTService",options);
	var headers = {}; 
	var dataObject = new kony.sdk.dto.DataObject("SystemUser");
	var url = "&$filter=id eq " + username; 
	dataObject.setOdataUrl(url);
	var options = {"dataObject":dataObject, "headers":headers};
	objectService.fetch(options, listsuccess,listerror);
	function listsuccess(res) 
	{
		kony.BPT.userDetails=res["records"];
	}
	function listerror(err) {
	}
}