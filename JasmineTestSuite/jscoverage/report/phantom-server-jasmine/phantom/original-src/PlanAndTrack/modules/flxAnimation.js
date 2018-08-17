function flxScrollAnimation(flexContainer, topStart, topEnd, heightVal) {

    frmListKA[flexContainer].animate(getAnimationObject(topStart, topEnd), animConfig(), {
        animationStart: function() {},
        animationEnd: function() {
            frmListKA[flexContainer].top = topEnd;
            frmListKA[flexContainer].forceLayout();
            frmListKA[flexContainer].height = heightVal;
        }
    });
}

function animation(callback) {
	kony.BPT.animationInProgress = 0;
    var getHeightOfFlex = parseFloat(frmListKA.flxMainKA.flxMain2KA.height);
    var getHeightOfSegHeader = parseFloat(flxHeaderTmpKA.height);
    selectedIndexVal = frmListKA.segListKA.selectedRowIndex;
    var heightOfflxHeaderKA = parseFloat(frmListKA.flxListMainKA.flxHeaderKA.height);
    var heightOfflxViewTypeKA = parseFloat(frmListKA.flxListMainKA.flxViewTypeKA.height);
    var heightOfFlxHeadingKA = parseFloat(frmListKA.flxListMainKA.flxSegHeadingKA.flxHeadingKA.height);
    var totalHeight = heightOfflxHeaderKA + heightOfflxViewTypeKA + heightOfFlxHeadingKA + getHeightOfSegHeader;
    var poppingIndex = selectedIndexVal.pop();
    var beginVal = totalHeight + ((poppingIndex) * getHeightOfFlex);
    var beginValInPercentage = beginVal + "%";
    var totalHgtInPercentage = totalHeight + "%";
    frmListKA.flxMainKA.animate(getAnimationObject(beginValInPercentage, totalHgtInPercentage), animConfig(), {
        animationStart: animationOfFlex(totalHgtInPercentage),
        animationEnd: function() {
            frmListKA.flxMainKA.setVisibility(true);
            frmListKA.flxBlock1KA.setVisibility(true);
            frmListKA.flxMainKA.top = totalHgtInPercentage;
			frmListKA.flxMain2KA.setEnabled(true);      
          	eval(callback).call();
        }
    });
    function descriptionEdit() {
      kony.BPT.revertFailedFieldUpdate = frmListKA.lblTmpDescKA.text
      if (frmListKA.flxTmpStatusPriorityKA.skin != "skn000000Opacity12KA" && frmListKA.flxTmpStartDateKA.skin != "skn000000Opacity12KA" && frmListKA.flxTmpTechnicianKA.skin != "skn000000Opacity12KA") 
        frmListKA.flxTmpDescKA.skin = "skn000000Opacity12KA";
      //frmListKA.flxMainEditDescKA.setVisibility(true);
      frmListKA.flxMainEditDescKA.flxOuterBodyKA.flxInnerBodyKA.txtAreaKA.text = frmListKA.flxMainKA.flxMain2KA.flxTmpDescKA.lblTmpDescKA.text;
      //formModel.performActionOnView("txtAreaKA","setFocus",[true]);
	  frmListKA.txtAreaKA.setFocus(true);
      if (frmListKA.flxTechSearchInListKA.isVisible == false && frmListKA.flxSelectStatusKA.isVisible == false && frmListKA.flxMaindateTimeKA.left == "-100%") 
        frmListKA.flxMainEditDescKA.setVisibility(true);
    }

    function statusEdit() {
      if (!frmListKA.flxBulkActionBarKA.isVisible) {
        if (frmListKA.flxTmpDescKA.skin != "skn000000Opacity12KA" && frmListKA.flxTmpStartDateKA.skin != "skn000000Opacity12KA" && frmListKA.flxTmpTechnicianKA.skin != "skn000000Opacity12KA") frmListKA.flxTmpStatusPriorityKA.skin = "skn000000Opacity12KA";
        /* var idx=singleSelectStatusVal.indexOf(frmListKA.lblTmpStatusKA.text);
               var temp=[];
               temp[0]=0;
               temp[1]=idx;
               if(idx!=-1)
               frmListKA.segSingleSelectStatusKA.selectedIndex=temp; */
        frmListKA.flxLeftBlockKA.width = "54%";
        frmListKA.flxTopBlockKA.height = "32.9%";
        frmListKA.flxRightBlockKA.width = "15%";
        frmListKA.flxBottomBlockKA.height = "32.9%";
      }
      if (frmListKA.flxTechSearchInListKA.isVisible == false && frmListKA.flxMainEditDescKA.isVisible == false && frmListKA.flxMaindateTimeKA.left == "-100%") {
        frmListKA.flxSelectStatusKA.setVisibility(true);
        populateSelectedIndex("Status");
      }
    }

    function technicianEdit() {
      try {
        if (frmListKA.flxMainEditDescKA.isVisible == false && frmListKA.flxSelectStatusKA.isVisible == false && frmListKA.flxMaindateTimeKA.left == "-100%") {
          frmListKA.imgToolTipTechTopKA.setVisibility(false);
          frmListKA.imgToolTipTechKA.setVisibility(true);
          frmListKA.flxTechHeadKA.right = "13%";
          frmListKA.flxTechMergeKA.right = "13%";
          frmListKA.flxTechBodyKA.right = "13%";
          frmListKA.flxTechSearchInListKA.setVisibility(true);
          frmListKA.tbxTechSearchKA.text = "";
          frmListKA.btnDescendingKA.skin = "sknBtnAtoZFilterKA";
          frmListKA.segTechSearchKA.setData(JSON.parse(JSON.stringify(kony.BPT.tempTechData)));
          // kony.BPT.sortBy.key = 1;
          // kony.BPT.sortType = "FirstName";
          // performSortOnMasterData(frmListKA, "segTechSearchKA");
          kony.BPT.selectedTechnician = frmListKA.lblTechFullNameKA.text;
          //populateSelectedIndex("Technician");
        }
        frmListKA.btnTechSearchClearKA.setVisibility(false);
        if (frmListKA.flxTmpDescKA.skin != "skn000000Opacity12KA" && frmListKA.flxTmpStartDateKA.skin != "skn000000Opacity12KA" && frmListKA.flxTmpStatusPriorityKA.skin != "skn000000Opacity12KA") frmListKA.flxTmpTechnicianKA.skin = "skn000000Opacity12KA";
        kony.BPT.revertFailedFieldUpdate = frmListKA.lblTmpTechnicianKA.text;
        //kony.BPT.tempTechData=JSON.parse(JSON.stringify(frmListKA.segTechSearchKA.data));
      } catch (err) {
        doNothing();
      }
    }


    function dateEdit() {
      var strDate = "";
      var hrs = "";
      kony.BPT.revertFailedFieldUpdate = frmListKA.lblStartedDateKA.text;
      if (frmListKA.flxTmpDescKA.skin != "skn000000Opacity12KA" && frmListKA.flxTmpStatusPriorityKA.skin != "skn000000Opacity12KA" && frmListKA.flxTmpTechnicianKA.skin != "skn000000Opacity12KA") frmListKA.flxTmpStartDateKA.skin = "skn000000Opacity12KA";
      var getDateFromFlx = frmListKA.lblStartedDateKA.text.slice(0, 10);
      var getTimeFromFlx = frmListKA.lblStartedDateKA.text.slice(11, 20);
      getDateFromFlx = getDateFromFlx.split("/");
      getTimeFromFlx = getTimeFromFlx.split(":");
      var hrs = getTimeFromFlx[0];
      getTimeFromFlx[1] = getTimeFromFlx[1].split(" ");
      //if(hrs>=0&&hrs<9)
      //  hrs='0'+hrs;
      frmListKA.pickerViewTImeKA.selectedKeys = [hrs, getTimeFromFlx[1][0], getTimeFromFlx[1][1]];
      frmListKA.calDateTimeKA.dateComponents = [parseFloat(getDateFromFlx[0]), parseFloat(getDateFromFlx[1]), parseFloat(getDateFromFlx[2]), parseFloat(hrs), parseFloat(getTimeFromFlx[1][0]), 0.0];
      strDate = getDateFromFlx[0] + "" + getDateFromFlx[1] + "" + getDateFromFlx[2];
      frmListKA.lblDateValKA.text = moment(strDate, "DDMMYYYY").format("ddd, DD MMM YYYY");
      frmListKA.lblTimeKA.text = hrs + ":" + getTimeFromFlx[1][0] + " " + getTimeFromFlx[1][1];
      if (frmListKA.flxTechSearchInListKA.isVisible == false && frmListKA.flxMainEditDescKA.isVisible == false && frmListKA.flxSelectStatusKA.isVisible == false) frmListKA.flxMaindateTimeKA.left = "0dp";
    }
}

function getAnimationObject(begin, end) {
    var animDefinition = {
        0: {
            "top": begin
        },
        100: {
            "top": end

        }
    };
    animDef = kony.ui.createAnimation(animDefinition);
    return animDef;
}

function animConfig() {
    var config = {
        "duration": 1,
        "iterationCount": 1,
        "delay": 0,
        "direction": kony.anim.DIRECTION_NONE,
        "fillMode": kony.anim.FILL_MODE_NONE
    };
    return config;
}



function animationOfFlex(value) {
    frmListKA.flxMainKA.setVisibility(true);
    frmListKA.flxMainKA.top = value;
    frmListKA.flxBlock1KA.setVisibility(true);
}


function animationOfFlexBack(endValInPercentage) {
    //frmListKA.flxMainKA.setVisibility(true);
    //frmListKA.flxMainKA.flxBlockKA.setVisibility(false);
    frmListKA.flxMainKA.top = endValInPercentage;
    //frmListKA.flxBlock1KA.setVisibility(true);
}

function getBackFlex() {
	frmListKA.flxMain2KA.setEnabled(false);
	kony.BPT.animationInProgress++;
	if(kony.BPT.animationInProgress>1){
		return;
	}
    var getHeightOfFlex = parseFloat(frmListKA.flxMainKA.flxMain2KA.height);
    var getHeightOfSegHeader = parseFloat(flxHeaderTmpKA.height);
    selectedIndexVal = frmListKA.segListKA.selectedRowIndex;

    var poppingIndex = selectedIndexVal.pop();
    var heightOfflxHeaderKA = parseFloat(frmListKA.flxListMainKA.flxHeaderKA.height);
    var heightOfflxViewTypeKA = parseFloat(frmListKA.flxListMainKA.flxViewTypeKA.height);
    var heightOfFlxHeadingKA = parseFloat(frmListKA.flxListMainKA.flxSegHeadingKA.flxHeadingKA.height);
    var totalHeight = heightOfflxHeaderKA + heightOfflxViewTypeKA + heightOfFlxHeadingKA + getHeightOfSegHeader;
    var endValue = totalHeight + ((poppingIndex) * getHeightOfFlex);
    var endValInPercentage = endValue + "%";
    var totalHgtInPercentage = totalHeight + "%";
    frmListKA.flxMainKA.animate(getAnimationObject(totalHgtInPercentage, endValInPercentage), animConfig(), {
        animationStart: animationOfFlexBack(endValInPercentage),
        animationEnd: function() {
          var INSTANCE = kony.sdk.mvvm.KonyApplicationContext.getAppInstance();
    	  var controller = INSTANCE.getFormController("frmListKA");
            frmListKA.flxMainKA.setVisibility(false);        
            frmListKA.flxBlock1KA.setVisibility(false);
            frmListKA.flxMainKA.top = endValInPercentage;           
            var selectedIndexVal;            
            var tempdata = {};
            selectedIndexVal = frmListKA.flxListMainKA.segListKA.selectedRowIndex;
            var sectionIndex = selectedIndexVal[0];
            var RowIndex = selectedIndexVal[1];            
            var lbl1Val = frmListKA.btnInFlxTrackingKA.skin;
            tempdata["Description"] = frmListKA.lblTmpDescKA.text;
            tempdata["Address1Map"] = frmListKA.lblTmpLocationKA.text;           
            tempdata["Status_id"] = frmListKA.lblTmpStatusKA.text;
			tempdata["MaintenancePlant"]=controller.performAction("getStatusFromCode",[kony.BPT.StatusCodes[frmListKA.lblTmpStatusKA.text]]).img;          	
            tempdata["Priority"] = frmListKA.lblTmpPriorityKA.text;
			if(tempdata["Status_id"]=="Completed"){
				tempdata["lastmodifiedts"] = {
								"skin": "sknGreyKA",
								"text": " ",
								"isVisible": true
							};
			}else{
				tempdata["lastmodifiedts"] = {
								"skin": "sknLbl5E5050ClanProBook25KA",
								"text": " ",
								"isVisible": true
							};
			}
            tempdata["Code"] = {
                "skin": "sknUnselectedTrackingKA",
                "focusSkin": "sknSelectedTrackingIconKA",
                "text": " "
            };
            tempdata["PriorityType"] = frmListKA.imgPriorityKA.src;
          	tempdata["Latitude"]=kony.BPT.lattitudeOfRec;
            tempdata["Longitude"]= kony.BPT.longitudeOfRec;
            tempdata["PlannedStartDate"] = frmListKA.lblStartedDateKA.text;
			tempdata["PlannedEndDate"] = frmListKA.lblPlannedEndDateKA.text;
            tempdata["Technician"] = frmListKA.lblTmpTechnicianKA.text + "";
			tempdata["TechnicianSecHeader"] = frmListKA.lblTechFullNameKA.text + "";
            if (tempdata["Technician"].length > 9) tempdata["Technician"] = tempdata["Technician"].substring(0, 9) + "...";
            tempdata["Type_id"] = frmListKA.lblTmpTypeKA.text;
            tempdata.primaryKeyValueMap = kony.BPT.primaryMap;
            //   tempdata[poppingIndex]["StartTime"]=frmListKA.lblStartedTimeKA.text;
			var tempRec=JSON.parse(JSON.stringify(tempdata));
			tempdata["Instructions"] = controller.performAction("getTrackingImage",[tempRec]);
          	try
              { 
              var tempArr=[];
              var tempData=frmListKA.segListKA.data;
                if((tempData.length==1)&&(!tempData[0].length))
                  {
                    tempArr[0]=tempdata;
                   frmListKA.segListKA.setData(tempArr) ;
                  }
                  else                                           
           		 frmListKA.segListKA.setDataAt(tempdata, RowIndex, sectionIndex);
              }
          	catch(err)
              {
                kony.print("error is "+err);
               frmListKA.segListKA.setData(tempData) ;
              }
            frmListKA.flxListMainKA.setEnabled(true);
        }
    });



}

function clearPriorityFilters() {
    frmListKA.flxScrollPrioritySegKA.height = "100%";
    flxScrollAnimation("flxScrollPrioritySegKA", "0dp", "-18.7%", "100%");
    frmListKA.segPriorityKA.setData(kony.BPT.savepriorityData);
    frmListKA.flxScrollSelectPriorityKA.removeAll();
    priorityArr = [];
    priorityVal = priorityArr.toString();
    frmListKA.lblPriorityValKA.text = priorityVal;
    frmListKA.flxOnClickFlxViewsKA.lblPriorityKA.top = "33%";
    frmListKA.flxOnClickFlxViewsKA.btnPriorityClearKA.setVisibility(false);

}

function clearStatusFilters() {
    frmListKA.flxScrollSegKA.height = "100%";
    flxScrollAnimation("flxScrollSegKA", "0dp", "-18.7%", "100%");

    frmListKA.segStatusKA.setData(kony.BPT.savestatusData);
    frmListKA.flxScrollSelectStatusKA.removeAll();
    statusArr = [];
    statusVal = statusArr.toString();
    frmListKA.lblStatusValKA.text = statusVal;
    frmListKA.flxOnClickFlxViewsKA.lblStatusKA.top = "33%";
    frmListKA.flxOnClickFlxViewsKA.btnStatusClearKA.setVisibility(false);

}

function clearTechnicianFilters() {
    frmListKA.segTechnicianNameKA.setData(kony.BPT.TechnicianData);
	selectedTechnicians = [];
    techArr = [];
	techLastNameList=[];
	techFirstNameList=[];	
    reverttechArr = JSON.parse(JSON.stringify(techArr));
    techVal = techArr.toString();
	reverttechLastNameList=[];
	reverttechFirstNameList=[];
    frmListKA.lblTechnicianValKA.text = techVal;
    frmListKA.lblTechnicianFilterKA.top = "33%";
    frmListKA.btnTechnicianClearKA.setVisibility(false);
    //refreshTechnicianData();
}


function clearDateFilters() {
    frmListKA.flxMainViewKA.setVisibility(false);
    frmListKA.lblPlannedStartDateValKA.text = "";
    frmListKA.btnPlannedStartDateClearKA.setVisibility(false);
    frmListKA.btnActualStartDateClearKA.setVisibility(false);
    frmListKA.btnActualCompleteDateClearKA.setVisibility(false);
    frmListKA.btnPlannedCompleteDateClearKA.setVisibility(false);

    frmListKA.lblPlannedStartDateKA.top = "35%";
    frmListKA.lblActualStartDateValKA.text = "";
    frmListKA.lblActualStartDateKA.top = "35%";
    frmListKA.lblPlannedCompleteDateValKA.text = "";
    frmListKA.lblPlannedCompleteDateKA.top = "35%";
    frmListKA.lblActualCompleteDateValKA.text = "";
    frmListKA.lblActualCompleteDateKA.top = "35%";


}

function registerEventsForDynamicWidgets(flxScrollSelectStatusKA, flxScrollSegKA, poppingIndex, dynamicLbl) {

    var delFlx = "flxStatus" + poppingIndex;
    var delBtn = "btnStatus" + poppingIndex;
    var delLbl = "lblStatus" + poppingIndex;
    var delBtn = frmListKA[delBtn];
    var lbl1Val = {
        "skin": "sknTickMarkFilterKA",
        "text": "",
        "isVisible": true
    };
var lbl2Val = {
            "skin": "sknBtnPatchKA",
            "text": "",
            "isVisible": false
        };
    //var delBtn=delFlx[delBtn];
    var delLbl = frmListKA[delLbl];
    delBtn.onClick = function() {


        frmListKA[flxScrollSegKA].height = "300dp";
        if (frmListKA[flxScrollSelectStatusKA].widgets().length == 1) {
            flxScrollAnimation(flxScrollSegKA, "0dp", "-57dp", "358dp");
        }
      //	else
        //  flxScrollAnimation(flxScrollSegKA, "0dp", "-57dp", "358dp");
      	//else
          
        removeFromScroll(frmListKA, flxScrollSelectStatusKA, poppingIndex);
        if (flxScrollSelectStatusKA == "flxScrollSelectStatusKA") {
            var index = statusArr.indexOf(dynamicLbl);
            statusArr.splice(index, 1);
            var tempdata = frmListKA.segStatusKA.data[poppingIndex];
            tempdata["btnTmpUncheckKA"] = lbl2Val;
            frmListKA.segStatusKA.setDataAt(tempdata, poppingIndex);
        } else {

            var index = priorityArr.indexOf(dynamicLbl);
            priorityArr.splice(index, 1);
            var tempdata = frmListKA.segPriorityKA.data[poppingIndex];
            tempdata["btnTmpUncheckKA"] = lbl2Val;
            frmListKA.segPriorityKA.setDataAt(tempdata, poppingIndex);

        }

    }
      if (flxScrollSelectStatusKA == "flxScrollSelectStatusKA") {
          
            var tempdata = frmListKA.segStatusKA.data[poppingIndex];
            tempdata["btnTmpUncheckKA"] = lbl1Val;
            frmListKA.segStatusKA.setDataAt(tempdata, poppingIndex);
        } else {

            
            var tempdata = frmListKA.segPriorityKA.data[poppingIndex];
            tempdata["btnTmpUncheckKA"] = lbl1Val;
            frmListKA.segPriorityKA.setDataAt(tempdata, poppingIndex);

        }


}