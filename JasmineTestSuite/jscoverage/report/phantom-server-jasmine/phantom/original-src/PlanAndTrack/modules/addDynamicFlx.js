
//var dynamicBtn;
//var dynamicLbl;
kony=kony || {};
kony.BPT=kony.BPT || {};
kony.BPT.revertFailedFieldUpdate=" ";
function addToScroll(formName,scrollId,properties,selectedIndex){
				
                var widgetScroll = formName[scrollId];
                var widgetConfig;
                var dynamicFlx;
                var basicConfFlx;
                var leftVal;
				var noOfItems=properties.length-1;
		//		alert(noOfItems);
                for(var widget=0;widget<=noOfItems;widget++){
				  
					widgetConfig = properties[widget];
                  	
                     
					if(properties[widget]["widgetType"]=="FlexContainer")	
					{
                     	 var widthperc=27+properties[1]["text"].length+"%";
                      		basicConfFlx = {
											"id" : "flxStatus"+selectedIndex, 
											"skin": widgetConfig.skin,
								//			"layoutType": kony.flex.FLOW_HORIZONTAL,
											"left":"3.13%",
											"height":"66.96%",
											"width":"100dp",
                              			//	"width":"preferred",
											"centerY" : "50%",
											"ZIndex" : "1"
                              				
							};
                   //     if() 
						dynamicFlx = new kony.ui.FlexContainer(basicConfFlx,{},{showProgressIndicator:false});
						widgetScroll.add(dynamicFlx); 
						
					}
			
					if(properties[widget]["widgetType"]=="Label")
					{
                     
						basicConfFlx = {
											"id" : "lblStatus"+selectedIndex, 
											"skin": widgetConfig.skin,
									
											"text":widgetConfig.text,
											"left":"10dp",
											"height":"preferred",
											"width":"preferred",
											"centerY" : "50%",
											"ZIndex" : "1"
							};
                         var flx = "flxStatus"+selectedIndex;
						 var addingLbl = widgetScroll[flx];
                   		 dynamicLbl=new kony.ui.Label(basicConfFlx,{},{showProgressIndicator:false});
                      
                     	 if(dynamicLbl.text.length>6)
                             dynamicLbl.text=dynamicLbl.text.substring(0,6)+"..";

                          addingLbl.add(dynamicLbl);
					}
					if(properties[widget]["widgetType"]=="Button")
					{
                     
						basicConfFlx = {
											"id" : "btnStatus"+selectedIndex, 
											"skin": "sknBtnCancelFilterKA",
                          					"text":" ",
											
											"width":"30dp",
											"height":"30dp",
											
										//	"left":"7.5%",
											"right":"4dp",
											"centerY" : "50%",
											"ZIndex" : "3"
							};
                         var flx = "flxStatus"+selectedIndex;
						 var addingBtn = widgetScroll[flx];
                    
						 dynamicBtn=new kony.ui.Button(basicConfFlx,{},{showProgressIndicator:false});
						 addingBtn.add(dynamicBtn);
                      	
					}
          //        var flxScroll = formName[scrollId];
          //      alert(flxScroll[dynamicFlx]);
         //        var widthVal = formName[dynamicLbl].left+formName[dynamicLbl].width+ formName[dynamicBtn].left+formName[dynamicBtn].width+6  ;	
         //      formName[dynamicFlx] .width= widthVal+"%";
                                
            }
}
function removeFromScroll(formName,scrollId,selectedIndex)
{
  
  var removeFlx="flxStatus"+selectedIndex;
  var scrollFlx=formName[scrollId];
  var dynamicFlx=scrollFlx[removeFlx];
    formName[scrollId].remove( dynamicFlx);
 
}

function doNothing()
{}

kony=kony || {};
 kony.BPT=kony.BPT || {};
 kony.BPT.sortBy= kony.BPT.sortBy || {};
 kony.BPT.sortType= kony.BPT.sortType || {};
kony.BPT.sortBy.key=1;
kony.BPT.sortBy.description=1;
function masterDataSearch(formObj,segName,searchText,searchLbl,gblListSegData)
{
	try{
     
			if(searchText&&searchText.length >= 1)
			{
			var newSegData=[];
				var tempArray=[];
				var j=0;
				for(var i=0;i<gblListSegData.length;i++)
					{
						var temp = gblListSegData[i];
						var workOrder = temp[searchLbl];             
						if(workOrder.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
							{	
                              if(segName=="segTechSearchKA")
                                {                                  
                                newSegData.push(temp);					
								j++; 
                                }
                              else
                                {
                               if(techArr.indexOf(workOrder)!=-1)
                                temp["btnTmpUncheckKA"].skin="sknTickMarkFilterKA";
								newSegData.push(temp);					
								j++;
                                }
							}
				   }
				   if(j==0){
						alert(kony.i18n.getLocalizedString("i18n.frmListKA.alert.noTechFound.valueKA"));
						formObj[segName].setData(newSegData);
				   }else{
						formObj[segName].setData(newSegData);                     	
						performSortOnMasterData(formObj,segName);                          
				   }
					
			}
		else{
		
			var temp=[];
			formObj[segName].setData(gblListSegData);				
			}
	}catch(err)
	{
	  alert(kony.i18n.getLocalizedString("i18n.common.alert.errorIs.valueKA")+err);
	}	
}
function compare(a,b)
{
  a[kony.BPT.sortType] = (typeof a[kony.BPT.sortType] == 'object') ? a[kony.BPT.sortType].text : a[kony.BPT.sortType];
  b[kony.BPT.sortType] = (typeof b[kony.BPT.sortType] == 'object') ? b[kony.BPT.sortType].text : b[kony.BPT.sortType];
  if (a[kony.BPT.sortType].toLowerCase() < b[kony.BPT.sortType].toLowerCase())
      return -kony.BPT.sortBy.key;
  if (a[kony.BPT.sortType].toLowerCase() > b[kony.BPT.sortType].toLowerCase())
      return kony.BPT.sortBy.key;
  return 0;
}
function performSortOnMasterData(formObj,segName)
{
  var newSegData = formObj[segName].data;
  var sortedData = newSegData.sort(compare);
  formObj[segName].setData(sortedData);
}

function performSortOnMasterDataForSegTechnacian(formObj,segName)
{
  var newSegData = formObj[segName].data;
  var index = 0;
  if(recentAppliedTechnician && recentAppliedTechnician.length > 0){	
	index = 1;
  }
  if(newSegData && newSegData.length > index && newSegData[index] && newSegData[index].length > 1){
	 var data =  newSegData[index][1];
	 var sortedData = data.sort(compare);
	 newSegData[index][1] = sortedData;
	 formObj[segName].setData(newSegData);
  }
  
}


function selectRecord()
{
  if(frmListKA.flxBulkActionBarKA.isVisible) 
  {
    var idx = frmListKA.segListKA.selectedIndex;
    var idx = idx.pop();
 	var item1 = frmListKA.segListKA.selectedItems[0];
    
    if(item1["btnSelectRowKA"].skin!="sknSelectedTrackingIconKA")
      {
       
        item1["btnSelectRowKA"].skin = "sknSelectedTrackingIconKA";
        countOfItems++;
        bulkItems.push(idx);
      }
 		
    else 
      {
        item1["btnSelectRowKA"].skin = "sknUnselectedTrackingKA";
        countOfItems--;
         var index = bulkItems.indexOf(idx);
    	bulkItems.splice(index,1);
      }
     frmListKA.flxBulkActionBarKA.lblNoOfSelectedKA.text=parseInt(countOfItems)+" Items"+" Selected";
	 frmListKA.flxListMainKA.segListKA.setDataAt(item1,idx);
    segListData = frmListKA.segListKA.data;
    
  }


}

function refreshTechnicianData()
{
   var gblListSegData=JSON.parse(JSON.stringify(kony.BPT.TechnicianData));
   if(gblListSegData && gblListSegData[0] && gblListSegData[0].length > 1){
	   var listSegData = gblListSegData[0][1];
	   var newSegData=[];
	   var tempArray=[];
	   var j=0;
	  for(var i=0;i<listSegData.length;i++)
		 {
		  var temp = listSegData[i];
		  var workOrder = temp["lblTmpTechnicianNameKA"];              
								if(techArr.indexOf(workOrder)!=-1)
								  temp["btnTmpUncheckKA"].skin="sknTickMarkFilterKA";
						  else
							temp["btnTmpUncheckKA"].skin="sknBtnPatchKA";
			newSegData.push(temp);     
		  j++;
		   
		   }
		   gblListSegData[0][1] = newSegData;
		  frmListKA.segTechnicianNameKA.setData(gblListSegData) ;
	}
  
}


sortBydate=1;
function dateSort(formObj,segName,segData)
{
 var newSegData = segData;
 if(!segData)
  newSegData=formObj[segName].data;
  for(var i=0;i<newSegData.length;i++){
 newSegData[i].sort(compareDate);
  }
formObj[segName].setData(newSegData);
  sortBydate=-sortBydate;
}
function compareDate(a,b)
{
  var tempDate1=a["lblStartedDateKA"].slice(6,10)+"-"+a["lblStartedDateKA"].slice(3,5)+"-"+a["lblStartedDateKA"].slice(0,2);
 var tempTime1=(a.lblStartedTimeKA.indexOf('P')==-1?a.lblStartedTimeKA.slice(0,5):String(eval(parseInt(a.lblStartedTimeKA.slice(0,2))+12))+a.lblStartedTimeKA.slice(2,5));
  var tempDateObj1=new Date(tempDate1+"T"+tempTime1);
 var tempDate2=b["lblStartedDateKA"].slice(6,10)+"-"+b["lblStartedDateKA"].slice(3,5)+"-"+b["lblStartedDateKA"].slice(0,2);
 var tempTime2=(b.lblStartedTimeKA.indexOf('P')==-1?b.lblStartedTimeKA.slice(0,5):String(eval(parseInt(b.lblStartedTimeKA.slice(0,2))+12))+b.lblStartedTimeKA.slice(2,5));
 var tempDateObj2=new Date(tempDate2+"T"+tempTime2);
  if (tempDateObj1 < tempDateObj2)
       return -sortBydate;
  if (tempDateObj1 > tempDateObj2)
    return sortBydate;
  return 0;
}