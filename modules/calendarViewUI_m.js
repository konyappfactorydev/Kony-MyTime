kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};
var temp = null;
var globalDateObj;
var selectedWeekItems = [];

//%Region - Constructor
kony.apps.coe.ess.myTime.
CalendarViewUI = function() {
    try {
        kony.print("-- Start CalendarViewUI --");
        calendarWidget = null;
        kony.print("-- End CalendarViewUI --");
    } catch (e) {
        handleError(e);
    }
};




kony.apps.coe.ess.myTime.CalendarViewUI.prototype.addCalendarOnHome = function()
{
  try{
    kony.print("-- Start addCalendarOnLeaveHome --");
  	var currDate = new Date();
    //#ifdef windows8
    	 kony.apps.coe.ess.myTime.CalendarViewUI.calendarWidget = new kony.apps.coe.Reusable.calendarWIDGET(currDate.getMonth(), currDate.getFullYear().toString().trim(0, 4), "flxCalendar", "sknFlxBgFFFFFF0O", "sknFlxBgFFFFFF0O", "sknFlxMobOp100BgColD8F4FF", "sknBtnMobBg0OpFC777777Op100S79", "sknBtnMobOp100Bg2EBAEFFcFFFFFF", "sknLblMobFC333333Op100FS100", "sknBtnMobBg0OpFC333333Op100S24px", "sknBtnMobBg0OpFC777777Op100S24px", this.isValidMonthandYearforCalender, this.errorIsValidMonthandYearforCalender, this.onSwipeCallback, this.onTouchEndCallback.bind(this), this.monthRefresh, this.totalCalenderRefresh);
    //#else
    	kony.apps.coe.ess.myTime.CalendarViewUI.calendarWidget = new kony.apps.coe.Reusable.calendarWIDGET(currDate.getMonth() ,currDate.getFullYear().toString().trim(0,4),"flxCalendar","sknFlxMobOp0","sknFlxFocus","sknFlxMobOp0","sknFlxMobOp100BgColD8F4FF","sknBtnMobBg0OpFC777777Op100S79","sknBtnMobOp100Bg2EBAEFFcFFFFFF","sknLblMobFC333333Op100FS90","sknBtnMobBg0OpFC333333Op100S24px","sknBtnMobBg0OpFCC3C4CCOp100S24px",this.isValidMonthandYearforCalender, this.errorIsValidMonthandYearforCalender,this.onSwipeCallback,this.onTouchEndCallback,this.monthRefresh,this.totalCalenderRefresh);
    //#endif
    
    
    
    frmCalendarView.flxCalendar.add(kony.apps.coe.ess.myTime.CalendarViewUI.calendarWidget.getcalendar());
    
    kony.print("-- End addCalendarOnLeaveHome --");
    }  catch(e) {
      handleError(e);
  }
};


kony.apps.coe.ess.myTime.CalendarViewUI.lastDate = "";
// %Region - Methods in CalendarViewUI
/**
 * @class       CalendarViewUI
 * @type        UIz
 * @param       None
 * return       None.
 * desc         This method dynamically creates the calendar widget and adds it to the form.
 */
kony.apps.coe.ess.myTime.
CalendarViewUI.prototype.onfrmCalendarViewInit = function() {
    try {
        kony.print("-- Start onfrmCalendarViewInit --");
        kony.apps.coe.ess.myTime.CalendarViewUI.monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var currDate = new Date();
       //#ifndef windows8
        frmCalendarView.lblCurrentMonth.text = kony.apps.coe.ess.myTime.CalendarViewUI.monthsArray[currDate.getMonth()];
        frmCalendarView.lblCurrentYear.text = currDate.getFullYear().toString().trim(0, 4);
      //#endif
        showCalendarViewForm();
        kony.apps.coe.ess.myTime.CalendarViewUI.calendarWidget = new kony.apps.coe.Reusable.calendarWIDGET(currDate.getMonth(), currDate.getFullYear().toString().trim(0, 4), "flxCalendarCalenderView", "sknFlxBgFFFFFF0O", "sknFlxBgFFFFFF0O", "sknFlxMobOp100BgColD8F4FF", "sknBtnMobBg0OpFC777777Op100S79", "sknBtnMobOp100Bg2EBAEFFcFFFFFF", "sknLblMobFC333333Op100FS100", "sknBtnMobBg0OpFC333333Op100S24px", "sknBtnMobBg0OpFC777777Op100S24px", this.isValidMonthandYearforCalender, this.errorIsValidMonthandYearforCalender, this.onSwipeCallback, this.onTouchEndCallback.bind(this), this.monthRefresh, this.totalCalenderRefresh);
      //#ifdef windows8
      frmCalendarView.flxCalendar.add(kony.apps.coe.ess.myTime.CalendarViewUI.calendarWidget.getcalendar());
      //#else
      frmCalendarView.flxDynamicCalendar.add(kony.apps.coe.ess.myTime.CalendarViewUI.calendarWidget.getcalendar());
      //#endif
      
      
        kony.print("-- End onfrmCalendarViewInit --");
    } catch (e) {
        handleError(e);
    }
};
/**
 * @class       CalendarViewUI
 * @type        UI
 * @param       month, year
 * return       {Boolean}.
 * desc         This method is a callback function for the calendar widget called to check whether it is a valid month and year for the calendar or not.
 */

kony.apps.coe.ess.myTime.
CalendarViewUI.prototype.isValidMonthandYearforCalender = function(month, year) {
    try {
        kony.print("-- Start isValidMonthandYearforCalender --");
        (new kony.apps.coe.ess.myTime.CalendarViewUI()).generatingLastDateToAccess();
        var genratedDate = new Date(year, month).toYYYYMMDD("");
        if (genratedDate <= kony.apps.coe.ess.myTime.CalendarViewUI.lastDate) {
            return true;
        } else {
            try {
                // toastMessage.showToastMsg("These Timesheet are currently not available", 2000);
                alert("These Timesheet are currently not available");
            } catch (e) {
                handleError(e);
            }
            return false;
        }
        kony.print("-- End isValidMonthandYearforCalender --");
    } catch (e) {
        handleError(e);
    }
};

kony.apps.coe.ess.myTime.
CalendarViewUI.prototype.compareDateToLastDateToAccessTab = function(date) {
    //  this.generatingLastDateToAccess();
    if (date <= kony.apps.coe.ess.myTime.CalendarViewUI.lastDate) {
        return true;
    } else {
        return false;
    }
};

kony.apps.coe.ess.myTime.
CalendarViewUI.prototype.generatingLastDateToAccess = function() {
  kony.print("-- Start CalendarViewUI.prototype.generatingLastDateToAccess --");
    var date = new Date();
    var interval = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(date, new Date(date.getFullYear(), 1, 1));
    var sd = interval[0].toYYYYMMDD("");
    var ed = interval[1].toYYYYMMDD("");
    for (var i = 0; i < kony.apps.coe.ess.globalVariables.futureTimesheets; i++) {

        interval[1].setDate(interval[1].getDate() + 1);
        interval = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(interval[1], new Date(date.getFullYear(), 1, 1));
    }
    kony.apps.coe.ess.myTime.CalendarViewUI.lastDate = interval[1].toYYYYMMDD("");
    kony.print("-- End CalendarViewUI.prototype.generatingLastDateToAccess --");

};

/**
 * @class       CalendarViewUI
 * @type        UI
 * @param       None.
 * return       None.
 * desc         This method is an error callback function for the calendar widget.
 */
kony.apps.coe.ess.myTime.
CalendarViewUI.prototype.errorIsValidMonthandYearforCalender = function(month, year) {
};


/**
 * @class       CalendarViewUI
 * @type        UI
 * @param       myWidget, gestureInfo, context
 * return       None.
 * desc         This method is a callback function for the calendar widget called on swipe.
 */
kony.apps.coe.ess.myTime.
CalendarViewUI.prototype.onSwipeCallback = function(myWidget, gestureInfo, context) {
(new kony.apps.coe.ess.myTime.CalendarViewUI()).monthRefresh();
//  this.monthRefresh();
};

/**
 * @class       CalendarViewUI
 * @type        UI
 * @param       data
 * return       None.
 * desc         This method is a callback function for the calendar widget called on touch end.
 */
kony.apps.coe.ess.myTime.
CalendarViewUI.prototype.onTouchEndCallback = function(data) {
 // alert("OnTouch End \n"+JSON.stringify(data));
    if (this.compareDateToLastDateToAccessTab(new Date(data.LABEL.Date).toYYYYMMDD(""))) {
        if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig.toLowerCase() == "monthly") {

            if ( /*frmCalendarView.lblTimesheetMonthlyViewStatus.text == kony.i18n.getLocalizedString("i18n.ess.myTime.frmSearchMyTime.lblshowLblStatusTxt.valueKA") + " : " || */ kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[0].status.toLowerCase() == "saved") {
                var date = new Date(data.LABEL.Date);
                // (new kony.apps.coe.ess.myTime.CalendarViewUI()).settingHomeHeader(date);
                showCalendarViewForm(date);
            } else {
                kony.apps.coe.ess.myTime.CalendarViewUI.timeSheetId = kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[0].timesheetID;

                (new kony.apps.coe.ess.myTime.CalendarViewUI()).loadDataView();
            }

        } else {
            if (data.CELL.skin == "sknFlxBgFFFFFF0O") {
                var date1 = new Date(data.LABEL.Date);
                //  (new kony.apps.coe.ess.myTime.CalendarViewUI()).settingHomeHeader(date1);
                showCalendarViewForm(date1);
            } else {

                if (data.data.CellData.status.toLowerCase() === "saved") {
                    var date2 = new Date(data.LABEL.Date);
                    //      (new kony.apps.coe.ess.myTime.CalendarViewUI()).settingHomeHeader(date2);
					//alert("saved");
                    (new kony.apps.coe.ess.myTime.CalendarViewUI()).loadDataView();
                    showCalendarViewForm(date2);

                } else {

                    if (data.data.CellData.status.toLowerCase() === "rejected" || data.data.CellData.status.toLowerCase() === "error") {
                        kony.apps.coe.ess.myTime.CalendarViewUI.isRejected = true;
                    } else {
                        kony.apps.coe.ess.myTime.CalendarViewUI.isRejected = false;
                    }
                    // kony.apps.coe.ess.myTime.CalendarViewUI.date = new Date(data.LABEL.Date);
                    var date3 = new Date(data.LABEL.Date);
                    kony.apps.coe.ess.myTime.CalendarViewUI.timeSheetId = data.data.CellData.timesheetID;

                    (new kony.apps.coe.ess.myTime.CalendarViewUI()).loadDataView();
                }
            }
        }
    } else {
    //  alert("in else");
        try {
            // toastMessage.showToastMsg("These Timesheet are currently not available", 2000);
            alert("These Timesheet are currently not available");
        } catch (e) {
            handleError(e);
        }
    }
    //(new kony.apps.coe.ess.myTime.CalendarViewUI()).navigateToViewTimesheetForm();
    //(new kony.apps.coe.ess.myTime.CalendarViewUI()).loadDataView();

};

kony.apps.coe.ess.myTime.
CalendarViewUI.prototype.settingHomeHeader = function(date) {
    var interval = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(date, new Date(date.getFullYear(), 1, 1));
    var startDate = interval[0].toYYYYMMDD("");
    var endDate = interval[1].toYYYYMMDD("");
    if ((endDate.localeCompare(new Date().toYYYYMMDD(""))) < 0) {
        frmCreateView.lblFillTimesheets.text = "Timesheet\n(backlog)";
    } else {
        frmCreateView.lblFillTimesheets.text = "Timesheet";
    }
};

/**
 * @class       CalendarViewUI
 * @type        UI
 * @param       month, year, index
 * return       None.
 * desc         This method is a callback function for the calendar widget called on month refresh.
 */
kony.apps.coe.ess.myTime.
CalendarViewUI.prototype.monthRefresh = function(month, year, index) {
    try {
        kony.print("-- Start monthRefresh --");
        var getCalendarViewDataObj = new kony.apps.coe.ess.myTime.CalendarViewUI();
        getCalendarViewDataObj.getCalendarViewData();
        kony.print("-- End monthRefresh --");
    } catch (e) {
        handleError(e);
    }
};

/**
 * @class       CalendarViewUI
 * @type        UI
 * @param       month, year
 * return       None.
 * desc         This method is a callback function for the calendar widget called on total calendar refresh.
 */
kony.apps.coe.ess.myTime.
CalendarViewUI.prototype.totalCalenderRefresh = function(month, year) {
    try {
        kony.print("-- Start totalCalenderRefresh --");
        var getCalendarViewDataObj = new kony.apps.coe.ess.myTime.CalendarViewUI();
        getCalendarViewDataObj.getCalendarViewData();
        kony.print("-- End totalCalenderRefresh --");
    } catch (e) {
        handleError(e);
    }
};

kony.apps.coe.ess.myTime.CalendarViewUI.isEmptyOrNot = function(successCallback, errorCallback) {
    if (kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData === null || kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData === undefined || kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData.length <= 0) {
        successCallback();
        return;
    }

    function success(index, res) {
        if (res !== null && res !== undefined && res.length > 0) {
            kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[index].isEntryPresentForSaved = true;
        } else {
            if (kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[index].statusID === "5") {
                kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[index].isEntryPresentForSaved = false;
            }
        }
        if (index >= kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData.length - 1) {
            successCallback();
        } else {
            checking(index + 1);
        }

    }
    var checking = function(i) {

        var query = "select te.Id from Time_Entry te where te.Timesheet_Id = '" + kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[i].timesheetID + "' AND te.StatusId != '3';";
        kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, success.bind(this, i), errorCallback);

    };
    checking(0);
};


/**
 * @class       CalendarViewUI
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method gets the timesheet data from the backend
 */
kony.apps.coe.ess.myTime.
CalendarViewUI.prototype.getCalendarViewData = function() {
    (new kony.apps.coe.ess.myTime.CalendarViewUI()).populateSegmentData();
    frmCalendarView.flxCopyWeek.setVisibility(false);
    frmCalendarView.segCopy.selectedIndices = [];
    showCalendarViewForm();
    try {
        if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig.toLowerCase() == "monthly") {
            frmCalendarView.flxTimesheetTab.setVisibility(false);
            //frmCalendarView.flxTimesheetMonthView.setVisibility(true);
        } else {
            frmCalendarView.flxTimesheetTab.setVisibility(true);
            //frmCalendarView.flxTimesheetMonthView.setVisibility(false);
        }
        (new kony.apps.coe.ess.myTime.CalendarViewUI()).shiftingFlex();
        var scopeObj = this;
        kony.print("-- Start getCalendarViewData --");
        var currMonth = "" + (("0" + (parseInt(JSON.stringify(kony.apps.coe.ess.myTime.CalendarViewUI.calendarWidget.month)) + 1)).slice(-2));
        var currDate = new Date();
        var currYear = String(kony.apps.coe.ess.myTime.CalendarViewUI.calendarWidget.year).trim();
   
        var sqlQuery = "select ts.Start_Date as startDate,ts.End_Date as endDate,ts.Id as timesheetID,ts.Status_Id as statusID " +
            "from Timesheet ts where " +
            "(ts.Start_Date between '" + currYear + currMonth + "01'" +
            " AND '" + currYear + currMonth + "31') OR (ts.End_Date between '" + currYear + currMonth + "01' AND '" + currYear + currMonth + "31')";
        kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", sqlQuery, function(res) {
            kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData = res;
            var statusArray = ["ACCEPTED", "REJECTED", "PENDING", "CANCEL", "SENTBACK", "SAVED", "ERROR", "Submitted"];
            kony.apps.coe.ess.myTime.CalendarViewUI.isEmptyOrNot(function() {
                if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig.toLowerCase() == "monthly") {
                    if (kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData.length > 0) {
                        for (i = 0; i < kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData.length; i++) {
                            kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[i].status = statusArray[parseInt(kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[i].statusID)];
                            if ((kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[i].startDate.toString().slice(4, 6) == currMonth || kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[i].endDate.toString().slice(4, 6) == currMonth) && kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[i].status.toLowerCase() !== "cancel") {
                                kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[i].isValidTimesheet = true;
                            } else {
                                kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[i].isValidTimesheet = false;
                            }
                        }
                        //	frmCalendarView.lblTimesheetMonthlyViewStatus.text = kony.i18n.getLocalizedString("i18n.ess.myTime.frmSearchMyTime.lblshowLblStatusTxt.valueKA") + " : " + kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[0].status.toLowerCase();
                        (new kony.apps.coe.ess.myTime.CalendarViewUI()).mapBackendDataForMonthlyView();
                    } else {

                        //frmCalendarView.lblTimesheetMonthlyViewStatus.text = kony.i18n.getLocalizedString("i18n.ess.myTime.frmSearchMyTime.lblshowLblStatusTxt.valueKA") + " : ";
                        frmCalendarView.lblTHours.text = " - ";
                        frmCalendarView.lblBHours.text = " - ";
                        frmCalendarView.lblOHours.text = " - ";
                        //	frmCalendarView.flxTimesheetMonthlyViewDetails1.isVisible = false;
                        //	frmCalendarView.flxTimesheetMonthlyViewDetails2.isVisible = false;
                        //	frmCalendarView.flxTimesheetMonthlyViewDetails3.isVisible = false;
                    }
                } else {

                    var statusCount = {
                        "saved": 0,
                        "submitted": 0,
                        "pending": 0,
                        "accepted": 0,
                        "sentback": 0,
                        "rejected": 0
                    };
                    var i = 0;
                    var prevTimsheetID = null;
                    var prevTimesheetEnddate = null;
                    var tempData = {};
                    for (i = 0; i < kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData.length; i++) {
                        kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[i].status = statusArray[parseInt(kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[i].statusID)];
                        if ((kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[i].startDate.toString().slice(4, 6) == currMonth || kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[i].endDate.toString().slice(4, 6) == currMonth) && kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[i].status.toLowerCase() !== "cancel") {

                            if (kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[i].isEntryPresentForSaved === true) {
                                statusCount[kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[i].status.toLowerCase()] = statusCount[kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[i].status.toLowerCase()] + 1;
                            }
                            kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[i].isValidTimesheet = true;
                        } else {
                            kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[i].isValidTimesheet = false;
                        }
                    }
                    frmCalendarView.lblTimesheetStatusApprovedValueTab.text = "" + statusCount.accepted;
                    frmCalendarView.lblTimesheetStatusPendingValueTab.text = "" + statusCount.pending;
                    frmCalendarView.lblTimesheetStatusRejectedValueTab.text = "" + statusCount.rejected;
                    frmCalendarView.lblSentBackNo.text = "" + statusCount.sentback;
                    frmCalendarView.lblSavedNo.text = "" + statusCount.saved;
                    scopeObj.mappingBackendDataToCalendar();

                }
            }, function(err) {
                handleError(err);
            });
        }, function(err) {
            handleError(err);
        }, false);
        kony.print("-- End getCalendarViewData --");
    } catch (e) {
        handleError(e);
    }
};


kony.apps.coe.ess.myTime.CalendarViewUI.prototype.shiftingFlex = function() {
    try {
        if (kony.apps.coe.ess.myTime.CalendarViewUI.calendarWidget.calendarROWS <= 5) {
            kony.apps.coe.ess.myTime.CalendarViewUI.shiftFlexUp();
        } else {
            kony.apps.coe.ess.myTime.CalendarViewUI.shiftFlexDown();
        }
    } catch (e) {
        kony.print("-- error in animation --" + e);
    }

}
/**
 * @class       CalendarViewUI
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method maps the timesheet data from the backend to the calendar widget
 */
kony.apps.coe.ess.myTime.
CalendarViewUI.prototype.mappingBackendDataToCalendar = function() {
    try {
        kony.print("-- Start mappingBackendDataToCalendar --");
        //here 42 is the total number of cells in the calendar widget
        for (var i = 0; i < 42; i++) {
            for (var j = 0; j < kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData.length; j++) {

                var months = {
                    "Jan": "01",
                    "Feb": "02",
                    "Mar": "03",
                    "Apr": "04",
                    "May": "05",
                    "Jun": "06",
                    "Jul": "07",
                    "Aug": "08",
                    "Sep": "09",
                    "Oct": "10",
                    "Nov": "11",
                    "Dec": "12"
                };
                var currCellData = kony.apps.coe.ess.myTime.CalendarViewUI.calendarWidget.getCelldataAtIndex(i);
                var currCellDate = currCellData.LABEL.Date.split(' ');
                var currCellDateFormatted = currCellDate[3] + months["" + currCellDate[1]] + currCellDate[2];
                if (kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[j].isEntryPresentForSaved === false && kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[j].isValidTimesheet === true) {
                    if (currCellData.LABEL.isMothDay) {
                        var cellData = {
                            "CELL": {
                                "skin": "sknFlxBgFFFFFF0O"
                            },
                            "data": {
                                "CellData": kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[j],
                                "TYPE": ""
                            },
                            "IMAGE": {
                                "isVisible": false,
                                "src": ""
                            },
                            "LABEL": {
                                "skin": "sknBtnMobBg0OpFC333333Op100S24px"
                            }
                        };
                        kony.apps.coe.ess.myTime.CalendarViewUI.calendarWidget.setDataAtIndex(1, i, cellData);
                    } else {
                        var cellData = {
                            "CELL": {
                                "skin": "sknFlxBgFFFFFF0O"
                            },
                            "data": {
                                "CellData": kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[j],
                                "TYPE": ""
                            },
                            "IMAGE": {
                                "isVisible": false,
                                "src": ""
                            },
                            "LABEL": {
                                "skin": "sknBtnMobBg0OpFC777777Op100S24px"
                            }
                        };
                        kony.apps.coe.ess.myTime.CalendarViewUI.calendarWidget.setDataAtIndex(1, i, cellData);
                    }
                    continue;
                } else if (currCellDateFormatted == kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[j].startDate && kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[j].isValidTimesheet === true) {
                    var cellData = {
                        "CELL": {
                            "skin": "sknFlexMob" + kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[j].status.toLowerCase() + "LeftBar"
                        },
                        "data": {
                            "CellData": kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[j],
                            "TYPE": ""
                        },
                        "IMAGE": {
                            "isVisible": false,
                            "src": ""
                        },
                        "LABEL": {
                            "skin": "sknBtnMobBg0OpFCFFFFFFOp100S24px"
                        }
                    };
                    kony.apps.coe.ess.myTime.CalendarViewUI.calendarWidget.setDataAtIndex(1, i, cellData);
                    break;
                } else if (currCellDateFormatted == kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[j].endDate && kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[j].isValidTimesheet === true) {
                    var cellData = {
                        "CELL": {
                            "skin": "sknFlexMob" + kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[j].status.toLowerCase() + "RightBar"
                        },
                        "data": {
                            "CellData": kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[j],
                            "TYPE": ""
                        },
                        "IMAGE": {
                            "isVisible": false,
                            "src": ""
                        },
                        "LABEL": {
                            "skin": "sknBtnMobBg0OpFCFFFFFFOp100S24px"
                        }
                    };
                    kony.apps.coe.ess.myTime.CalendarViewUI.calendarWidget.setDataAtIndex(1, i, cellData);
                    break;
                } else if (currCellDateFormatted > kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[j].startDate && currCellDateFormatted < kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[j].endDate && kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[j].isValidTimesheet === true) {
                    var cellData = {
                        "CELL": {
                            "skin": "sknFlexMob" + kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[j].status.toLowerCase() + "MiddleBar"
                        },
                        "data": {
                            "CellData": kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[j],
                            "TYPE": ""
                        },
                        "IMAGE": {
                            "isVisible": false,
                            "src": ""
                        },
                        "LABEL": {
                            "skin": "sknBtnMobBg0OpFCFFFFFFOp100S24px"
                        }
                    };
                    kony.apps.coe.ess.myTime.CalendarViewUI.calendarWidget.setDataAtIndex(1, i, cellData);
                    break;
                }
            }
        }
        kony.print("-- End mappingBackendDataToCalendar --");
    } catch (e) {
        handleError(e);
    }
    kony.apps.coe.ess.myTime.CalendarViewUI.boldTheCurrentDate();

};
kony.apps.coe.ess.myTime.CalendarViewUI.boldTheCurrentDate = function() {
    var index = kony.apps.coe.ess.myTime.CalendarViewUI.calendarWidget.getIndexByDate(new Date());
    var data = kony.apps.coe.ess.myTime.CalendarViewUI.calendarWidget.getCelldataAtIndex((index));
    if (data === null || data === undefined) {
        return;
    }
    var labelSkin;
    if (data.data.CellData === "" || data.data.CellData.isEntryPresentForSaved === false) {
        LabelSkin = {
            "LABEL": {
                "skin": "sknBtnMobBoldBgBlack"
            }
        };
    } else {
        LabelSkin = {
            "LABEL": {
                "skin": "sknBtnMobBoldBgWhite"
            }
        };
    }
    kony.apps.coe.ess.myTime.CalendarViewUI.calendarWidget.setCellStatus(index, LabelSkin);
};
/**
 * @class       CalendarViewUI
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method handles the navigation to view timesheet form 
 */
kony.apps.coe.ess.myTime.
CalendarViewUI.prototype.navigateToViewTimesheetForm = function() {
    try {
        kony.print("-- Start navigateToViewTimesheetForm --");
        if (kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData.length > 0) {
            if (kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[0].status.toLowerCase() == "sentback") {
                kony.apps.coe.ess.myTime.CalendarViewUI.isSendBack = true;
            } else {
                kony.apps.coe.ess.myTime.CalendarViewUI.isSendBack = false;
            }

            kony.apps.coe.ess.myTime.CalendarViewUI.timeSheetId = kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[0].timesheetID;
        } else {

            kony.apps.coe.ess.myTime.CalendarViewUI.isSendBack = false;
            kony.apps.coe.ess.myTime.CalendarViewUI.timeSheetId = null;
        }
        (new kony.apps.coe.ess.myTime.CalendarViewUI()).loadDataView();
        kony.print("-- End navigateToViewTimesheetForm --");
    } catch (e) {
        handleError(e);
    }
};

/**
 * @class       CalendarViewUI
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method sets the backend data for monthly view to the history form 
 */
kony.apps.coe.ess.myTime.
CalendarViewUI.prototype.mapBackendDataForMonthlyView = function() {
    try {
        kony.print("-- Start mapBackendDataForMonthlyView --");
        var sqlQuery = "select tt.isovertime,te.Actual_hours,te.StatusId,p.isBillable,p.Planned_hours,p.project_name as projectname from timesheet ts left join time_entry te" +
            " on ts.id=te.timesheet_id left join Project_task pt on te.project_task_id=pt.id left join project p" +
            " on p.id=pt.project_id left join time_type tt on te.time_type_id=tt.id where ts.id='" + kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData[0].timesheetID + "' and te.StatusId != '3' ";
        kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", sqlQuery, function(data) {
            if (data.length > 0) {
                //  frmCalendarView.flxTimesheetMonthlyViewDetails1.isVisible = true;
                //  frmCalendarView.flxTimesheetMonthlyViewDetails2.isVisible = true;
                //  frmCalendarView.flxTimesheetMonthlyViewDetails3.isVisible = true;
                var overtimeHours = 0;
                var billableHours = 0;
                var totalHours = 0;
                var tempArr = [{
                    "projectName": null,
                    "time": 0
                }, {
                    "projectName": null,
                    "time": 0
                }];
                for (var i = 0; i < data.length; i++) {
                    totalHours = totalHours + parseInt(data[i].Actual_Hours);
                    if (tempArr[0].projectName === null) {
                        tempArr[0].projectName = data[i].projectname;
                    } else if (tempArr[0].projectName !== null && tempArr[1].projectName === null && tempArr[0].projectName != data[i].projectname) {
                        tempArr[1].projectName = data[i].projectname;
                    }
                    if (tempArr[0].projectName !== null && tempArr[0].projectName == data[i].projectname) {
                        tempArr[0].time = tempArr[0].time + parseInt(data[i].Actual_Hours);
                    } else if (tempArr[1].projectName !== null && tempArr[1].projectName == data[i].projectname) {
                        tempArr[1].time = tempArr[1].time + parseInt(data[i].Actual_Hours);
                    }
                    if (parseInt(data[i].ISOVERTIME) == 1) {
                        //      alert("in");
                        overtimeHours = overtimeHours + parseInt(data[i].Actual_Hours);
                    }
                    if (data[i].isBillable == 1) {
                        billableHours = billableHours + parseInt(data[i].Actual_Hours);
                    }
                }
                frmCalendarView.lblTHours.text = totalHours.toFixed();
                frmCalendarView.lblBHours.text = billableHours.toFixed();
                frmCalendarView.lblOHours.text = overtimeHours.toFixed();
                frmCalendarView.lblTimesheetDetails1.text = tempArr[0].projectName;
                frmCalendarView.lblTimesheetDetails1Value.text = tempArr[0].time + " h";
                if (tempArr[1].projectName === null) {
                    frmCalendarView.lblTimesheetDetails2.text = "";
                    frmCalendarView.lblTimesheetDetails2Value.text = "  ";
                } else {
                    frmCalendarView.lblTimesheetDetails2.text = tempArr[1].projectName;
                    frmCalendarView.lblTimesheetDetails2Value.text = tempArr[1].time + " h";
                }
            } else {
                frmCalendarView.lblTHours.text = " - ";
                frmCalendarView.lblBHours.text = " - ";
                frmCalendarView.lblOHours.text = " - ";
                // frmCalendarView.flxTimesheetMonthlyViewDetails1.isVisible = false;
                //frmCalendarView.flxTimesheetMonthlyViewDetails2.isVisible = false;
                //frmCalendarView.flxTimesheetMonthlyViewDetails3.isVisible = false;
            }

        }, function(err) {
            handleError(err);
        }, false);
        kony.print("-- End mapBackendDataForMonthlyView --");
        kony.apps.coe.ess.myTime.CalendarViewUI.boldTheCurrentDate();
    } catch (e) {
        handleError(e);
    }

};
kony.apps.coe.ess.myTime.CalendarViewUI.shiftFlexUp = function() {
    //var cell_height=8.2;
    kony.application.getCurrentForm().flxBlank1.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "0%",
                "top": 0 - 8.2 + "%",
                "height": "0.2%",
                "width": "100%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 1
        }, {
            "animationEnd": kony.print("---------upward movement---------")
        });
    kony.application.getCurrentForm().flxTimesheetTab.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "0%",
                "top": "0%",
                "height": 38.2 + 8.2 + "%",
                "width": "100%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.5
        }, {
            "animationEnd": kony.print("---------upward movement---------")
        });
};
kony.apps.coe.ess.myTime.CalendarViewUI.shiftFlexDown = function() {
    kony.application.getCurrentForm().flxTimesheetTab.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "0%",
                "top": "0%",
                "width": "100%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.5
        }, {
            "animationEnd": function() {
                kony.application.getCurrentForm().flxTimesheetTab.height = "38.2%";
                kony.application.getCurrentForm().flxTimesheetTab.forceLayout();
                kony.print("---------downward movement---------");
            }

        });
    kony.application.getCurrentForm().flxBlank1.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "0%",
                "top": "0%",
                "height": "0.2%",
                "width": "100%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 1
        }, {
            "animationEnd": kony.print("---------downward movement---------")
        });

};

kony.apps.coe.ess.myTime.
CalendarViewUI.prototype.onClickOfCalendarFlex = function(data1) {
    try {
        var extremeDates = kony.apps.coe.ess.myTime.CalendarViewUI.getCurrentTimesheetDataTab(data1);
        for (var i = 0; i < extremeDates.length; i++) {
            extremeDates[i].timesheetId = null;
            extremeDates[i].status = null;
        }
        //dateSectionData will be prepared by here. Passing it to Success
        success(extremeDates);
    } catch (err) {
        //	kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();

    //alert("Error in fetchData of controllerExtension" + text);
    }

    function success(response) {
        kony.sdk.mvvm.log.info("success fetching data ", response);
        kony.apps.coe.ess.myTime.timesheetHome.TimesheetRowTabObj = new kony.apps.coe.ess.myTime.TimesheetRow();
        //kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj = new kony.apps.coe.ess.myTime.TimesheetDatesSection(frmTimesheetHome.flxDateInDateSection, frmTimesheetHome.flxScrlDatesSection);
        //	if(kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj === null || kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj === undefined) {
        //    kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj = new kony.apps.coe.ess.myTime.TimesheetDatesSection(frmTimesheetHome.flxDateInDateSection, frmTimesheetHome.flxScrlDatesSection);    
        //}
        //kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj.labelDataMap = "displayValue";
        //	kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj.setData(data); //Setting Data
        //kony.apps.coe.ess.myTime.timesheetHome.TimesheetDatesSectionObj.setOnSelectionCallback(kony.apps.coe.ess.myTime.timesheetHome.onDateSelection); //ToDo : Add Function Here


    }

    function error(err) {
        //Error fetching data
        kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
        kony.sdk.mvvm.log.error("In fetchData errorcallback in controller extension ", err);

    }
};
kony.apps.coe.ess.myTime.
CalendarViewUI.prototype.populateInitialData = function(dateObj) {
    var startdate;
    var data;
    var sd;
    var ed;
    var dd;
    startdate = kony.apps.coe.ess.myTime.TimesheetDatesInterval.weekly(dateObj)[0].previousWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay)[0];

    data = [];
    sd = new Date(Date.parse(startdate) + 604800000);
    ed = new Date(Date.parse(sd) + 518400000);
    /*data.push({
    		displayValue : sd.getDate()+" "+sd.toString().slice(4,7)+"-" + ed.getDate()+" "+ed.toString().slice(4,7),
    		startDate : sd,
    		endDate : ed
    	});*/
    // dd = new Date(Date.parse(startdate) + 604800000+86400000+86400000+86400000);
    /*  frmCalendarView.lblWeekDate.text = sd.getDate().toString().slice(0, 3) + " " + sd.getDate().toString().slice(4, 7) + " - " + endDateFormat + "-" + ed.getDate().toString().slice(0, 3) + " " + ed.getDate().toString().slice(4, 7);

    for (var i = 1; i <= 5; i++) {
        dd = new Date(Date.parse(sd) + i * 86400000);
		frmCalendarView["lblDay" + i].text = "" + dd.getDate().toString().slice(0, 3) + " " + dd.getDate().toString().slice(4, 7);

    }
*/
    return data;
};


kony.apps.coe.ess.myTime.
CalendarViewUI.prototype.loadDataReview = function(data1) {
    var timesheetID = data1.timesheetId;
    var sqlQuery = "select te.date as date,pt.type, te.actual_hours as hours,te.Activity_Description,tt.isovertime,te.project_task_id as projecttaskID,te.time_type_id as timeTypeId,tt.name as time_type_name, p.project_name as projectname,t.task_name,p.id as proid,t.id as taskId, case when pt.task_id ='' then p.project_name else t.task_name end as task, p.isBillable from time_entry te left join project_task pt on pt.id = te.project_task_id left join project p on p.id = pt.project_id left join task t on pt.task_id = t.id left join time_type tt on te.time_type_id=tt.id where te.timesheet_id = '" + timesheetID + "' AND te.StatusId != '3';";
    kony.sync.single_select_execute(kony.sync.getDBName(), sqlQuery, null, success, error);
};

function success(res) {
    /*     if (res === null || res.length === 0) {
                      //It won't happen.
                      var dataToBind = {
                          "TotalHours": 0,
                          "BillableHours": 0,
                          "OvertimeHours": (0 - 0),
                          "DisplayValue": scopeObj.getController().getContextData().displayValue
                      };
                      kony.apps.coe.ess.myTime.TimesheetReview.Data.set({});
             bindData(dataToBind);
                      return res;
                  }
        //Group Data using Task/Project Name
                	for(var i = 0 ;i<res.length ;i++){
                    if (res[i].projecttaskID === null){
                      res[i].projecttaskID = "";
                    }
                  }
                  var groupedData = kony.apps.coe.makeGroups("projecttaskID", res);
                  var finalGroupedData = [];
                  for (var i = 0; i < groupedData.length; i++) {
                      finalGroupedData.push(kony.apps.coe.makeGroups("timeTypeId", groupedData[i]));
                  }
                  var processedSegmentData = kony.apps.coe.ess.myTime.TimesheetReview.getProcessedSegmentData(finalGroupedData);
                  var groupParams = {};
                  var totalHours = 0;
                  var billableHours = 0;
                  //Process & Prepare require JSON
                  for (var k = 0; k < res.length; k++) {
                      res[k].totalhours = groupParams[res[k].task] + " Hrs";
                      res[k].hours = res[k].hours + " Hrs";
                      var dateObj = kony.apps.coe.ess.myTime.dbDateStringToDateObj(res[k].date);
                      var dateString = dateObj.getDate() + " " + kony.apps.coe.ess.myTime.nToStr.month[dateObj.getMonth()];
                      res[k].date = dateString;
                  }
                  var contextData = scopeObj.getController().getContextData();
                  //Set Review Data
                  kony.apps.coe.ess.myTime.TimesheetReview.Data.set(res);
                  // 				Call initial function of ReviewTimesheet. Header data is set to null be default in initial call
                  // 				kony.apps.coe.ess.myTime.TimesheetReview.setData(null);
                  var bindData = {
                      "DisplayValue": scopeObj.getController().getContextData().displayValue,
                      "segmentData": processedSegmentData
                  };
                  this.getController().bindData(bindData);
                  return res;*/
}
/*function bindData(data) {
     frmTimesheetReview.segTimesheet.setData(data.segmentData);
            frmTimesheetReview.lblDuration.text = data.DisplayValue;
            kony.apps.coe.ess.myTime.TimesheetReview.setData(null);
            kony.sdk.mvvm.KonyApplicationContext.dismissLoadingScreen();
            this.getController().showForm();
			kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();}*/
function error(err) {}

kony.apps.coe.ess.myTime.
CalendarViewUI.prototype.loadDataView = function() {
    try {
        var query = "select ts.Status_Id as sheetStatus, ts.start_date,ts.end_date,tt.isovertime,tt.name as time_type_name,te.id,te.date,te.StatusId,st.Status_Name,te.Actual_hours,te.activity_description,te.start_time,te.end_time,te.created_on,te.Timesheet_id, te.time_type_id,te.employee_id,te.project_task_id,pt.type,p.isBillable,p.project_name as projectname,p.id as proid, p.project_description as proDes,p.Planned_hours,t.Task_name,t.id as taskId from timesheet ts left join time_entry te on ts.id=te.timesheet_id left join Project_task pt on te.project_task_id=pt.id left join project p on p.id=pt.project_id left join task t on t.id = pt.task_id left join time_type tt on te.time_type_id=tt.id left join status st on st.id=ts.Status_Id where ts.id='" + kony.apps.coe.ess.myTime.CalendarViewUI.timeSheetId + "' AND te.StatusId != '3';";
        kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, success1, error1);
    } catch (err) {
        kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");

    }

    function success1(response) {
        //	this.firstResponse = response;
        // var model = scopeObj.getController().getApplicationContext().getModel("Timesheet_Note", "MYTIME", {"access": "offline"});
        var query = "select tn.Added_On,tn.comments,tn.Employee_id,e.First_Name as name from Timesheet_note tn left join employee e on tn.employee_id=e.id where timesheet_id='" + kony.apps.coe.ess.myTime.CalendarViewUI.timeSheetId + "'";
        kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, querySuccess.bind(this, response), queryFailure);
        kony.sdk.mvvm.log.info("success fetching data ", response);
    }

    function error1(err) {
        kony.sdk.mvvm.log.error("In fetchData errorcallback in controller extension ", err);
    }

    function querySuccess(response1, response2) {
        var finalResponse = {};
        finalResponse.timeSheetEntries = response1;
        //  finalResponse.timeSheetComments = response2;
        var processedData = {};
        temp = finalResponse.timeSheetEntries;
        processedData.timeEntries = kony.apps.coe.ess.myTime.CalendarViewUI.getProcessedData(finalResponse.timeSheetEntries);
        kony.apps.coe.ess.myTime.CalendarViewUI.setDataToViewTimeSheet(processedData.timeEntries);
        kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();

    }

    function queryFailure(err) {
        kony.print("Error in query Failure " + err);
    }
};

function success1(res) {
    var query = "select tn.Added_On,tn.comments,tn.Employee_id,e.First_Name as name from Timesheet_note tn left join employee e on tn.employee_id=e.id where timesheet_id='" + kony.apps.coe.ess.myTime.CalendarViewUI.timeSheetId + "'";
    kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, querySuccess.bind(this, response), queryFailure);
}

function error1(err) {}
kony.apps.coe.ess.myTime.CalendarViewUI.setDataToViewTimeSheet = function(data) {
    kony.print("-- Start setDataToViewTimeSheet --");
//  alert("setDataToViewTimeSheet "+JSON.stringify(data));
    try {
        if (data !== null || data !== undefined || data.length > 0) {
            frmCalendarView.lblNoResult.setVisibility(false);
            frmCalendarView.segmentData.setData(data);
        } else {
            frmCalendarView.lblNoResult.setVisibility(true);
        }
        var today = new Date();
        //	frmCalendarView.lblCurrentMonth.text = kony.apps.coe.ess.myTime.nToStr.fullmonth[today.getMonth()];
        //	frmCalendarView.lblCurrentYear.text = today.getFullYear().toFixed(0);
        frmCalendarView.lblOHours.text = kony.apps.coe.ess.myTime.CalendarViewUI.overtimeHours.toFixed(2);
        frmCalendarView.lblTHours.text = kony.apps.coe.ess.myTime.CalendarViewUI.totalHours.toFixed(2);
        frmCalendarView.lblBHours.text = kony.apps.coe.ess.myTime.CalendarViewUI.billableHours.toFixed(2);
        var status = (kony.apps.coe.ess.myTime.CalendarViewUI.getStatus(kony.apps.coe.ess.myTime.CalendarViewUI.status));
        frmCalendarView.lblApproved.skin = status.skin;
        frmCalendarView.lblApproved.text = status.text;
        if (status.centerY === "") {
            frmCalendarView.lblApproved.centerY = status.centerY;
            frmCalendarView.lblApprovedDate.isVisible = false;
        } else {
            frmCalendarView.lblApproved.centerY = status.centerY;
            frmCalendarView.lblApprovedDate.isVisible = true;
        }
    } catch (err) {
        //alert(err.message);
    }
    kony.print("-- End setDataToViewTimeSheet --");
};

kony.apps.coe.ess.myTime.CalendarViewUI.getProcessedData = function(data) {
    kony.print("-- Start getProcessedData --");
 // alert("Processed data \n"+data);
    var finalData = [];
    if (data === null || data.length <= 0) {
        return finalData;
    }
    /* if (kony.apps.coe.ess.myTime.CalendarViewUI.isData(data[0].Start_Date) && kony.apps.coe.ess.myTime.CalendarViewUI.isData(data[0].End_Date)) {
        var dateString = data[0].Start_Date.toString();
        var startDate = new Date(dateString.substring(0, 4), (dateString.substring(4, 6)) - 1, dateString.substring(6, 8));
        kony.apps.coe.ess.myTime.CalendarViewUI.startTime = startDate;
        var startDateFormat = startDate.getDate() + " " + kony.apps.coe.ess.myTime.nToStr.month[startDate.getMonth()];
        dateString = data[0].End_Date.toString();
        var endDate = new Date(dateString.substring(0, 4), (dateString.substring(4, 6)) - 1, dateString.substring(6, 8));
        kony.apps.coe.ess.myTime.CalendarViewUI.endTime = endDate;
        var endDateFormat = endDate.getDate() + " " + kony.apps.coe.ess.myTime.nToStr.month[endDate.getMonth()];
      // frmCalendarView.lblWeekDate.text = startDateFormat + " - " + endDateFormat;
        //	frmCalendarView.errordarkbackground.isVisible = false;
        switch(data[0].sheetStatus){
			case '5':
				frmCalendarView.lblWeekDate.skin = "sknLblMobOp100Bg1C7393cFFFFFF";
				break;
			case '7':
				frmCalendarView.lblWeekDate.skin = "sknLblMobOp100Bg2EBAEEcFFFFFF";
				break;
			case '2':
				frmCalendarView.lblWeekDate.skin = "sknLblMobOp100BgFAB745cFFFFFF";
				break;
			case '0':
				frmCalendarView.lblWeekDate.skin = "sknLblMobOp100Bg00C6AEcFFFFFF";
				break;
			case '4':
				frmCalendarView.lblWeekDate.skin = "sknLblMobOp100BgFA713AcFFFFFF";
				break;
			case '1':
				frmCalendarView.lblWeekDate .skin = "sknLblMobOp100BgFF3B30cFFFFFF";
				break;
            case '6':
				frmCalendarView.lblWeekDate.skin = "sknLblMobOp100Bg2EBAEEcFFFFFF";
            //	frmCalendarView.errordarkbackground.isVisible = true;
            	break;
			
			default:
            	handleError("Error in Status skin");
				break;
		}
    }*/
    //frmCalendarView.lblSubmittedDate.text = data[0].Created_On;
    kony.apps.coe.ess.myTime.CalendarViewUI.overtimeHours = 0;
    kony.apps.coe.ess.myTime.CalendarViewUI.billableHours = 0;
    kony.apps.coe.ess.myTime.CalendarViewUI.totalHours = 0;
    kony.apps.coe.ess.myTime.CalendarViewUI.empId = data[0].Employee_Id;
    for (i = 0; i < data.length; i++) {
        if (data[i].Project_Task_id === "" || data[i].Project_Task_id === null || data[i].Project_Task_id === undefined) {
            data[i].Project_Task_id = "";
        }
    }
    var groupedData = kony.apps.coe.makeGroups("Project_Task_id", data);
    var finalGroupedData = [];
    for (var i = 0; i < groupedData.length; i++) {
        finalGroupedData.push(kony.apps.coe.makeGroups("Time_Type_Id", groupedData[i]));
    }
    var totalHours = 0;
    var overtimeHours = 0;
    var billableHours = 0;
    var sumOfHours = 0;
    for (var i = 0; i < finalGroupedData.length; i++) {
        for (var j = 0; j < finalGroupedData[i].length; j++) {
            sumOfHours = 0;
            for (x = 0; x < finalGroupedData[i][j].length; x++) {
                sumOfHours = sumOfHours + parseFloat(finalGroupedData[i][j][x].Actual_Hours)
                if (parseInt(finalGroupedData[i][j][x].ISOVERTIME) == 1) {
                    overtimeHours = overtimeHours + parseFloat(finalGroupedData[i][j][x].Actual_Hours);
                }
                if (parseInt(finalGroupedData[i][j][x].isBillable) == 1) {
                    billableHours = billableHours + parseFloat(finalGroupedData[i][j][x].Actual_Hours);
                }
            }
            totalHours = totalHours + sumOfHours;
            var timeentry = {};
            if (finalGroupedData[i][j][0].Project_Task_id == "") {
                var hours = 0;
                for (k = 0; k < finalGroupedData[i][j].length; k++) {
                    hours += parseFloat(finalGroupedData[i][j][0].Actual_Hours);
                }
                timeentry.lblTaskName = finalGroupedData[i][j][0].time_type_name;
                timeentry.lblProductiveHours = finalGroupedData[i][j][0].time_type_name !== null ? finalGroupedData[i][j][0].time_type_name.toString() : "";
                timeentry.lblProductiveHoursValue = parseFloat(hours).toFixed(2) + "h";
                timeentry.lblLine = " ";
                timeentry.template = flxOuterOne;
            } else

            {
                timeentry.lblProjectName = finalGroupedData[i][j][0].projectname !== null ? finalGroupedData[i][j][0].projectname.toString() : "";
                timeentry.lblTaskName = finalGroupedData[i][j][0].Task_Name !== null ? finalGroupedData[i][j][0].Task_Name.toString() : finalGroupedData[i][j][0].Project_Task_id;
                timeentry.lblDescription = finalGroupedData[i][j][0].Activity_Description.toString();
                if ((finalGroupedData[i][j][0].Type !== null && finalGroupedData[i][j][0].Type !== "" && finalGroupedData[i][j][0].Type !== undefined)) {
                    var index = (finalGroupedData[i][j][0].Type).indexOf("|");
                    var type1 = index !== -1 ? (finalGroupedData[i][j][0].Type).substring(0, index) : (finalGroupedData[i][j][0].Type);
                    var type2 = index !== -1 ? ((finalGroupedData[i][j][0].Type).substring(index + 1, (finalGroupedData[i][j][0].Type).length)) : "";
                    var type1Value = ((finalGroupedData[i][j][0].proid) !== null && (finalGroupedData[i][j][0].proid) !== undefined) ? (finalGroupedData[i][j][0].proid).replace(type1, "") : "-";
                    var type2Value = ((finalGroupedData[i][j][0].taskId) !== null && (finalGroupedData[i][j][0].taskId) !== undefined) ? (finalGroupedData[i][j][0].taskId).replace(type2, "") : "";
                    timeentry.lblCostCenter = type1 + " - " + type1Value;
                    timeentry.lblActivityId = type2 + " - " + type2Value;
                    timeentry.lblLine = " ";
                }

                timeentry.lblProductiveHoursValue = sumOfHours.toString() + 'h';
                timeentry.lblProductiveHours = finalGroupedData[i][j][0].time_type_name !== null ? finalGroupedData[i][j][0].time_type_name.toString() : "";
                timeentry.template = flxOuterOne;
            }
            finalData.push(timeentry);
        }
    }
    kony.apps.coe.ess.myTime.CalendarViewUI.totalHours = totalHours;
    kony.apps.coe.ess.myTime.CalendarViewUI.overtimeHours = overtimeHours;
    kony.apps.coe.ess.myTime.CalendarViewUI.billableHours = billableHours;
    kony.apps.coe.ess.myTime.CalendarViewUI.status = data[0].Status_Name;

    //setting the cloneData to the picker View

    /*
	var SelectedTimesheetInfo = kony.apps.coe.ess.myTime.CalendarViewUI.selectedTimesheetData;

	var currentSelectedTimesheetStartDate = new Date();
	currentSelectedTimesheetStartDate.setDate(SelectedTimesheetInfo.startDate.substring(6, 8));
	currentSelectedTimesheetStartDate.setMonth(parseInt(SelectedTimesheetInfo.startDate.substring(4, 6)) - 1);
	currentSelectedTimesheetStartDate.setFullYear(SelectedTimesheetInfo.startDate.substring(0, 4));

	var currentSelectedTimesheetEndDate = new Date();
	currentSelectedTimesheetEndDate.setDate(SelectedTimesheetInfo.endDate.substring(6, 8));
	currentSelectedTimesheetEndDate.setMonth(parseInt(SelectedTimesheetInfo.endDate.substring(4, 6)) - 1);
	currentSelectedTimesheetEndDate.setFullYear(SelectedTimesheetInfo.endDate.substring(0, 4));

	var CloningTimesheetsData = kony.apps.coe.ess.myTime.cloning.getTimeSheetsDataForCloning(currentSelectedTimesheetStartDate, currentSelectedTimesheetEndDate);
*/
    //chainging Data to the pickerview Format
    /*   var CloningTimesheetsData = kony.apps.coe.ess.myTime.TimesheetCreate.Clone.pickerViewData(startDate);    
	CloningTimesheetsData.sort(function(a,b){
      	 return new Date(a.startDate)-new Date(b.startDate);
    });
  	var outPickOuterArray = [];
  	var pickerviewMasterData = [];
	for (var i = 0; i < CloningTimesheetsData.length; i++) {
      	var startDateValue =  CloningTimesheetsData[i].startDate ;
      	var endDateValue = CloningTimesheetsData[i].endDate;
		var key =  startDateValue + "-" + endDateValue;
      	var value = startDateValue.substring(8, 10) +" "+ startDateValue.substring(4, 7) + " - " + endDateValue.substring(8, 10) +" "+ endDateValue.substring(4, 7) ;
		pickerviewMasterData.push([key, value]);

	}
  	pickerviewMasterData.push(100);
  	outPickOuterArray.push(pickerviewMasterData);
  	kony.print(pickerviewMasterData);
	frmCalendarView.pickerViewDates.masterData=outPickOuterArray;*/
    kony.apps.coe.ess.myTime.CalendarViewUI.getSubmittedDate(data);
    kony.print("-- End getProcessedData --");
    return (finalData);
};
/**
 * @function - isData
 * @params	-data: String.
 * @returns	-boolean.
 * @desc	-This function validates whether given string contains proper data or not
 */
kony.apps.coe.ess.myTime.CalendarViewUI.isData = function(data) {
    kony.print("-- Start isData --");
    if (data !== null || data !== undefined || data !== "") {
        kony.print("-- End isData --");
        return true;
    } else {
        kony.print("-- End isData --");
        return false;
    }
};

kony.apps.coe.ess.myTime.CalendarViewUI.getStatus = function(status) {
    var Status = {};
    switch (status.toUpperCase()) {
        case "APPROVED":
            Status = {
                "skin": "sknLblAccepted",
                "text": status,
                "centerY": ""
            };
            break;
        case "REJECTED":
            Status = {
                "skin": "sknlblRejected",
                "text": status,
                "centerY": ""
            };
            break;
        case "PENDING":
            Status = {
                "skin": "sknLblApprovalPending",
                "text": "Approval Pending",
                "centerY": "50%"
            };
            break;
        case "SAVED":
            Status = {
                "skin": "sknlblSaved",
                "text": status,
                "centerY": "50%"
            };
            break;
        case "ERROR":
            Status = {
                "skin": "sknlblRejected",
                "text": status,
                "centerY": "50%"
            };
            break;
        case "SUBMITTED":
            Status = {
                "skin": "sknlblSubmitted",
                "text": "Pending Submission",
                "centerY": "50%"
            };
    }
    return Status;
};
kony.apps.coe.ess.myTime.CalendarViewUI.getSubmittedDate = function(data) {
    if (data === null || data.length <= 0) {
        return;
    }
    var query = "select t.SubmittedOn from Timesheet t where Id='" + data[0].Timesheet_Id + "'";
    kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query,
        kony.apps.coe.ess.myTime.CalendarViewUI.formattingdate,
        function(err) {
            handleError(err);
        });
};

/**
 * @function - formattingdate
 */
kony.apps.coe.ess.myTime.CalendarViewUI.formattingdate = function(resDate) {

    if (resDate === null || resDate.length <= 0) {
        frmCalendarView.lblSubmittedDate.text = "-";
        return;
    }
    var date = resDate[0].SubmittedOn;
    if (date === null || date === undefined || isNaN(parseInt(date))) {
        frmCalendarView.lblSubmittedDate.text = "-";
        return;
    }
    var day = date.substring(6, 8);
    var month = kony.apps.coe.ess.myTime.nToStr.fullmonth[(parseInt(date.substring(4, 6)) - 1)];
    var year = date.substring(0, 4);
    var hour = date.substring(8, 10);
    var min = date.substring(10, 12);
    var type;
    if (hour >= 12) {
        type = "PM";
    } else {
        type = "AM";
    }
    if (hour > 12) {
        hour -= 12;
    }
    var finalDate = day + " " + month + " " + year + ", " + hour + ":" + min + " " + type;
    frmCalendarView.lblSubmittedDate.text = finalDate;
};
kony.apps.coe.ess.myTime.
CalendarViewUI.getCurrentTimesheetDataTab = function(dateObj) {
    globalDateObj = dateObj.getFullYear();
    var startdate;
    var sd;
    var ed;
    var data;
    data = [];

    startdate = kony.apps.coe.ess.myTime.TimesheetDatesInterval.weekly(dateObj)[0].previousWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay)[0];

    dd = new Date(Date.parse(startdate) + 604800000 + 86400000 + 86400000 + 86400000);
    sd = new Date(Date.parse(startdate) + 604800000);
    ed = new Date(Date.parse(sd) + 518400000);
 

    kony.apps.coe.ess.myTime.CalendarViewUI.fetchTimeEntries(sd, ed, function(res) {
    }, function(err) {
        //fetchTimesheetEntries Error
        handleError(err);
    });
    frmCalendarView.lblWeekDate.text = sd.getDate() + " " + sd.toString().slice(4, 7) + "-" + ed.getDate() + " " + ed.toString().slice(4, 7);
    for (var i = 1; i <= 5; i++) {
        dd = new Date(Date.parse(sd) + i * 86400000);
        frmCalendarView["lblDay" + i].text = "" + dd.getDate().toString().slice(0, 3) + " " + dd.toString().slice(4, 7);
    }

    if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig.toLowerCase() === "weekly") {
        startdate = kony.apps.coe.ess.myTime.TimesheetDatesInterval.weekly(dateObj)[0].previousWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay)[0];
        data = [];
        for (var i = 0; i <= 1; i++) {
            sd = new Date(Date.parse(startdate) + i * 604800000);
            ed = new Date(Date.parse(sd) + 518400000);

            data.push({
                displayValue: sd.getDate() + " " + sd.toString().slice(4, 7) + "-" + ed.getDate() + " " + ed.toString().slice(4, 7),
                startDate: sd,
                endDate: ed
            });
        }

        return data;
    } else if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig.toLowerCase() === "biweekly") {
        startdate = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(dateObj)[0].previousWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay)[0];
        data = [];
        for (var i = 0; i <= 2; i++) {
            sd = new Date(Date.parse(startdate) + i * 604800000);
            ed = new Date(Date.parse(sd) + 518400000);
            data.push({
                displayValue: sd.getDate() + " " + sd.toString().slice(4, 7) + "-" + ed.getDate() + " " + ed.toString().slice(4, 7),
                startDate: sd,
                endDate: ed
            });
        }

        return data;
    } else if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig.toLowerCase() === "monthly") {
        var sdedm = kony.apps.coe.ess.myTime.TimesheetDatesInterval.monthly(dateObj);
        startdate = sdedm[0].thisWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay)[0];
        var enddate = sdedm[1].thisWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay)[1];
        var nweeks = (Date.parse(enddate) - Date.parse(startdate)) / 604800000;
        data = [];
        for (var i = 0; i < nweeks; i++) {
            sd = new Date(Date.parse(startdate) + i * 604800000);
            ed = new Date(Date.parse(sd) + 518400000);
            data.push({
                displayValue: "week " + (i + 1),
                startDate: sd,
                endDate: ed
            });
        }

        return data;
    }
    return data;
};


/**
 * Fetch all Time Entries for given timesheet_id and dates
 * @param {string} $timesheetID
 *		Timesheet ID
 * @param {string} $fromDate
 *		Time sheet entries which are above this date. Should be in DDDDMMYY format
 * @param {string} $toDate
 *		Timesheet entries whihc are below this date. Should be in DDDDMMYY format
 * @param {function(Object[])} $successCall
 *		Success Callback. Array of Task Entries are returned/passed as input param
 * @param {function({Object})} $failureCall
 *		Failure Callback. Reason for falire is passed as input param
 */
kony.apps.coe.ess.myTime.CalendarViewUI.fetchTimeEntries = function(weekStart, weekEnd, successCall, failureCall) {
    var fromDate = weekStart.toYYYYMMDD("");
    var toDate = weekEnd.toYYYYMMDD("");

    var sqlQuery = "SELECT TE.Id, PT.Type as Project_Task_Type, TE.Date, TE.Start_Time, TE.StatusId as StatusId, TE.End_Time, TE.Project_Task_id, TE.Time_Type_Id, TE.Activity_Description," +
        " CASE WHEN P.isBillable IS NULL THEN 0 ELSE P.isBillable END as isBillable," +
        " CASE WHEN TE.Project_Task_Id IS NULL OR TE.Project_Task_id IS '' THEN TT.Name" +
        " WHEN PT.Task_Id = '' THEN P.Project_Name" +
        " ELSE T.Task_Name END as Name, S.Status_Name as Status FROM Time_Entry TE" +
        " LEFT JOIN Project_Task PT on TE.Project_Task_Id = PT.Id" +
        " LEFT JOIN Project P on PT.Project_Id = P.Id" +
        " LEFT JOIN Task T on PT.Task_Id = T.id" +
        " LEFT JOIN Status S on TE.StatusId = S.Id" +
        " LEFT JOIN Time_Type TT on TE.Time_Type_Id = TT.Id" +
        //         " WHERE TE.Timesheet_Id = '"+timesheetID+"' "+
        " WHERE TE.Date >= '" + fromDate + "' " +
        " AND TE.Date <= '" + toDate + "' " +
        " AND TE.StatusId != '3'";
    kony.sync.single_select_execute(kony.sync.getDBName(), sqlQuery, null, function(res) {
        //Query Success
        //	kony.apps.coe.ess.myTime.CalendarViewUI.processTimesheetEntries(res, successCall);
    }, function(err) {
        //Query Failed
       // alert(err.message);
        failureCall(err);
    });
};


/**
 * @class       TimesheetCreate
 * @type        function
 * @param       data set to set in segment 
 * return       None.
 * desc         This method sets the data to segment
 */
kony.apps.coe.ess.myTime.CalendarViewUI.prototype.updateSegment = function() {
    kony.print("--------------------start updateSegment--------------------");

    /*
    if (temp[parseInt(i)] != null || temp[parseInt(i)] != undefined) {
        var overtimeHours = 0;
        var billableHours = 0;

        var data = [];

        if ((temp[parseInt(i)].ISOVERTIME) == 1) {
            overtimeHours = overtimeHours + parseFloat(temp[i].Actual_Hours);
        }
        if ((temp[parseInt(i)].isBillable) == 1) {
            billableHours = billableHours + parseFloat(temp[i].Actual_Hours);
        }
        data.push({
            "lblProjectName": temp[parseInt(i)].projectname,
            "lblProductiveHours": temp[parseInt(i)].time_type_name,
            "lblDescription": temp[parseInt(i)].Activity_Description,
            "lblProductiveHoursValue": temp[parseInt(i)].Actual_Hours,
            "lblTaskName": temp[parseInt(i)].Project_Task_id,
            "lblCostCenter": temp[parseInt(i)].proid,
            "lblActivityId": temp[parseInt(i)].StatusId
        });

        if (data !== null || data !== undefined || data.length > 0) {
            frmCalendarView.lblNoResult.setVisibility(false);
            frmCalendarView.lblTHours.text = temp[parseInt(i)].Actual_Hours;
            frmCalendarView.lblBHours.text = billableHours.toFixed(2);
            frmCalendarView.lblOHours.text = overtimeHours.toFixed(2);
            frmCalendarView.segmentData.setData(data);
        } else {
            frmCalendarView.lblNoResult.setVisibility(true);
            frmCalendarView.lblTHours.text = "-";
            frmCalendarView.lblBHours.text = "-";
            frmCalendarView.lblOHours.text = "-";
        }
    } else {
        frmCalendarView.lblNoResult.setVisibility(true);
    }
*/
    kony.print("--------------------end updateSegment--------------------");
};

kony.apps.coe.ess.myTime.CalendarViewUI.prototype.CopyWeekTimesheet = function() {
    kony.print("-- Start CopyWeekTimesheet --");

    var selectedIndex = frmCalendarView.segCopy.selectedRowIndex;

    var selectedValue = frmCalendarView.segCopy.data[selectedIndex[1]];

    if (selectedValue.imgActiveInactive === "checkboxinactive.png") {
        selectedValue.imgActiveInactive = "checkboxactive.png";
    } else {
        selectedValue.imgActiveInactive = "checkboxinactive.png";
    }
    frmCalendarView.segCopy.setDataAt(selectedValue, selectedIndex[1], selectedIndex[0]);

    kony.print("-- End CopyWeekTimesheet --");

};
kony.apps.coe.ess.myTime.CalendarViewUI.prototype.CopyWeekTimesheetConfirm = function() {
    var activeImg;
    var selectedWeeks = [];
    var date;
    var k = 0;
    for (var i = 0; i < frmCalendarView.segCopy.data.length; i++) {
        activeImg = frmCalendarView.segCopy.data[i].imgActiveInactive;
        if (activeImg == "checkboxactive.png") {
            selectedWeeks.push(frmCalendarView.segCopy.data[i]);
            date = selectedWeeks[k].displayValue;
            (new kony.apps.coe.ess.myTime.CalendarViewUI()).cloneAllSelectedWeeks(date, selectedWeeks[k++].startDate);
        }
    }
(new kony.apps.coe.ess.myTime.CalendarViewUI()).monthRefresh();
};

/**
 * @function - cloneAllSelectedWeeks
 * @desc	-This function Clones the pending and submitted timesheets
 */

kony.apps.coe.ess.myTime.CalendarViewUI.prototype.cloneAllSelectedWeeks = function(date, fullYear) {
    kony.application.showLoadingScreen("", "Cloning Timesheet", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    kony.apps.coe.ess.myTime.getTimesheetDataForADate(new Date(date.split("-")[0]), function(response) {
        if (response === null || response.Status_Id === "1" || response.Status_Id === "5" || response.Status_Id === "6") {
            kony.apps.coe.ess.myTime.TimesheetCreate.Clone.CloneTimesheet(new Date((frmCalendarView.lblWeekDate.text).split("-")[0] + " " + globalDateObj), new Date(date.split("-")[0] + " " + fullYear),
                function(response) {
                    kony.application.dismissLoadingScreen();
                },
                function(error) {
                    handleError(error);
                    kony.application.dismissLoadingScreen();
                });
        } else {
            kony.application.dismissLoadingScreen();
            alert("Timesheet is not editable state.");
        }
    }, function(error) {
        handleError(error);
        kony.application.dismissLoadingScreen();
    });
};
kony.apps.coe.ess.myTime.CalendarViewUI.prototype.populateSegmentData = function() {
    /* var date = new Date();
      var interval = kony.apps.coe.ess.myTime.TimesheetDatesInterval.getTimesheetStartAndEndDates(date, new Date(date.getFullYear(), 1, 1));
      var sd = interval[0];
      var ed = interval[1];
      var weekArray=[];
    frmCalendarView.segCopy.widgetDataMap={"imgSegCopy":"imgActiveInactive",
                                           "btnSegCopy":"lblWeek"};
    weekArray.push({imgActiveInactive:"checkboxinactive.png",
                    lblWeek:sd.getDate() +" "+ sd.getMonth() +" - "+ ed.getDate() +" "+ ed.getMonth() });*/
    var date = new Date();
    var sd;
    var ed;
    var sdedm = kony.apps.coe.ess.myTime.TimesheetDatesInterval.monthly(date);
    startdate = sdedm[0].thisWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay)[0];
    var enddate = sdedm[1].thisWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay)[1];
    var nweeks = (Date.parse(enddate) - Date.parse(startdate)) / 604800000;
    var data = [];
    frmCalendarView.segCopy.widgetDataMap = {
        "imgSegCopy": "imgActiveInactive",
        "btnSegCopy": "displayValue"
    };
    for (var i = 0; i < nweeks; i++) {
        sd = new Date(Date.parse(startdate) + i * 604800000);
        ed = new Date(Date.parse(sd) + 518400000);
        data.push({
            displayValue: sd.getDate() + " " + sd.toString().slice(4, 7) + " - " + ed.getDate() + " " + ed.toString().slice(4, 7),
            startDate: sd.getFullYear(),
            imgActiveInactive: "checkboxinactive.png"
        });
    }
    frmCalendarView.segCopy.setData(data);
};