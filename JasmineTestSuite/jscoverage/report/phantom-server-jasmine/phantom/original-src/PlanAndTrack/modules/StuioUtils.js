kony = kony || {};
kony.BPT = kony.BPT || {};
kony.BPT.Finalview = kony.BPT.Finalview || {};
kony.BPT.minDate = kony.BPT.minDate || "";
kony.BPT.maxDate = kony.BPT.maxDate || "";
kony.BPT.currentView = kony.BPT.currentView || "Today";
kony.BPT.currentTimeStamp = kony.BPT.currentTimeStamp || {};
kony.BPT.FinalQuery = kony.BPT.FinalQuery || "";
kony.BPT.todayDate = kony.BPT.todayDate || "";
kony.BPT.searchConfig = ["SearchDescription", "Code", "SystemUserLastName", "SystemUserFirstName", "SearchAssetName"];
//kony.BPT.GroupExpand = "&$expand=WorkOrderContact,Address,WorkOrderPriority";
kony.BPT.GroupExpand = "";
kony.BPT.manualFilterQuery = "";
kony.BPT.statusList = [];
kony.BPT.fromClear = false;
kony.BPT.priorityList = [];
kony.BPT.remoteTimeZone = "Etc/GMT";
kony.BPT.isFirstBatch = true;
kony.BPT.previousViewIndex=[0,0];
kony.BPT.saveDataForFutureGrouping = [];
kony.BPT.StatusCodes = {
    "Pending": "E0001",
    "Scheduled": "E0002",
    "On Route": "E0003",
    "Started": "E0004",
    "Paused": "E0005",
    "Completed": "E0006"
};

kony.BPT.PriorityCodes = {
    "Critical": 1,
    "Low": 4,
    "High": 2,
    "Medium": 3
};
kony.BPT.VersionNumber = "2.0.1";

function refreshDynamicWidgetContent(dynamicLbl) {
    kony.BPT.propertiesOfWidgets = [{
        "skin": "sknEEE7DFRoundedBorderFF5D6EKA",
        "widgetType": "FlexContainer"
    }, {
        "skin": "sknLblFF5D6EClanProNews30KA",
        "widgetType": "Label",
        "text": dynamicLbl
    }, {
        "skin": "sknBtnPatchKA",
        "widgetType": "Button",
        "isVisible": false
    }];



}

function getQueryForSegment(currentView, filters) {
    kony.BPT.currentView = currentView;
    var ListController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController("frmListKA");
    var FormModel = ListController.getFormModel();
    var tempDateObj = new Date();
    kony.BPT.currentTimeStamp = convertTimeZone(moment(tempDateObj).toString(), null, kony.BPT.remoteTimeZone, 'YYYYMMDDHHmmss');
    kony.BPT.todayDate = convertTimeZone(moment(tempDateObj).toString(), null, kony.BPT.remoteTimeZone, 'YYYYMMDD');
    kony.BPT.minDate = convertTimeZone(moment().format("YYYY-MM-DD"), null, kony.BPT.remoteTimeZone, "YYYYMMDDHHmmss");
    kony.BPT.maxDate = moment(convertTimeZone(moment().format("YYYY-MM-DD"), null, kony.BPT.remoteTimeZone, "YYYY-MM-DD HH:mm:ss")).add(24, "hours");
    kony.BPT.maxDate = moment(kony.BPT.maxDate).subtract(1, "seconds").format("YYYYMMDDHHmmss");
    kony.BPT.Finalview = {
        "Today": {
            "filter": " WHERE PlannedStartDate > "+ kony.BPT.minDate + " AND PlannedStartDate < " + kony.BPT.maxDate,
            "groupby": " ",
            "sort": " ORDER BY PlannedStartDate",			
        },
        "High priority": {
            "filter": " WHERE Priority_id=2",
            "groupby": " ORDER BY PlannedStartDate",
            "sort": ""
        },
        "Expired": {		
            "filter": "	WHERE WorkOrder.Status_id in ('E0001','E0002') and PlannedEndDate <"+ kony.BPT.currentTimeStamp,
            "groupby": " ",
            "sort": "ORDER BY PlannedEndDate"
        },
        "Late": {
            "filter": "WHERE WorkOrder.Status_id = 'E0002' and PlannedStartDate<"+kony.BPT.currentTimeStamp+" and PlannedEndDate <"+ kony.BPT.currentTimeStamp,
            "groupby": " ",
            "sort": "ORDER BY PlannedStartDate"
        },
        "Delayed": {
            "filter": "WHERE WorkOrder.Status_id in ('E0003','E0004','E0005') and PlannedEndDate < "+ kony.BPT.currentTimeStamp ,
            "groupby": " ",
            "sort": "ORDER BY PlannedEndDate"
        },
        "On-Time": {
            "filter": "WHERE WorkOrder.Status_id in ('E0003','E0004','E0005') and PlannedEndDate >"+kony.BPT.currentTimeStamp,
            "groupby": " ",
            "sort": "ORDER BY PlannedEndDate"
        },
        "By Technician": {
            "filter": "",
            "groupby": "ORDER BY SystemUserFirstName,SystemUserLastName",
            "sort": ",PlannedStartDate"
        },
        "In Progress": {
            "filter": "WHERE WorkOrder.Status_id in ('E0003','E0004','E0005')",
            "groupby": "ORDER BY SystemUserFirstName,SystemUserLastName",
            "sort": ",PlannedEndDate"
        },
        "Available": {
            "filter":  "WHERE WorkOrder.Status_id = 'E0001' ",
            "groupby": "ORDER BY PlannedEndDate",
            "sort": " "
        }
    }
    var filterQuery = filters ? filters : kony.BPT.Finalview[kony.BPT.currentView].filter;
	kony.BPT.ManualSortQuery=kony.BPT.Finalview[kony.BPT.currentView].groupby + kony.BPT.Finalview[kony.BPT.currentView].sort ;
    kony.BPT.FinalQuery =kony.BPT.viewQuery+filterQuery +kony.BPT.ManualSortQuery;
	frmListKA.btnFlxClearKA.setVisibility(false);
}

function ApplyManualSortAndFilter(ManualSort) {
    //frmListKA.segViewsKA.selectedRowIndex=null;
    kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Data");
    var GroupInfo = getGroupingRelatedInfo();
    var Orderby = "";
    var isGroup = "";
    if (!GroupInfo.useCustomGrouping) {
        Orderby = "&$orderby=";
        isGroup = "";
    } else {
        Orderby = "";
        isGroup = ",";
    }
    var finalFilterQuery = kony.BPT.manualFilterQuery ? ((kony.BPT.manualFilterQuery == " ") ? kony.BPT.manualFilterQuery.trim() : kony.BPT.manualFilterQuery) : kony.BPT.Finalview[kony.BPT.currentView]["filter"];    
    kony.BPT.Finalview[kony.BPT.currentView]["sort"] = Orderby + ManualSort.SortBy + " " + ManualSort.AscDesc;
	kony.BPT.ManualSortQuery=kony.BPT.Finalview[kony.BPT.currentView]["sort"];
    if (kony.BPT.Finalview[kony.BPT.currentView].groupby.indexOf(ManualSort.SortBy) > -1) {
		kony.BPT.ManualSortQuery="&$orderby=" + kony.BPT.Finalview[kony.BPT.currentView]["sort"] ;
        kony.BPT.FinalQuery = finalFilterQuery +kony.BPT.ManualSortQuery + kony.BPT.GroupExpand;
    } else {
		kony.BPT.ManualSortQuery=kony.BPT.Finalview[kony.BPT.currentView].groupby + "" + isGroup + kony.BPT.Finalview[kony.BPT.currentView]["sort"] ;
        kony.BPT.FinalQuery = finalFilterQuery + kony.BPT.ManualSortQuery+ kony.BPT.GroupExpand;
    }
    var ListController = kony.sdk.mvvm.KonyApplicationContext.getAppInstance().getFormController(kony.application.getCurrentForm().id);
    var FormModel = ListController.getFormModel();
    FormModel.setViewAttributeByProperty("segViewsKA", "selectedRowIndex", null);
  	 kony.BPT.previousViewIndex=[0,null];
    FormModel.setViewAttributeByProperty("lblCreatedKA", "text", "Select View");
	    ListController.performAction("GlobalSearch",[(frmListKA.tbxSearchKA.text)?(frmListKA.tbxSearchKA.text.toUpperCase()):null]);
}

function getGroupingRelatedInfo() {
    /* Enables or diables grouping related custom Info based on the current view applied */
    var frmConfig = new kony.sdk.mvvm.ConfigClass(frmListKAConfig);
    var customInfo = frmConfig.getCustomInfo("segListKA");
    if (kony.BPT.currentView === "High priority" || kony.BPT.currentView === "Available") {
        customInfo["useCustomGrouping"] = true;
        customInfo["groupBy"] = "PlannedStartDate";
        customInfo[""] = "";
    } else if (kony.BPT.currentView === "In Progress" || kony.BPT.currentView === "By Technician") {
        customInfo["useCustomGrouping"] = true;
        customInfo["groupBy"] = "Technician";
        customInfo[""] = "";
    } else {
        customInfo["useCustomGrouping"] = false;
        customInfo["groupBy"] = "";
        customInfo[""] = "";
    }
    return customInfo;
}

function setVisibiltyForSortIcons(imageSource) {
    frmListKA.imgDownArrowKA.setVisibility(false);
    frmListKA.imgTypeShowDirectionKA.setVisibility(false);
    frmListKA.imgStatusShowDirectionKA.setVisibility(false);
    frmListKA.imgStartDateShowDirectionKA.setVisibility(false);
    frmListKA.imgTechnicianShowDirectionKA.setVisibility(false);
    frmListKA.imgStartDateShowDirectionKA.setVisibility(false);
    if (imageSource) {
        frmListKA[imageSource].setVisibility(true);
    }
}

function LoadFilterValues(CurrentView, formModel) {

    for (var i = 0; i < statusArr.length; i++) {
        removeFromScroll(frmListKA, "flxScrollSelectStatusKA", kony.BPT.statusList.indexOf(statusArr[i]));
    }
    for (var j = 0; j < priorityArr.length; j++) {
        removeFromScroll(frmListKA, "flxScrollSelectPriorityKA", kony.BPT.priorityList.indexOf(priorityArr[j]));
    }
    clearPriorityFilters();
    clearDateFilters();
    clearStatusFilters();
    clearTechnicianFilters();
	formModel.setViewAttributeByProperty("lblViewsKA", "text",kony.i18n.getLocalizedString("i18n.common.lblStatusKA.valueKA")); 
    switch (CurrentView) {
        case "Today":
            formModel.setViewAttributeByProperty("lblPlannedStartDateValKA", "isVisible", true);
            formModel.setViewAttributeByProperty("lblPlannedStartDateKA", "top", "15%");
            formModel.setViewAttributeByProperty("lblPlannedStartDateValKA", "isVisible", true);
            formModel.setViewAttributeByProperty("btnPlannedStartDateClearKA", "isVisible", true);
            var formattedDate = kony.BPT.todayDate.toString().substring(6) + "/" + kony.BPT.todayDate.toString().substring(4, 6) + "/" + kony.BPT.todayDate.toString().substring(0, 4);
            formModel.setViewAttributeByProperty("lblPlannedStartDateValKA", "text", formattedDate);           
        	formModel.setViewAttributeByProperty("lblViewsKA", "text",  kony.i18n.getLocalizedString("i18n.BPT.frmListKA.lblPlannedStartDateKA.valueKA"));           
        if (!frmListKA.flxScrollSelectStatusKA.widgets().length) {
        flxScrollAnimation("flxScrollSegKA", "0dp", "-57dp", "100%");
    } else flxScrollAnimation("flxScrollSegKA", "-57dp", "0dp", "308dp");
            break;

        case "High priority":
            formModel.setViewAttributeByProperty("lblPriorityValKA", "isVisible", true);
            formModel.setViewAttributeByProperty("lblPriorityKA", "top", "15%");
            formModel.setViewAttributeByProperty("btnPriorityClearKA", "isVisible", true);           
            priorityArr = ["High"];
			var priorityVal=kony.i18n.getLocalizedString("i18n.BPT.MasterData.Priority.High");
            refreshDynamicWidgetContent(priorityVal);
            addToScroll(frmListKA, "flxScrollSelectPriorityKA", kony.BPT.propertiesOfWidgets, kony.BPT.priorityList.indexOf("High"));
			 formModel.setViewAttributeByProperty("lblPriorityValKA", "text", priorityVal);
            registerEventsForDynamicWidgets("flxScrollSelectPriorityKA", "flxScrollPrioritySegKA", kony.BPT.priorityList.indexOf("High"), "High");

            animateFlexes("flxScrollPrioritySegKA");
			formModel.setViewAttributeByProperty("lblViewsKA", "text",  kony.i18n.getLocalizedString("i18n.common.lblPriorityKA.valueKA"));           
            break;
        case "By Technician":
            kony.BPT.ManualFilter = {};
			formModel.setViewAttributeByProperty("lblViewsKA", "text", kony.i18n.getLocalizedString("i18n.BPT.common.Select Filter"));           
            break;
        case "Available":
            formModel.setViewAttributeByProperty("lblStatusValKA", "isVisible", true);
            formModel.setViewAttributeByProperty("btnStatusClearKA", "isVisible", true);
            formModel.setViewAttributeByProperty("lblStatusKA", "top", "15%");
			var statusVal=kony.i18n.getLocalizedString("i18n.BPT.MasterData.Status.Pending");
            refreshDynamicWidgetContent(statusVal);
            formModel.setViewAttributeByProperty("lblStatusValKA", "text", statusVal);
            statusArr = ["Pending"];
            for (var i = 0; i < statusArr.length; i++) {
                addToScroll(frmListKA, "flxScrollSelectStatusKA", kony.BPT.propertiesOfWidgets, kony.BPT.statusList.indexOf(statusArr[i]));
                registerEventsForDynamicWidgets("flxScrollSelectStatusKA", "flxScrollSegKA", kony.BPT.statusList.indexOf(statusArr[i]), statusArr[i]);

            };
            animateFlexes("flxScrollSegKA");
			          
            break;
        case "In Progress":
            formModel.setViewAttributeByProperty("lblStatusValKA", "isVisible", true);
            formModel.setViewAttributeByProperty("btnStatusClearKA", "isVisible", true);
            formModel.setViewAttributeByProperty("lblStatusKA", "top", "15%");           
            statusArr = ["On Route", "Started", "Paused"];          
			var statusVal="";
			var finalStatusVal="";
            for (var i = 0; i < statusArr.length; i++) {
				statusVal=kony.i18n.getLocalizedString("i18n.BPT.MasterData.Status."+statusArr[i]);
                refreshDynamicWidgetContent(statusVal);
                addToScroll(frmListKA, "flxScrollSelectStatusKA", kony.BPT.propertiesOfWidgets, kony.BPT.statusList.indexOf(statusArr[i]));
                registerEventsForDynamicWidgets("flxScrollSelectStatusKA", "flxScrollSegKA", kony.BPT.statusList.indexOf(statusArr[i]), statusArr[i]);
				finalStatusVal=finalStatusVal+statusVal+",";
            }
			 formModel.setViewAttributeByProperty("lblStatusValKA", "text", finalStatusVal.substring(0,finalStatusVal.length-1));
            animateFlexes("flxScrollSegKA");			
            break;
        case "Expired":
            formModel.setViewAttributeByProperty("lblStatusValKA", "isVisible", true);
            formModel.setViewAttributeByProperty("btnStatusClearKA", "isVisible", true);
            formModel.setViewAttributeByProperty("lblStatusKA", "top", "15%");
			var statusVal="";
			var finalStatusVal="";           
            statusArr = ["Scheduled","Pending"];
            for (var i = 0; i < statusArr.length; i++) {
				statusVal=kony.i18n.getLocalizedString("i18n.BPT.MasterData.Status."+statusArr[i]);
                refreshDynamicWidgetContent(statusVal);
                addToScroll(frmListKA, "flxScrollSelectStatusKA", kony.BPT.propertiesOfWidgets, kony.BPT.statusList.indexOf(statusArr[i]));
                registerEventsForDynamicWidgets("flxScrollSelectStatusKA", "flxScrollSegKA", kony.BPT.statusList.indexOf(statusArr[i]),statusArr[i]);
				finalStatusVal=finalStatusVal+statusVal+",";
            }
			formModel.setViewAttributeByProperty("lblStatusValKA", "text", finalStatusVal.substring(0,finalStatusVal.length-1));
            animateFlexes("flxScrollSegKA");			
            break;
        case "Late":
            formModel.setViewAttributeByProperty("lblStatusValKA", "text", "isVisible", true);
            formModel.setViewAttributeByProperty("btnStatusClearKA", "isVisible", true);
            formModel.setViewAttributeByProperty("lblStatusKA", "top", "15%");           
            statusArr = ["Scheduled"];
			var statusVal=kony.i18n.getLocalizedString("i18n.BPT.MasterData.Status.Scheduled");                      
			refreshDynamicWidgetContent(statusVal);
			addToScroll(frmListKA, "flxScrollSelectStatusKA", kony.BPT.propertiesOfWidgets, kony.BPT.statusList.indexOf(statusArr[i]));
			registerEventsForDynamicWidgets("flxScrollSelectStatusKA", "flxScrollSegKA", kony.BPT.statusList.indexOf(statusArr[i]),statusArr[i]);					
            animateFlexes("flxScrollSegKA");
			formModel.setViewAttributeByProperty("lblStatusValKA", "text", statusVal);			
            break;
        case "Delayed":
            formModel.setViewAttributeByProperty("lblStatusValKA", "text", "isVisible", true);
            formModel.setViewAttributeByProperty("btnStatusClearKA", "isVisible", true);
            formModel.setViewAttributeByProperty("lblStatusKA", "top", "15%");           
            statusArr = ["Started", "Paused","On Route"];
			var statusVal="";
			var finalStatusVal=""; 
            for (var i = 0; i < statusArr.length; i++) {
				statusVal=kony.i18n.getLocalizedString("i18n.BPT.MasterData.Status."+statusArr[i]);
                refreshDynamicWidgetContent(statusVal);
                addToScroll(frmListKA, "flxScrollSelectStatusKA", kony.BPT.propertiesOfWidgets, kony.BPT.statusList.indexOf(statusArr[i]));
                registerEventsForDynamicWidgets("flxScrollSelectStatusKA", "flxScrollSegKA", kony.BPT.statusList.indexOf(statusArr[i]),statusArr[i]);
				finalStatusVal=finalStatusVal+statusVal+",";
            }         
			formModel.setViewAttributeByProperty("lblStatusValKA", "text", finalStatusVal.substring(0,finalStatusVal.length-1));
            animateFlexes("flxScrollSegKA");			
            break;
        case "On-Time":
            formModel.setViewAttributeByProperty("lblStatusValKA", "text", "isVisible", true);
            formModel.setViewAttributeByProperty("btnStatusClearKA", "isVisible", true);
            formModel.setViewAttributeByProperty("lblStatusKA", "top", "15%");
           
            statusArr = ["Started", "Paused","On Route"];
			var statusVal="";
			var finalStatusVal=""; 
            for (var i = 0; i < statusArr.length; i++) {
				statusVal=kony.i18n.getLocalizedString("i18n.BPT.MasterData.Status."+statusArr[i]);
                refreshDynamicWidgetContent(statusVal);
                addToScroll(frmListKA, "flxScrollSelectStatusKA", kony.BPT.propertiesOfWidgets, kony.BPT.statusList.indexOf(statusArr[i]));
                registerEventsForDynamicWidgets("flxScrollSelectStatusKA", "flxScrollSegKA", kony.BPT.statusList.indexOf(statusArr[i]), statusArr[i]);
				finalStatusVal=finalStatusVal+statusVal+",";
            }
			formModel.setViewAttributeByProperty("lblStatusValKA", "text",finalStatusVal.substring(0,finalStatusVal.length-1));
            animateFlexes("flxScrollSegKA");		
            break;
    }
    if (!kony.BPT.fromClear) {
        saveStateofFilters();
    }
}
function saveStateofFilters() {
    kony.BPT.ActualstatusArr = JSON.parse(JSON.stringify(statusArr));
    kony.BPT.ActualStatusData = JSON.parse(JSON.stringify(frmListKA.segStatusKA.data));
    kony.BPT.ActualStatusText = frmListKA.lblStatusValKA.text;
    kony.BPT.ActualpriorityArr = JSON.parse(JSON.stringify(priorityArr));
    kony.BPT.ActualPriorityData = JSON.parse(JSON.stringify(frmListKA.segPriorityKA.data));
    kony.BPT.ActualPriorityText = frmListKA.lblPriorityValKA.text;
    kony.BPT.ActualTechArr = JSON.parse(JSON.stringify(techArr));
    kony.BPT.ActualTechFirstNameList = JSON.parse(JSON.stringify(techFirstNameList));
    kony.BPT.ActualTechLastNameList = JSON.parse(JSON.stringify(techLastNameList));
    kony.BPT.ActualTechnicianData = JSON.parse(JSON.stringify(frmListKA.segTechnicianNameKA.data));
    kony.BPT.ActualTechnicianText = frmListKA.lblTechnicianValKA.text;
    kony.BPT.ActualPlannedDateText = frmListKA.lblPlannedStartDateValKA.text;
    kony.BPT.ActualStartDateText = frmListKA.lblActualStartDateValKA.text;
    kony.BPT.PlannedCompleteText = frmListKA.lblPlannedCompleteDateValKA.text;
    kony.BPT.ActualCompleteText = frmListKA.lblActualCompleteDateValKA.text;
}

function RevertFilterValues() {
    if (JSON.stringify(kony.BPT.ActualstatusArr) != JSON.stringify(statusArr)) {
        for (var i = 0; i < statusArr.length; i++) {
            removeFromScroll(frmListKA, "flxScrollSelectStatusKA", kony.BPT.statusList.indexOf(statusArr[i]));
        }
        for (var i = 0; i < kony.BPT.ActualstatusArr.length; i++) {
			var statusVal=kony.i18n.getLocalizedString("i18n.BPT.MasterData.Status."+kony.BPT.ActualstatusArr[i]);                
            refreshDynamicWidgetContent(statusVal);
            addToScroll(frmListKA, "flxScrollSelectStatusKA", kony.BPT.propertiesOfWidgets, kony.BPT.statusList.indexOf(kony.BPT.ActualstatusArr[i]));
            registerEventsForDynamicWidgets("flxScrollSelectStatusKA", "flxScrollSegKA", kony.BPT.statusList.indexOf(kony.BPT.ActualstatusArr[i]), kony.BPT.ActualstatusArr[i]);

        }
        animateFlexes("flxScrollSegKA");
        statusArr = JSON.parse(JSON.stringify(kony.BPT.ActualstatusArr));
        frmListKA.segStatusKA.data = kony.BPT.ActualStatusData;
        frmListKA.lblStatusValKA.text = kony.BPT.ActualStatusText;
        if (frmListKA.lblStatusValKA.text) {

            frmListKA.btnStatusClearKA.setVisibility(true);
        } else {
            frmListKA.btnStatusClearKA.setVisibility(false);
            frmListKA.lblStatusKA.top = "33%";
        }
    }
    if (JSON.stringify(kony.BPT.ActualpriorityArr) != JSON.stringify(priorityArr)) {
        for (var i = 0; i < priorityArr.length; i++) {
            removeFromScroll(frmListKA, "flxScrollSelectPriorityKA", kony.BPT.priorityList.indexOf(priorityArr[i]));
        }
        for (var i = 0; i < kony.BPT.ActualpriorityArr.length; i++) {
			var priorityVal=kony.i18n.getLocalizedString("i18n.BPT.MasterData.Priority."+kony.BPT.ActualpriorityArr[i]);
            refreshDynamicWidgetContent(priorityVal);
            addToScroll(frmListKA, "flxScrollSelectPriorityKA", kony.BPT.propertiesOfWidgets, kony.BPT.priorityList.indexOf(kony.BPT.ActualpriorityArr[i]));
            registerEventsForDynamicWidgets("flxScrollSelectPriorityKA", "flxScrollPrioritySegKA", kony.BPT.priorityList.indexOf(kony.BPT.ActualpriorityArr[i]), kony.BPT.ActualpriorityArr[i]);
        }
        animateFlexes("flxScrollPrioritySegKA");
        priorityArr = JSON.parse(JSON.stringify(kony.BPT.ActualpriorityArr));
        frmListKA.segPriorityKA.data = kony.BPT.ActualPriorityData;
        frmListKA.lblPriorityValKA.text = kony.BPT.ActualPriorityText;
        if (frmListKA.lblPriorityValKA.text) {
            frmListKA.btnPriorityClearKA.setVisibility(true);
        } else {
            frmListKA.lblPriorityKA.top = "33%";
            frmListKA.btnPriorityClearKA.setVisibility(false);
        }

    }
    if (JSON.stringify(techArr) != JSON.stringify(kony.BPT.ActualTechArr)) {
        techArr = JSON.parse(JSON.stringify(kony.BPT.ActualTechArr));
        techFirstNameList = JSON.parse(JSON.stringify(kony.BPT.ActualTechFirstNameList));
        techLastNameList = JSON.parse(JSON.stringify(kony.BPT.ActualTechLastNameList));
        frmListKA.segTechnicianNameKA.data = JSON.parse(JSON.stringify(kony.BPT.ActualTechnicianData));
        frmListKA.lblTechnicianValKA.text = kony.BPT.ActualTechnicianText;
        if (frmListKA.lblTechnicianValKA.text)
            frmListKA.btnTechnicianClearKA.setVisibility(true);
        else {
            frmListKA.btnTechnicianClearKA.setVisibility(false);
            frmListKA.lblTechnicianFilterKA.top = "33%";
        }
    }
    if (frmListKA.lblPlannedStartDateValKA.text != kony.BPT.ActualPlannedDateText) {
        frmListKA.lblPlannedStartDateValKA.text = kony.BPT.ActualPlannedDateText;
        if (frmListKA.lblPlannedStartDateValKA.text)
            frmListKA.btnPlannedStartDateClearKA.setVisibility(true);
        else {
            frmListKA.btnPlannedStartDateClearKA.setVisibility(false);
            frmListKA.lblPlannedStartDateKA.top = "35%";
        }
    }
    if (frmListKA.lblActualStartDateValKA.text != kony.BPT.ActualStartDateText) {
        frmListKA.lblActualStartDateValKA.text = kony.BPT.ActualStartDateText;
        if (frmListKA.lblActualStartDateValKA.text)
            frmListKA.btnActualStartDateClearKA.setVisibility(true);
        else {
            frmListKA.btnActualStartDateClearKA.setVisibility(false);
            frmListKA.lblActualStartDateKA.top = "35%";
        }
    }

    if (frmListKA.lblPlannedCompleteDateValKA.text != kony.BPT.PlannedCompleteText) {
        frmListKA.lblPlannedCompleteDateValKA.text = kony.BPT.PlannedCompleteText;
        if (frmListKA.lblPlannedCompleteDateValKA.text)
            frmListKA.btnPlannedCompleteDateClearKA.setVisibility(true);
        else {
            frmListKA.btnPlannedCompleteDateClearKA.setVisibility(false);
            frmListKA.lblPlannedCompleteDateKA.top = "35%";
        }
    }
    if (frmListKA.lblActualCompleteDateValKA.text != kony.BPT.ActualCompleteText) {
        frmListKA.lblActualCompleteDateValKA.text = kony.BPT.ActualCompleteText;
        if (frmListKA.lblActualCompleteDateValKA.text)
            frmListKA.btnActualCompleteDateClearKA.setVisibility(true);
        else {
            frmListKA.lblActualCompleteDateKA.top = "35%";
            frmListKA.btnActualCompleteDateClearKA.setVisibility(false);
        }
    }
}

function prepareSearchQuery(searchText, fromSort) {
    kony.BPT.FinalSearchQuery = "(";
    kony.BPT.FinalFilterQuery = "";
    kony.BPT.searchText = searchText;
    var len = kony.BPT.searchConfig.length;
    for (var i = 0; i < len - 1; i++) {
        kony.BPT.FinalSearchQuery = kony.BPT.FinalSearchQuery + "substringof(" + kony.BPT.searchConfig[i] + ",'" + kony.BPT.searchText + "')" + " or ";
    }
    kony.BPT.FinalSearchQuery = kony.BPT.FinalSearchQuery + "substringof(" + kony.BPT.searchConfig[i] + ",'" + kony.BPT.searchText + "'))";
    if (!kony.BPT.Finalview[kony.BPT.currentView].filter)
        kony.BPT.FinalFilterQuery = "&$filter=" + kony.BPT.FinalSearchQuery;
    else {
        if (kony.BPT.manualFilterQuery)
		{
			if((kony.BPT.manualFilterQuery == " "))
				kony.BPT.FinalFilterQuery ="&$filter=" + kony.BPT.FinalSearchQuery;
			else
				kony.BPT.FinalFilterQuery = kony.BPT.manualFilterQuery+ " and " + kony.BPT.FinalSearchQuery;
		}
        else
            kony.BPT.FinalFilterQuery = kony.BPT.Finalview[kony.BPT.currentView].filter + " and " + kony.BPT.FinalSearchQuery;
    }   
	kony.BPT.FinalQuery = kony.BPT.FinalFilterQuery + kony.BPT.ManualSortQuery + kony.BPT.GroupExpand;
	if(fromSort)
		return kony.BPT.FinalFilterQuery;
    
    

}

function deviceBackForAndroid() {}

function convertTimeZone(date, SourceTimeZone, RemoteTimeZone, dateFormat) {
    if ((SourceTimeZone === null || SourceTimeZone === undefined) && (RemoteTimeZone === null || RemoteTimeZone === undefined)) {
        kony.sdk.mvvm.log.info("both SourceTimeZone and RemoteTimeZone are null");
        return null;
    }
    var remoteTime = null;
    if (typeof date === "string" && date.indexOf('GMT') > -1) date = date.substr(0, date.indexOf('GMT'));
    else if (typeof date === "string" && date.indexOf('+') > -1) date = date.substr(0, date.indexOf('+'));
    if (SourceTimeZone !== undefined && SourceTimeZone !== null) date = moment.tz(date, SourceTimeZone);
    else date = moment(date);
    if (RemoteTimeZone !== undefined && RemoteTimeZone !== null) remoteTime = date.clone().tz(RemoteTimeZone)
    else remoteTime = moment(date.format()).local()
    if (dateFormat !== null && dateFormat !== undefined) remoteTime = remoteTime.format(dateFormat);
    else remoteTime = remoteTime.format();
    return remoteTime;
}

function setFiltersVisibleForView() {
    frmListKA.btnPlannedStartDateClearKA.setVisibility(false);
    frmListKA.btnActualStartDateClearKA.setVisibility(false);
    frmListKA.btnPlannedCompleteDateClearKA.setVisibility(false);
    frmListKA.btnActualCompleteDateClearKA.setVisibility(false);
    frmListKA.btnStatusClearKA.setVisibility(false);
    frmListKA.btnPriorityClearKA.setVisibility(false);
    frmListKA.btnTechnicianClearKA.setVisibility(false);
    frmListKA.lblPlannedStartDateValKA.text = "";
    frmListKA.lblStatusValKA.text = "";
    frmListKA.lblPriorityValKA.text = "";
    frmListKA.lblActualStartDateValKA.text = "";
    frmListKA.lblPlannedCompleteDateValKA.text = "";
    frmListKA.lblActualCompleteDateValKA.text = "";
    frmListKA.lblTechnicianValKA.text = "";
}

function animateFlexes(flxScrollSelectStatusKA) {

    if (!frmListKA[flxScrollSelectStatusKA].widgets().length) {
        flxScrollAnimation(flxScrollSelectStatusKA, "0dp", "-57dp", "100%");
    } else
        flxScrollAnimation(flxScrollSelectStatusKA, "-57dp", "0dp", "308dp");
}

function getSelectedViewIndex() {
    var viewData = frmListKA.segViewsKA.data;
    for (var i = 0; i < viewData.length; i++) {
        if (kony.BPT.currentView == viewData[i]["lblKeyKA"]){
          	frmListKA.lblCreatedKA.text = viewData[i]["lblTmpViewKA"];
            return i;
        }
    }
    return 0;
}
function populateSelectedIndex(populateIn) {
  try
    {
    switch (populateIn) {
        case "Technician":
			 var tempData = frmListKA.segTechSearchKA.data;				          
            for (var i = 0; i < tempData.length; i++) {
                if (kony.BPT.selectedTechnician == tempData[i]["FirstName"]) {
                    frmListKA.segTechSearchKA.selectedRowIndex = [0, i];
                    return;
                }
            }
            break;
        case "Status":
            frmListKA.segSingleSelectStatusKA.selectedRowIndex = null;
            var tempData = frmListKA.segSingleSelectStatusKA.data;
            for (var i = 0; i < tempData.length; i++) {
                if (frmListKA.lblTmpStatusKA.text == tempData[i]["Code"]) {
                    frmListKA.segSingleSelectStatusKA.selectedRowIndex = [0, i];
                }
            }
            break;
    }
    }
  catch(err)
    {
       //alert(""+JSON.stringify(err));
    }
}	
function resetSortIcons()
{   
    frmListKA.tbxSearchKA.text = "";
    var viewListforSortImg = ["Today", "High priority", "By Technician","Late", "Available"];
    if (viewListforSortImg.indexOf(kony.BPT.currentView) > -1) {
        setVisibiltyForSortIcons("imgStartDateShowDirectionKA");
        frmListKA.imgStartDateShowDirectionKA.src = "ascending.png";
    }
}