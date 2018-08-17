kony.BPT.img = {"delayed":"sknBtnDelayIconKA ", "late":"sknBtnLateIconKA", "ontime":"sknBtnOntimeKA", "expired":"sknBtnExpireIconKA "};
kony.BPT.filterBy = {};

/*kony.BPT.img.delayed = "delay_icon.png";
kony.BPT.img.late = "late_icon.png";
kony.BPT.img.ontime = "ontime.png";
kony.BPT.img.expired = "expired_icon.png";*/
function sortFilterGroupSetView(segObj, lblInput){
  var selItem = segObj.selectedItems[0][lblInput];
  var index = segObj.selectedIndex;
  var date = new Date();
 var tempMonth=(date.getMonth()<10?0:"")+date.getMonth();
 var month=String(parseInt(tempMonth)+1);
 var date1=date.getDate()<10?"0"+date.getDate():date.getDate();
    var today =date1 +"/"+month+"/"+date.getFullYear();
  switch(selItem){    
    case 'Today':
      kony.BPT.sortType = "lblStartedTimeKA";
	  kony.BPT.filterBy.view = {"lblStartedDateKA":[today]};
      kony.BPT.groupBy = {"lblTmpTechnicianKA":"Technician"};
      frmListKA.lblCreatedKA.text="Today";
      break;
    case 'High Priority':
      kony.BPT.sortType = "lblStartedTimeKA";
	  kony.BPT.filterBy.view = {"lblTmpPriorityKA":["HIGH"]};
      kony.BPT.groupBy = {"lblStartedDateKA":"Date"};
       frmListKA.lblCreatedKA.text="High Priority";
      break;
    case 'Available':
      kony.BPT.sortType = "lblStartedTimeKA";
	  kony.BPT.filterBy.view = {"lblTmpTechnicianKA":[""],"lblTmpStatusKA":["PENDING"]};
      kony.BPT.groupBy = {"lblStartedDateKA":"Date"};
       frmListKA.lblCreatedKA.text="Available";
      break;
    case 'By Technician':
      kony.BPT.sortType = "lblStartedTimeKA";
	  kony.BPT.filterBy.view = null;
      kony.BPT.groupBy = {"lblTmpTechnicianKA":"Technician"};
      frmListKA.lblCreatedKA.text="By Technician";
      break;
    case 'In Progress':
      kony.BPT.sortType = "lblStartedTimeKA";
	  kony.BPT.filterBy.view = {"lblTmpStatusKA":["ACCEPTED","ON-ROUTE","STARTED","PAUSED"]};
      kony.BPT.groupBy = {"lblTmpTechnicianKA":"Technician"};
      frmListKA.lblCreatedKA.text="In Progress";
      break;
    case 'Expired':
      kony.BPT.sortType = "lblStartedTimeKA";
	  kony.BPT.filterBy.view = {"btnTrackingKA":["expired"]};
      kony.BPT.groupBy = {"lblTmpTechnicianKA":"Technician"};
      frmListKA.lblCreatedKA.text="Expired";
      break;
    case 'Late':
      kony.BPT.sortType = "lblStartedTimeKA";
	  kony.BPT.filterBy.view = {"btnTrackingKA":["late"]};
      kony.BPT.groupBy = {"lblTmpTechnicianKA":"Technician"};
      frmListKA.lblCreatedKA.text="Late";
      break;
    case 'Delay':
      kony.BPT.sortType = "lblStartedTimeKA";
	  kony.BPT.filterBy.view =  {"btnTrackingKA":["delayed"]};
      kony.BPT.groupBy = {"lblTmpTechnicianKA":"Technician"};
      frmListKA.lblCreatedKA.text="Delay";
      break;
    case 'Ontime':
      kony.BPT.sortBy = "lblStartedTimeKA";
	  kony.BPT.filterBy.view = {"btnTrackingKA":["ontime"]};
      kony.BPT.groupBy = {"lblTmpTechnicianKA":"Technician"};
      frmListKA.lblCreatedKA.text="Ontime";
      break;
    default:
      kony.BPT.sortType = "lblStartedTimeKA";
	  kony.BPT.filterBy.view = {"lblStartedDateKA":[today]};
      kony.BPT.groupBy = {"lblTmpTechnicianKA":"Technician"};
      frmListKA.lblCreatedKA.text="Today";
      break;
  }
  kony.BPT.sortBy.key = 1;
}

function initiateGrouping(key){
  
	var newSegData= [];
  	var newSegCnt=0;
  	var segData = kony.BPT.listMasterData;
 
  	for(var i = 0; i < segData.length; i++){
      var secHeader = "";
      for(var j =0 ; j < segData[i][1].length; j++){
        if(kony.BPT.groupBy[key] === "Technician"){
            secHeader = segData[i][1][j].lblTmpTechnicianKA;
        }else if(kony.BPT.groupBy[key] === "Date"){
            secHeader = segData[i][1][j].lblStartedDateKA;
        }else{
            secHeader = segData[i][1][j].lblTmpTechnicianKA;
        }
        var newSecHeaderIndex = -1;
        if(newSegCnt > 0){
            newSecHeaderIndex = indexOfArr(newSegData, secHeader);
        }
        if(newSecHeaderIndex === -1){
            newSegData.push([{"lblListHeaderKA":secHeader}]);	
            newSegData[newSegCnt].push([segData[i][1][j]]);
            newSegCnt++;
        }else{
            newSegData[newSecHeaderIndex][1].push(segData[i][1][j]);
        }
      }
    }	
  	//alert("newSegdata before removing empty groups is: "+JSON.stringify(newSegData));
  	//newSegData = removeEmptyGroups(newSegData);
  	//alert("newSegdata after removing empty groups is: "+JSON.stringify(newSegData));
  	kony.BPT.listMasterData = newSegData;
}
function removeEmptyGroups(segData){
  
  for(var i=0;i<segData.length;i++){
  	if(segData[i][1].length === 0){
      
      segData.splice(i,1);
      i--;
    }
  }
  return segData;
}
function initiateFilter(frmObj, segName){
  	var newSegData = [];
  	var segData = kony.BPT.listMasterData;
    var filterBy;
  	if(!kony.BPT.filterBy.filter){
    	filterBy = kony.BPT.filterBy.view;
    }else{
      	filterBy = kony.BPT.filterBy.filter;
    }
  	if(filterBy === null) {
    	return kony.BPT.listMasterData;
    }
  	for(var k=0;k<segData.length;k++){
      	newSegData.push([segData[k][0]]);
      	newSegData[k].push([]);
    }
  	for(var key in filterBy){
  		newSegData = setFilters(frmObj, segName, key, newSegData, filterBy);
  	}
 // 	alert("newSegdata before removing empty groups is: "+JSON.stringify(newSegData));
  	newSegData = removeEmptyGroups(newSegData);
 // 	alert("newSegdata after removing empty groups is: "+JSON.stringify(newSegData));
  	return newSegData;
}
function setFilters(formObj, segName, key, newSegData, filterBy){
	try{
      var newSegCnt=0;
      var segData = kony.BPT.listMasterData;
      var filterArr = filterBy[key];
   
    for(var i = 0; i < segData.length; i++){
      for(var j =0 ; j < segData[i][1].length; j++){
        var filterArrLen = filterArr.length;
        while(filterArrLen--){
          var filterLbl = filterArr[filterArrLen];
          if(key.indexOf("btn") !== -1){
            if(segData[i][1][j][key].skin.toString().trim() === kony.BPT.img[filterLbl]){
              if(!newSegData[i][1])
                newSegData[i].push([segData[i][1][j]]);
              else
                newSegData[i][1].push(segData[i][1][j]);
            }
          }else{
            if(segData[i][1][j][key].toString().trim() === filterArr[filterArrLen].toString().trim()){
              newSegData[i][1].push(segData[i][1][j]);
            } 	
          }
        }	
      }
    }
    return newSegData;
    }catch(err){
      	alert(kony.i18n.getLocalizedString("i18n.common.alert.errorIs.valueKA")+JSON.stringify(err));
    }
}

function applyFiltersStatus(){
  	if(!frmListKA.lblStatusValKA.text)
      	frmListKA.lblStatusValKA.text = "";
	if(frmListKA.lblStatusValKA.text.toString().trim() === ""){
		if(kony.BPT.filterBy.filter.lblTmpStatusKA)
			delete kony.BPT.filterBy.filter.lblTmpStatusKA;
		if(kony.BPT.filterBy.filter.btnTrackingKA)
			delete kony.BPT.filterBy.filter.btnTrackingKA;
		return;
	}
	var statusArr = [];
	if(frmListKA.lblStatusValKA.text.toString().indexOf(",") !== -1){
		statusArr = frmListKA.lblStatusValKA.text.toString().split(",");
	}else{
		statusArr.push(frmListKA.lblStatusValKA.text.toString().trim()) ;
	}
	for(var i=0;i<statusArr.length;i++){
		if(statusArr[i].toString().toLowerCase().trim().indexOf("in progress") !== -1){
			if(!kony.BPT.filterBy.filter.lblTmpStatusKA){
				kony.BPT.filterBy.filter.lblTmpStatusKA = [];
			}
			kony.BPT.filterBy.filter.lblTmpStatusKA.push("ACCEPTED","ON-ROUTE","STARTED","PAUSED");
		}else if(statusArr[i].toString().toLowerCase().trim().indexOf("delayed") !== -1){
			if(!kony.BPT.filterBy.filter.btnTrackingKA){
				kony.BPT.filterBy.filter.btnTrackingKA = [];
			}
			kony.BPT.filterBy.filter.btnTrackingKA.push("delayed");
		}else if(statusArr[i].toString().toLowerCase().trim().indexOf("expired") !== -1){
			if(!kony.BPT.filterBy.filter.btnTrackingKA){
				kony.BPT.filterBy.filter.btnTrackingKA = [];
			}
			kony.BPT.filterBy.filter.btnTrackingKA.push("expired");
		}else if(statusArr[i].toString().toLowerCase().trim().indexOf("late") !== -1){
			if(!kony.BPT.filterBy.filter.btnTrackingKA){
				kony.BPT.filterBy.filter.btnTrackingKA = [];
			}
			kony.BPT.filterBy.filter.btnTrackingKA.push("late");
		}else if(statusArr[i].toString().toLowerCase().trim().indexOf("on time") !== -1){
			if(!kony.BPT.filterBy.filter.btnTrackingKA){
				kony.BPT.filterBy.filter.btnTrackingKA = [];
			}
			kony.BPT.filterBy.filter.btnTrackingKA.push("ontime");
		}
	}
}
function applyFiltersPriority(){
  	if(!frmListKA.lblPriorityValKA.text)
      	frmListKA.lblPriorityValKA.text = "";
	if(frmListKA.lblPriorityValKA.text.toString().trim() === ""){
		if(kony.BPT.filterBy.filter.lblTmpPriorityKA)
			delete kony.BPT.filterBy.filter.lblTmpPriorityKA;
		return;
	}
	var priorityArr = [];
	if(frmListKA.lblPriorityValKA.text.toString().indexOf(",") !== -1){
		priorityArr = frmListKA.lblPriorityValKA.text.toString().split(",");
	}else{
		priorityArr.push(frmListKA.lblPriorityValKA.text.toString().trim()) ;
	}
	for(var i=0;i<priorityArr.length;i++){
		if(!kony.BPT.filterBy.filter.lblTmpPriorityKA){
			kony.BPT.filterBy.filter.lblTmpPriorityKA = [];
		}
		kony.BPT.filterBy.filter.lblTmpPriorityKA.push(priorityArr[i].toString().toUpperCase().trim());
	}
}

function applyFiltersTechnician(){
  	if(!frmListKA.lblTechnicianValKA.text)
      	frmListKA.lblTechnicianValKA.text = "";
	if(frmListKA.lblTechnicianValKA.text.toString().trim() === ""){
		if(kony.BPT.filterBy.filter.lblTmpTechnicianKA)
			delete kony.BPT.filterBy.filter.lblTmpTechnicianKA;
		return;
	}
	var techArr = [];
	if(frmListKA.lblTechnicianValKA.text.toString().indexOf(",") !== -1){
		techArr = frmListKA.lblTechnicianValKA.text.toString().split(",");
	}else{
		techArr.push(frmListKA.lblTechnicianValKA.text.toString().trim()) ;
	}
	for(var i=0;i<techArr.length;i++){
		if(!kony.BPT.filterBy.filter.lblTmpTechnicianKA){
			kony.BPT.filterBy.filter.lblTmpTechnicianKA = [];
		}
		kony.BPT.filterBy.filter.lblTmpTechnicianKA.push(techArr[i].toString().trim());
	}
}

function clearAllFilters(){
	delete kony.BPT.filterBy.filter;
}


function indexOfArr(arr, needle) {
  var i = -1, index = -1;
  for(i = 0; i < arr.length; i++) {
    var json = arr[i][0];
    if(json["lblListHeaderKA"] === needle) {
      index = i;
      break;
    }
  }
  return index;
}

function showFlxPopup(eventObj){
  //alert(JSON.stringify(frmListKA.s));
  //var context1={"widget":frmListKA.segListKA.selectedRows[0],"anchor":"bottom","sizetoanchorwidth":false};
//PopS.setContext(context1);
PopS.show();
//context1={"widget":frmListKA.btnApplyKA,"anchor":"top","sizetoanchorwidth":false};
//PopS.setContext(context1);

  
  
}
