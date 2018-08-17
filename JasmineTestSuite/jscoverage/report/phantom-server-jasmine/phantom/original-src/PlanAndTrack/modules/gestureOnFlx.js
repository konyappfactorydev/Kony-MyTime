function myTapPS(widgetRef, gestureInfo) {
    if (!frmListKA.calPlannedStartDateKA.isVisible)
      {
        frmListKA.calPlannedStartDateKA.setVisibility(true);
        frmListKA.flxScrollBodyKA.height="100%";
		if(frmListKA.btnPlannedStartDateClearKA.isVisible)  
			populateCalendarComponents("calPlannedStartDateKA",frmListKA.lblPlannedStartDateValKA.text.trim());
		else
			populateCalendarComponents("calPlannedStartDateKA");
      }
        
    else
      {
        frmListKA.flxScrollBodyKA.height="68.59%";
        frmListKA.calPlannedStartDateKA.setVisibility(false);
      }
        
    frmListKA.calActualStartDateKA.setVisibility(false);
    frmListKA.calPlannedCompleteDateKA.setVisibility(false);
    frmListKA.calActualCompleteDateKA.setVisibility(false);
    frmListKA.lblLineVIewsKA.setVisibility(true);
    frmListKA.flxViewBlockBottomKA.height = "7%";
   


}

function myTapAS(widgetRef, gestureInfo) {
    frmListKA.calPlannedStartDateKA.setVisibility(false);
    if (!frmListKA.calActualStartDateKA.isVisible)
      {
        frmListKA.calActualStartDateKA.setVisibility(true);
        frmListKA.flxScrollBodyKA.height="100%";
		if(frmListKA.btnActualStartDateClearKA.isVisible)
			populateCalendarComponents("calActualStartDateKA",frmListKA.lblActualStartDateValKA.text.trim());
		else
			populateCalendarComponents("calActualStartDateKA");
      }
        
    else
      {
        frmListKA.flxScrollBodyKA.height="68.59%";
        frmListKA.calActualStartDateKA.setVisibility(false);
      }
        
    frmListKA.calPlannedCompleteDateKA.setVisibility(false);
    frmListKA.calActualCompleteDateKA.setVisibility(false);
    if (frmListKA.calActualStartDateKA.isVisible)
        frmListKA.lblLine2KA.setVisibility(true);
    frmListKA.flxViewBlockBottomKA.height = "7%";

}

function myTapPC(widgetRef, gestureInfo) {
    frmListKA.calPlannedStartDateKA.setVisibility(false);
    frmListKA.calActualStartDateKA.setVisibility(false);
    if (!frmListKA.calPlannedCompleteDateKA.isVisible)
      {
        frmListKA.calPlannedCompleteDateKA.setVisibility(true);
         frmListKA.flxScrollBodyKA.height="100%";
		 if( frmListKA.btnPlannedCompleteDateClearKA.isVisible)
			populateCalendarComponents("calPlannedCompleteDateKA",frmListKA.lblPlannedCompleteDateValKA.text.trim());
		else
			populateCalendarComponents("calPlannedCompleteDateKA");
      }
        
    else
      {
        frmListKA.flxScrollBodyKA.height="68.59%";
        frmListKA.calPlannedCompleteDateKA.setVisibility(false);
      }
        
    frmListKA.calActualCompleteDateKA.setVisibility(false);
    if (frmListKA.calPlannedCompleteDateKA.isVisible)
        frmListKA.lblLine3KA.setVisibility(true);
  //  if(frmListKA.flxScrollBodyKA.height!="100%")
  //		frmListKA.flxScrollBodyKA.height="100%";
 // 	else
   //   frmListKA.flxScrollBodyKA.height="68.59%";
    frmListKA.flxViewBlockBottomKA.height = "7%";
}

function myTapAC(widgetRef, gestureInfo) {
    frmListKA.calPlannedStartDateKA.setVisibility(false);
    frmListKA.calActualStartDateKA.setVisibility(false);
    frmListKA.calPlannedCompleteDateKA.setVisibility(false);
    if (!frmListKA.calActualCompleteDateKA.isVisible)
      {
        frmListKA.calActualCompleteDateKA.setVisibility(true);
         frmListKA.flxScrollBodyKA.height="100%";
		  if(frmListKA.btnActualCompleteDateClearKA.isVisible)
			populateCalendarComponents("calActualCompleteDateKA",frmListKA.lblActualCompleteDateValKA.text.trim());
		else
			populateCalendarComponents("calActualCompleteDateKA");
      }
        
    else
      {
        frmListKA.calActualCompleteDateKA.setVisibility(false);
        frmListKA.flxScrollBodyKA.height="68.59%";
      }
        
    if (frmListKA.calActualCompleteDateKA.isVisible)
        frmListKA.lblLine13KA.setVisibility(true);
  //  if(frmListKA.flxScrollBodyKA.height!="100%")
  //		frmListKA.flxScrollBodyKA.height="100%";
 // 	else
  //    frmListKA.flxScrollBodyKA.height="68.59%";
    frmListKA.flxViewBlockBottomKA.height = "7%";
}

function myTapLblStatus() {
    frmListKA.flxOnClickFlxViewsKA.setVisibility(false);
    frmListKA.flxMainStatusKA.setVisibility(true);
    revertstatusArr = JSON.parse(JSON.stringify(statusArr));
    revertstatusData = JSON.parse(JSON.stringify(frmListKA.segStatusKA.data));
    frmListKA.flxScrollBodyKA.height="68.59%";
  	if (frmListKA.flxScrollSelectStatusKA.widgets().length != 0) {
			frmListKA.flxScrollSegKA.top="0dp";
			frmListKA.flxScrollSegKA.height="300dp";
        }
  	frmListKA.calPlannedStartDateKA.setVisibility(false);
    frmListKA.calActualStartDateKA.setVisibility(false);
    frmListKA.calPlannedCompleteDateKA.setVisibility(false);
    frmListKA.calActualCompleteDateKA.setVisibility(false);
  	kony.BPT.currentFilterView="Status";
  // if (!frmListKA.flxScrollSelectStatusKA.widgets().length) flxScrollAnimation("flxScrollSegKA", "0dp", "-57dp", "250dp");
}

function myTapBtnStatus() {   
    frmListKA.flxOnClickFlxViewsKA.setVisibility(true);
    frmListKA.flxMainStatusKA.setVisibility(false);
    frmListKA.flxScrollBodyKA.height="68.59%";
}

function myTapLblPriority() {
    frmListKA.flxOnClickFlxViewsKA.setVisibility(false);
    frmListKA.flxPriorityMainKA.setVisibility(true);
    revertpriorityArr = JSON.parse(JSON.stringify(priorityArr));
    revertpriorityData = JSON.parse(JSON.stringify(frmListKA.segPriorityKA.data));
    frmListKA.flxScrollBodyKA.height="68.59%";
  	frmListKA.calPlannedStartDateKA.setVisibility(false);
    frmListKA.calActualStartDateKA.setVisibility(false);
    frmListKA.calPlannedCompleteDateKA.setVisibility(false);
    frmListKA.calActualCompleteDateKA.setVisibility(false);
  	kony.BPT.currentFilterView="Priority";
}

function myTapBtnPriority() {    
    frmListKA.flxOnClickFlxViewsKA.setVisibility(false);
    frmListKA.flxPriorityMainKA.setVisibility(true);
    frmListKA.flxScrollBodyKA.height="68.59%";
}

function myTaplblTechnician() {
    reverttechArr = JSON.parse(JSON.stringify(techArr));
    reverttechLastNameList = JSON.parse(JSON.stringify(techLastNameList));
    reverttechFirstNameList = JSON.parse(JSON.stringify(techFirstNameList));
    var tempData = JSON.parse(JSON.stringify(kony.BPT.TechnicianData));
	var technicianData = [];
	var techSectionHeader = [];
	if(tempData && tempData[0] && tempData[0].length > 1){
		techSectionHeader =  tempData[0][0];
		technicianData = tempData[0][1];
	}
	var index = 0;
	if(recentAppliedTechnician && recentAppliedTechnician.length > 0){	
		var dataObj = {};
		dataObj["sectionHeader"] = kony.i18n.getLocalizedString("i18n.BPT.frmListKA.lblRecentKA.valueKA");
		tempData.push(dataObj);
		tempData.push(recentAppliedTechnician);	
		index = 1;
		tempData[index] = new Array();
		tempData[index][0] = techSectionHeader;
	}
    if (techArr.length > 0) {
        for (var i = 0; i < technicianData.length; i++) {
            if (techArr.indexOf(technicianData[i]["FirstName"]) > -1)
                technicianData[i]["btnTmpUncheckKA"].skin = "sknTickMarkFilterKA";

        }
    }
	tempData[index][1] = technicianData;
    frmListKA.segTechnicianNameKA.setData(tempData);
    kony.BPT.sortBy.key = 1;
    kony.BPT.sortType = "FirstName";
    performSortOnMasterDataForSegTechnacian(frmListKA, "segTechnicianNameKA");
	reverttechnicianData = frmListKA.segTechnicianNameKA.data ;
    frmListKA.flxOnClickFlxViewsKA.setVisibility(false);
    frmListKA.flxTechnicianSearchKA.setVisibility(true);
    frmListKA.tbxTechnicianSearchKA.text = "";
    frmListKA.flxScrollBodyKA.height = "68.59%";
    frmListKA.btnTechnicianArrowKA.skin = "sknBtnAtoZFilterKA";
    frmListKA.calPlannedStartDateKA.setVisibility(false);
    frmListKA.calActualStartDateKA.setVisibility(false);
    frmListKA.calPlannedCompleteDateKA.setVisibility(false);
    frmListKA.calActualCompleteDateKA.setVisibility(false);
  	frmListKA.btnSearchTechClearKA.setVisibility(false);
}


function myTapBtnTechnician() {   
    frmListKA.flxOnClickFlxViewsKA.setVisibility(false);
    frmListKA.flxTechnicianSearchKA.setVisibility(true); 
    frmListKA.flxScrollBodyKA.height="68.59%";
}

function clearForClandarWidgets(labelInstance1, labelInstance2, btnInstance, CalendarInstance) {
    frmListKA[labelInstance1].text = "";
    frmListKA[labelInstance2].top = "35%";
    frmListKA[btnInstance].setVisibility(false);
    frmListKA[CalendarInstance].setVisibility(false);
}
function populateCalendarComponents(calendarWidget,data)
{
	if(!data)
		data=moment().format("DD/MM/YYYY");
	data=data.split("/");
	frmListKA[calendarWidget].dateComponents=data;
	
}