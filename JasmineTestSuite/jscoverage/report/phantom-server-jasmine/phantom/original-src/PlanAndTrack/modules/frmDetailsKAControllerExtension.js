/** 
*	In this class, developer can change/override the existing methods or can create new methods if required
*/
/*
* bussiness/orchestration/mediation logic class for frmDetailsKA.
*/
kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.frmDetailsKAControllerExtension = Class(kony.sdk.mvvm.BaseFormControllerExtension, {
constructor: function(controllerObj) {
	this.DurationofWO = " ";
	this.StartDateTime = " ";
	this.AddressData = "";
	this.$class.$super.call(this, controllerObj);
},
fetchData: function() {
	try {
		var scopeObj = this;
		kony.sdk.mvvm.KonyApplicationContext.showLoadingScreen("Loading Form");
		this.$class.$superp.fetchData.call(this, success, error);
	} catch (err) {
		kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
		kony.BPT.otherRequest=false;
      	if(err && err.getErrorObj())
          {
			alert(err.getErrorObj().errmsg);            
          }
		kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");
		var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
		kony.sdk.mvvm.log.error(exception.toString());
	}

	function success(response) {
		var params = {};
		kony.BPT.count = 0;
		var successIndex=0;
		scopeObj.DurationofWO = scopeObj.calculateDurationOfWo(response["form"][0]["PlannedStartDate"], response["form"][0]["PlannedEndDate"]);
		scopeObj.StartDateTime = response["form"][0]["ActualStartDate"];
		scopeObj.AddressData = response["form"][0]["Address"] && response["form"][0]["Address"][0];
		if (response["form"][0]["Address"] && response["form"][0]["Address"][0])
			response["form"][0]["Address"][0]["City_id"] = response["form"][0]["Address"][0]["City_id"] + "," + response["form"][0]["Address"][0]["Region_id"] + "," + response["form"][0]["Address"][0]["ZipCode"];

		var contextData = scopeObj.getController().getContextData();

		finalResponse = response;
		var groupwidgetcontext = this.createGroupWidgetsContext();
		 if ((response["form"][0]["WorkOrderContact"]) && (response["form"][0]["WorkOrderContact"][0])) {
			successIndex+=1;		
			params.Contact_id = response["form"][0]["WorkOrderContact"][0]["Contact_id"];
			contextData.setQueryParams("flxCustInfoKA", params);               
		}
		if ((response["form"][0]["OrderAsset"] && response["form"][0]["OrderAsset"][0])) {
			successIndex+=1;	
			params.Asset_id = response["form"][0]["OrderAsset"][0]["Asset_id"];
			contextData.setQueryParams("flxAssetRightKA", params);		
		}        
		if (response["form"][0]["Location_id"]) {
			successIndex+=1;	
			params.Location_id = response["form"][0]["Location_id"];
			contextData.setQueryParams("flxDetailsInfoKA", params);			
		}
		if (response["form"][0]["FunctionalLocation_id"]) {
			successIndex+=1;		
			params.FunctionalLocation_id = response["form"][0]["FunctionalLocation_id"];
			contextData.setQueryParams("flxFunctionalLocationKA", params);                
		}
		if(params.Contact_id)
			groupwidgetcontext.fetchDataForGroupWidget("flxCustInfoKA", sucCallback, errorcallback);
		if(params.Asset_id)
			groupwidgetcontext.fetchDataForGroupWidget("flxAssetRightKA", sucCallback, errorcallback);
		if(params.Location_id)
			groupwidgetcontext.fetchDataForGroupWidget("flxDetailsInfoKA", sucCallback, errorcallback);  
		if(params.FunctionalLocation_id)		
			groupwidgetcontext.fetchDataForGroupWidget("flxFunctionalLocationKA", sucCallback, errorcallback);		
		function sucCallback(response) {
			++kony.BPT.count;
			finalResponse["flxAssetRightKA"] = response["flxAssetRightKA"] || finalResponse["flxAssetRightKA"];
			finalResponse["flxCustInfoKA"] = response["flxCustInfoKA"] || finalResponse["flxCustInfoKA"];
			finalResponse["flxDetailsInfoKA"] = response["flxDetailsInfoKA"] || finalResponse["flxDetailsInfoKA"];
			finalResponse["flxFunctionalLocationKA"] = response["flxFunctionalLocationKA"] || finalResponse["flxFunctionalLocationKA"];
			if (kony.BPT.count == successIndex)
				scopeObj.getController().processData(finalResponse);		
		}

		function errorcallback(err) {
			kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
			scopeObj.getController().processData(finalResponse);
		}
		if(successIndex==0)
		{
			kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
			scopeObj.getController().processData(finalResponse);
		}
	}

	function error(err) {
		//Error fetching data
		kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
		kony.BPT.otherRequest=false;
		if(err && err.getErrorObj())
          {
			if(err.getErrorObj().errcode==1011)                	
				alert(kony.i18n.getLocalizedString("i18n.common.alert.error.NetworkError"));          
          }
      		else                  
                  {
                    kony.print(err); 
                  }
		kony.sdk.mvvm.log.error("In fetchData errorcallback in controller extension ", err);
		var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FETCH_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FETCH_IN_CONTROLLER_EXTENSION, err);
		kony.sdk.mvvm.log.error(exception.toString());
	}
},
calculateDurationOfWo: function(plannedStartDate, plannedEndDate) {
	var date1 = new Date(plannedStartDate.slice(0, 4), plannedStartDate.slice(4, 6), plannedStartDate.slice(6, 8), plannedStartDate.slice(8, 10), plannedStartDate.slice(10, 12));
	var date2 = new Date(plannedEndDate.slice(0, 4), plannedEndDate.slice(4, 6), plannedEndDate.slice(6, 8), plannedEndDate.slice(8, 10), plannedEndDate.slice(10, 12));

	var timeDiff = Math.abs(date2.getTime() - date1.getTime());
	var Hours = date2.getHours() - date1.getHours();
	var Minutes = date2.getMinutes() - date1.getMinutes();
	var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
	if (diffDays) {
		if (diffDays == 1)
			return diffDays + "day";
		else
			return diffDays + " days";
	}
	if (Hours == 0)
		return "00:" + (Minutes <= 0 ? ("0" + Minutes) : ("" + Minutes));
	else {
		if (Minutes < 0) {
			Hours = Hours - 1;
			Minutes = 60 + Minutes;

		} else {
			if (Minutes > 59) {
				Hours = Hours + 1;
				Minutes = Minutes % 60;

			}
		}

	}
	return (Hours <= 0 ? ("0" + Hours) : ("" + Hours)) + ":" + (Minutes <= 0 ? ("0" + Minutes) : ("" + Minutes));

},
processData: function(data) {
	try {
		var scopeObj = this;
		var processedData = this.$class.$superp.processData.call(this, data);
		this.getController().bindData(data);
		return processedData;
	} catch (err) {
		kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
		//kony.sdk.mvvm.log.error("Error in processData of controllerExtension");
		var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_FORMATDATA_IN_CONTROLLER_EXTENSION, err);
		kony.sdk.mvvm.log.error(exception.toString());
	};

},
bindData: function(data) {
	try {
		
		var formmodel = this.getController().getFormModel();
      	var navObject = this.getController().getContextData();
		formmodel.clear();
		var statusDesc;
      	var statusImg;
		switch (data["form"]["lblStatusKA"].getData()) {
			case "E0001":
				statusDesc = "Pending";
            	statusImg="status_machine_pending_gray.png"
				break;
			case "E0002":
				statusDesc = "Scheduled";
            	statusImg="status_machine_scheduled_gray.png";
				break;
			case "E0003":
				statusDesc = "On Route";
             	statusImg="status_machine_on_route_gray.png";
				break;
			case "E0004":
				statusDesc = "Started"
                statusImg="status_machine_started_gray.png";
				break;
			case "E0005":
				statusDesc = "Paused";
             	statusImg="status_machine_paused_gray.png";
				break;
			case "E0006":
				statusDesc = "Completed";
            	statusImg="status_machine_technical_completed_gray.png";
				break;
			default:
				statusDesc = data["form"]["lblStatusKA"].getData(); 
            	statusImg="status_machine_scheduled_gray.png";
		}
		data["form"]["lblStatusKA"].setData(statusDesc);
		if(statusDesc.toLowerCase() == 'started' && parseInt(this.StartDateTime)){
			this.StartDateTime = convertTimeZone(moment(this.StartDateTime, "YYYYMMDDHHmmss").format(), kony.BPT.remoteTimeZone, null, 'hh:mm A,DD/MM/YYYY');
		} else{
			this.StartDateTime = convertTimeZone(moment(data["form"]["lblStartTImeValKA"].getData(), "YYYYMMDDHHmmss").format(), kony.BPT.remoteTimeZone, null, 'hh:mm A,DD/MM/YYYY');	
		}
		if (data["form"]["lblAddress2KA"] && data["form"]["lblAddress3KA"])
			data["form"]["lblAddress2KA"].setData(data["form"]["lblAddress2KA"].getData() + "," + data["form"]["lblAddress3KA"].getData());
		if (data["form"]["lblTechnicianNameKA"] && data["form"]["lblAssignedTechnicianLastNameKA"]) {
			data["form"]["lblTechnicianNameKA"].setData(data["form"]["lblTechnicianNameKA"].getData() + " " + data["form"]["lblAssignedTechnicianLastNameKA"].getData())

			data["form"]["lblAssignedTechnicianNameKA"].setData(data["form"]["lblAssignedTechnicianNameKA"].getData() + " " + data["form"]["lblAssignedTechnicianLastNameKA"].getData());
		}
		var scopeObj = this;
		//data["form"][0]["lblAddress1KA"]=data["form"][0]["lblAddress1KA"]+data["form"][0]["lblName2KA"];
		if (data["flxCustInfoKA"])
			data["flxCustInfoKA"]["lblCustomerValKA"].setData(data["flxCustInfoKA"]["lblCustomerValKA"].getData() + " " + data["flxCustInfoKA"]["lblCustomerLastNameKA"].getData());
		formmodel.setViewAttributeByProperty("flxMapKA", "top", "57.18%");
		formmodel.setViewAttributeByProperty("flxMapKA", "height", "42.82%");
		formmodel.setViewAttributeByProperty("flxScrollDashBoardDetailsKA", "isVisible", true);
		formmodel.setViewAttributeByProperty("btnResizeKA", "skin", "sknBtnMapExpandKA");
		formmodel.setViewAttributeByProperty("btnResizeKA", "focusSkin", "sknBtnMapExpandFocusKA");
		formmodel.setViewAttributeByProperty("flxDashBoardKA", "skin", "sknflxDEE5EAKA");
		formmodel.setViewAttributeByProperty("flxDetailsKA", "skin", "sknF5F6F6Opacity50KA");
		formmodel.setViewAttributeByProperty("flxDashboardInfoKA", "isVisible", true);
		formmodel.setViewAttributeByProperty("flxDetailsInfoKA", "isVisible", false);
		formmodel.setViewAttributeByProperty("lblDurationValKA", "text", this.DurationofWO);
      	formmodel.setViewAttributeByProperty("imgStatusKA","src",statusImg);
      	formmodel.setViewAttributeByProperty("imgPriorityKA","src",navObject.getCustomInfo("priorityImage"));
		frmDetailsKA.lblMenuHeaderKA.text=frmDetailsKA.lblDashboardKA.text;
		var lastUpdatedDts = data["form"]["lblLastUpdatedTimeKA"].getData();

		if (parseInt(lastUpdatedDts))
			lastUpdatedDts = convertTimeZone(moment(lastUpdatedDts, "YYYYMMDDHHmmss").format(), kony.BPT.remoteTimeZone, null, 'hh:mm A | DD/MM/YYYY');
		else
			data["form"]["lblLastUpdatedTimeKA"].setData(scopeObj.formatTime(lastUpdatedDts.slice(8, 14)) + " | " + scopeObj.formatDate(lastUpdatedDts.slice(0, 8)));
		data["form"]["lblLastUpdatedTimeKA"].setData(lastUpdatedDts);
		this.$class.$superp.bindData.call(this, data);
		formmodel.setViewAttributeByProperty("lblStartTImeValKA", "text",this.StartDateTime);	
		//this.getController().getFormModel().formatUI();
		if(kony.BPT.isInlineEdit){
			getBackFlex();
			kony.BPT.isInlineEdit = false;
		}
		formmodel.showView();
	
		if(this.AddressData)
		this.setMapDataMap(this.AddressData);
	} catch (err) {
		//kony.sdk.mvvm.log.error("Error in bindData of controllerExtension");
		var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_BINDDATA_IN_CONTROLLER_EXTENSION, err);
		kony.sdk.mvvm.log.error(exception.toString());
	}

},
setMapDataMap: function(addressData) {
	var scopeObj = this;
	var locationData = "";
	var formModel = scopeObj.getController().getFormModel();
	var mapLocationOrderList = [];
	var data = {
		lblAddressLine1KA: "key1",
		lblAddressLine2KA: "key2",
		lblAddressLine3KA: "key3"

	};
	formModel.setViewAttributeByProperty("mapKA", "widgetDataMapForCallout", data);
	if (addressData) {
		if (addressData["Latitude"] && addressData["Longitude"] && addressData["Latitude"] != "" && addressData["Longitude"] != "") {
			var addressLine2 = addressData["Address2"] + "," + addressData["Address3"];
			locationData = {
				lat: addressData["Latitude"],
				lon: addressData["Longitude"],
				name: addressData["Address1"],
				desc: addressData["Address2"],
				image: "highprioritypincopy.png",
				showcallout: true,
				calloutData: {
					"key1": addressData["Address1"],
					"key2": addressLine2,
					"key3": addressData["City_id"],
					template: flxMapMainKA
				}
			};
			mapLocationOrderList.push(locationData);
			formModel.setViewAttributeByProperty("mapKA", "locationData", mapLocationOrderList);

		}
	}
},
formatDate: function(dateToFormat) {
	if (dateToFormat)
		return dateToFormat.slice(6, 8) + "/" + dateToFormat.slice(4, 6) + "/" + dateToFormat.slice(0, 4)
	else
		return " ";
},
formatTime: function(timeToFormat) {
	if (timeToFormat) {
		if (parseInt(timeToFormat.slice(0, 2)) < 12)
			return timeToFormat.slice(0, 2) + ":" + timeToFormat.slice(2, 4) + " " + "AM";
		else
			return String(parseInt(timeToFormat.slice(0, 2)) % 12) + ":" + timeToFormat.slice(2, 4) + " " + "PM";
	} else
		return " ";
},
fetchMasterData: function(successcallback, errorcallback) {
	try {
		this.$class.$superp.fetchMasterData.call(this, successcallback, errorcallback);
	} catch (e) {
		kony.sdk.mvvm.log.error("Error in fetchingMasterData", e);
	}
},
fetchMasterDataForWidget: function(propertyId, contextData, successcallback, errorcallback) {
	try {
		this.$class.$superp.fetchMasterDataForWidget.call(this, propertyId, contextData, successcallback, errorcallback);
	} catch (e) {
		kony.sdk.mvvm.log.error("Error in fetchingMasterDataForWidget", e);
	}
},
saveData: function() {
	try {
		var scopeObj = this;
		this.$class.$superp.saveData.call(this, success, error);
	} catch (err) {
		var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
		kony.sdk.mvvm.log.error(exception.toString());
	}

	function success(res) {
		//Successfully created record
		kony.sdk.mvvm.log.info("success saving record ", res);
	}

	function error(err) {
		//Handle error case
		kony.sdk.mvvm.log.error("In saveData errorcallback in controller extension ", err);
		var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_SAVEDATA_IN_CONTROLLER_EXTENSION, err);
		kony.sdk.mvvm.log.error(exception.toString());
	}

},
deleteData: function() {
	try {
		var scopeObj = this;
		this.$class.$superp.deleteData.call(this, success, error);
	} catch (err) {
		var exception = this.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
		kony.sdk.mvvm.log.error(exception.toString());
	}

	function success(res) {
		//Successfully deleting record
		kony.sdk.mvvm.log.info("success deleting record " + JSON.stringify(res));
	}

	function error(err) {
		//Handle error case
		kony.sdk.mvvm.log.error("In deleteData errorcallback in controller extension ", err);
		var exception = scopeObj.getController().getApplicationContext().getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_DELETEDATA_IN_CONTROLLER_EXTENSION, err);
		kony.sdk.mvvm.log.error(exception.toString());
	}
}
});