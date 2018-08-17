kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};

kony.apps.coe.ess.myTime.navigationTab = function()
{
  
};
kony.apps.coe.ess.myTime.navigationTab.prototype.loginaction = function()
{
  reUsableLoginForm.btnLogin.onClick = function(){frmTimesheetHistory.show();};
};
kony.apps.coe.ess.myTime.navigationTab.prototype.timesheetcreateactionTab = function()
{
   /* frmTimeSheetCreate.btnCancel.onClick = function(){
      kony.apps.coe.ess.myTime.TimesheetCreate.Search.contractAnimation();
      kony.apps.coe.ess.myTime.TimesheetCreate.resetUI();
      refreshAndShowTimesheetHomeForm();
    };*/
       frmTimeSheetCreateTab.btnClear.onClick = function(){
      //kony.apps.coe.ess.myTime.TimesheetCreate.SearchTab.contractAnimation();
      //kony.apps.coe.ess.myTime.TimesheetCreate.resetUI();
      frmTimeSheetCreateTab.flxTimeLine.removeAll();
      frmTimeSheetCreateTab.segProjectTaskSelection.setVisibility(true);
      frmTimeSheetCreateTab.segLeaveSelection.setVisibility(false);
      frmTimeSheetCreateTab.segTasksSearchResults.setVisibility(false);
      frmTimeSheetCreateTab.segDetailsSelectedTask.setVisibility(false);
      //frmTimeSheetCreateTab.flxSelectedTaskDeatilsType.setVisibility(false);
      frmTimeSheetCreateTab.flxSelectedTaskTimeTypeSelection.setVisibility(false);
      frmTimeSheetCreateTab.btnStep1.skin="sknBtn1c7393";
      frmTimeSheetCreateTab.btnStep1.text=kony.i18n.getLocalizedString("i18n.ess.frmTimeSheetCreate.Step1");
      frmTimeSheetCreateTab.lblSelectTask.text=kony.i18n.getLocalizedString("i18n.ess.frmTimeSheetCreate.selectaTask");
      frmTimeSheetCreateTab.btnStep2.skin="sknBtn1c7393Px36";
      frmTimeSheetCreateTab.txtBoxSearch.setVisibility(true);
      frmTimeSheetCreateTab.imgCancel.setVisibility(true);
      refreshAndShowTimesheetCreateTabForm();
    };
    //frmTimeSheetCreate.btnDone.onClick = function(){
     frmTimeSheetCreateTab.btnSave1.onClick = function(){
      if(kony.apps.coe.Reusable.TimelineCreationTab.isUnfixedTaskPresent === true){
        //kony.apps.coe.ess.myTime.TimesheetCreate.popups.showEmptyPopup();
      }else{
        kony.apps.coe.ess.myTime.TimesheetCreate.BackendTab.addTimeEntriesInDB();
        //kony.apps.coe.ess.myTime.TimesheetCreate.resetUI();
         kony.apps.coe.Reusable.TimelineCreationTab.isUnfixedTaskPresent = true;
      }
    };
};

kony.apps.coe.ess.myTime.navigationTab.prototype.apppreshowTab = function()
{
  this.timesheetcreateactionTab();
};

function apppreshowTab()
{
  var navigation  = new kony.apps.coe.ess.myTime.navigationTab();
  navigation.apppreshowTab();
}
kony.apps.coe.ess.myTime.navigationTab.prototype.onClickOfDeleteMenuTab = function() {
 /* frmTimeSheetCreate.segDeleteMenuPopup.onRowClick = function(){
  if(frmTimeSheetCreate.segDeleteMenuPopup.selectedRowIndex[1]===0) {
      kony.apps.coe.ess.myTime.navigationTab.prototype.deleteTask();
   }
  else if(frmTimeSheetCreate.segDeleteMenuPopup.selectedRowIndex[1]===1) {
     kony.apps.coe.ess.myTime.navigationTab.prototype.deleteTimeline();
   }
   };*/
};
kony.apps.coe.ess.myTime.navigationTab.prototype.deleteTask = function() {
 	 kony.apps.coe.ess.myTime.TimesheetCreate.popups.hideAllPopups();
  	 frmTimeSheetCreate.flxBlank.skin = "sknflxMob33333376O";
	 frmTimeSheetCreate.flxBlank.isVisible = true;
     frmTimeSheetCreate.flxpopuptask.isVisible = true; 
};
kony.apps.coe.ess.myTime.navigationTab.prototype.deleteTimeline = function() {
 	 kony.apps.coe.ess.myTime.TimesheetCreate.popups.hideAllPopups();
  	 frmTimeSheetCreate.flxBlank.skin = "sknflxMob33333376O";
	 frmTimeSheetCreate.flxBlank.isVisible = true;
     frmTimeSheetCreate.flxpopuptimeline.isVisible = true;
};