kony = kony || {};
kony.apps = kony.apps || {};
kony.apps.coe = kony.apps.coe || {};
kony.apps.coe.ess = kony.apps.coe.ess || {};
kony.apps.coe.ess.myTime = kony.apps.coe.ess.myTime || {};

kony.apps.coe.ess.myTime.ListViewTabUI = function() {
    kony.print("-- Start ListViewTabUI --");
    kony.print("-- End ListViewTabUI --");
};

var temp = null;
var finalResponse = {};
var processedData = {};

kony.apps.coe.ess.myTime.ListViewTabUI.prototype.listViewPreshow = function() {
    try {
        kony.print("-- Start listViewPreshow --");
        kony.apps.coe.ess.myTime.ListViewTabUI.monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var currDate = new Date();
        //#ifndef windows8
        frmListView.lblMonth.text = kony.apps.coe.ess.myTime.ListViewTabUI.monthsArray[currDate.getMonth()];
        frmListView.lblYear.text = currDate.getFullYear().toString().trim(0, 4);
        //#endif
        var edate = this.getCurrentTimesheetDataTab();
        (new kony.apps.coe.ess.myTime.ListViewTabUI()).navigateToViewTimesheetForm();
        this.handleSearchOperation();
        kony.print("-- End listViewPreshow --");
    } catch (e) {}
};
kony.apps.coe.ess.myTime.ListViewTabUI.prototype.onClickOfSentBack = function() {

    if (frmListView.btnsentBack.skin == "sknWbtnBl") {
        frmListView.btnsentBack.skin = "sknWBtnBlueborder";
        frmListView.btnSaved.skin = "sknWbtnBl";
        frmListView.flxSentBackDates.isVisible = true;
        frmListView.flxViewDates.isVisible = false;

    }
    //#ifndef windows8  
    if (frmListView.btnsentBack.skin == "sknBtnBgf4f4f4Fc526270Fs32px") {
        frmListView.btnsentBack.skin = "sknBtnBg4a90e2FcffffffFs32px";
        frmListView.btnSaved.skin = "sknBtnBgf4f4f4Fc526270Fs32px";
        frmListView.flxSentBackDates.isVisible = true;
        frmListView.flxViewDates.isVisible = false;

    }
    //#endif

};
kony.apps.coe.ess.myTime.ListViewTabUI.prototype.onClickOfSaved = function() {
    if (frmListView.btnsentBack.skin == "sknWBtnBlueborder") {
        frmListView.btnsentBack.skin = "sknWbtnBl";
        frmListView.btnSaved.skin = "sknWBtnBlueborder";
        frmListView.flxSentBackDates.isVisible = false;
        frmListView.flxViewDates.isVisible = true;

    }
    //#ifndef windows8
    if (frmListView.btnSaved.skin == "sknBtnBgf4f4f4Fc526270Fs32px") {
        frmListView.btnSaved.skin = "sknBtnBg4a90e2FcffffffFs32px";
        frmListView.btnsentBack.skin = "sknBtnBgf4f4f4Fc526270Fs32px";
        frmListView.flxSentBackDates.isVisible = false;
        frmListView.flxViewDates.isVisible = true;
    }
    //#endif

};

kony.apps.coe.ess.myTime.ListViewTabUI.prototype.getCurrentTimesheetDataTab = function() {
    var startdate;
    var sd;
    var ed;
    var data;
    data = [];
    var dateObj = new Date();
    startdate = kony.apps.coe.ess.myTime.TimesheetDatesInterval.weekly(dateObj)[0].previousWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay)[0];
    dd = new Date(Date.parse(startdate) + 604800000 + 86400000 + 86400000 + 86400000);
    sd = new Date(Date.parse(startdate) + 604800000);
    ed = new Date(Date.parse(sd) + 518400000);
    if (kony.apps.coe.ess.globalVariables.timesheetLengthConfig.toLowerCase() === "weekly") {
        //  alert("weekly");
        var june1;
        startdate = kony.apps.coe.ess.myTime.TimesheetDatesInterval.weekly(dateObj)[0].previousWeekInterval(kony.apps.coe.ess.appconfig.weekStartDay)[0];
        data = [];
        for (var i = 0; i <= 1; i++) {
            sd = new Date(Date.parse(startdate) + i * 604800000);
            ed = new Date(Date.parse(sd) + 518400000);

            data.push({
                //lblWeek : sd.getDate()+" "+sd.toString().slice(4,7)+"-" + ed.getDate()+" "+ed.toString().slice(4,7),
            });
        }
        //          alert("data1 "+JSON.stringify(data));

        frmListView.segViewDates.setData(data);

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
        alert("data2 " + JSON.stringify(data));

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
        alert("data3 " + JSON.stringify(data));

        return data;
    }
    alert("datalast " + JSON.stringify(data));
    return data;
};
kony.apps.coe.ess.myTime.ListViewTabUI.prototype.handleSearchOperation = function() {
    kony.print("-- Start handleSearchOperation --");
    //  var fromDateCldrWidget = frmSearchMyTime.cldrFromSearch;
    //  var toDateCldrWidget = frmSearchMyTime.cldrToSearch;
    var billableValue = 0;
    var searchQuery = "";
    //var selectedFromDate = new Date(fromDateCldrWidget.year, fromDateCldrWidget.month - 1, fromDateCldrWidget.day).toYYYYMMDD("");
    //  var selectedToDate = new Date(toDateCldrWidget.year, toDateCldrWidget.month - 1, toDateCldrWidget.day).toYYYYMMDD("");
    //var selectedStatusValues = kony.apps.coe.ess.myTime.Search.statusIdString;
    var selectedStatusValues = 5;
    var selectedFromDate = 20160601;
    var selectedToDate = 20170225;
    // june1 = new Date(rightNow.getFullYear(), selectedFromDate.slice(4,6), selectedFromDate.slice(6,8), 0, 0, 0, 0);
    //   june1 = new Date(selectedFromDate.slice(4,6), selectedFromDate.slice(4,6), selectedFromDate.slice(6,8), 0, 0, 0, 0);

    /*  if (frmSearchMyTime.lbShow.selectedKey === "lb1") {
          billableValue = 0;
      } else {
          billableValue = 1;
      }*/
    //   if (frmSearchMyTime.lbView.selectedKey === "lb1") {
    //Todo status is getting as not configured .Need to figure out it .
    if (selectedStatusValues === "") {
        searchQuery = "select ts.Id as timesheetID, ts.Start_Date as StartDate, ts.End_Date as EndDate, sum(te.Actual_Hours) as ActualHours,p.isBillable as Billable, ts.Status_Id as Status,s.Status_Name as StatusName from Timesheet ts left join Time_Entry te on ts.Id = te.Timesheet_Id left join Project_Task pt on te.Project_Task_id = pt.Id left join Project p  on pt.Project_Id = p.Id left join Status s on s.Id = ts.Status_Id WHERE ((ts.Start_Date <= '" + selectedFromDate + "' and ts.End_Date >= '" + selectedFromDate + "') or (ts.Start_Date <= '" + selectedToDate + "' and ts.End_Date >= '" + selectedToDate + "') or (ts.Start_Date >= '" + selectedFromDate + "' and ts.End_Date <='" + selectedToDate + "')) and te.StatusId != '3' group by ts.Id having p.isBillable = '" + billableValue + "' ;";
    } else {
        searchQuery = "select ts.Id as timesheetID, ts.Start_Date as StartDate, ts.End_Date as EndDate, sum(te.Actual_Hours) as ActualHours,p.isBillable as Billable, ts.Status_Id as Status,s.Status_Name as StatusName from Timesheet ts left join Time_Entry te on ts.Id = te.Timesheet_Id left join Project_Task pt on te.Project_Task_id = pt.Id left join Project p  on pt.Project_Id = p.Id left join Status s on s.Id = ts.Status_Id WHERE ((ts.Start_Date <= '" + selectedFromDate + "' and ts.End_Date >= '" + selectedFromDate + "') or (ts.Start_Date <= '" + selectedToDate + "' and ts.End_Date >= '" + selectedToDate + "') or (ts.Start_Date >= '" + selectedFromDate + "' and ts.End_Date <='" + selectedToDate + "')) and te.StatusId != '3' group by ts.Id having p.isBillable =  '" + billableValue + "' and ts.Status_Id  IN ( " + selectedStatusValues + ");";
    }
    /*
        } else {
            searchQuery = "select sum(te.Actual_Hours) as ActualHours,p.isBillable as Billable,p.Project_Name as ProjectName  from Timesheet ts left join Time_Entry te on ts.Id = te.Timesheet_Id left join Project_Task pt on te.Project_Task_id = pt.Id left join Project p  on pt.Project_Id = p.Id group by p.Project_Name having p.isBillable =  '" + billableValue + "'  and ts.Start_Date >= '" + selectedFromDate + "' and ts.End_Date <='" + selectedToDate + "';";
        }*/
    kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", searchQuery, searchSuccessCallBack, searchFailureCallBack);
    /**
     * Suucess CallBack for search Operation
     */
    function searchSuccessCallBack(response) {
            kony.print("-- Start searchSuccessCallBack --");
            // alert("searchSuccessCallBack response " + JSON.stringify(response));
            data = [];
            var sd;
            var ed;
            frmListView.lblTimeSheetDate.text = "";
            try {
                var query = "select ts.Status_Id as sheetStatus, ts.start_date,ts.end_date,tt.isovertime,tt.name as time_type_name,te.id,te.date,te.StatusId,st.Status_Name,te.Actual_hours,te.activity_description,te.start_time,te.end_time,te.created_on,te.Timesheet_id, te.time_type_id,te.employee_id,te.project_task_id,pt.type,p.isBillable,p.project_name as projectname,p.id as proid, p.project_description as proDes,p.Planned_hours,t.Task_name,t.id as taskId from timesheet ts left join time_entry te on ts.id=te.timesheet_id left join Project_task pt on te.project_task_id=pt.id left join project p on p.id=pt.project_id left join task t on t.id = pt.task_id left join time_type tt on te.time_type_id=tt.id left join status st on st.id=ts.Status_Id where ts.id='" + kony.apps.coe.ess.myTime.ListViewTabUI.timeSheetId + "' AND te.StatusId != '3';";
                kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, success1, error1);
            } catch (err) {
                kony.sdk.mvvm.log.error("Error in fetchData of controllerExtension");

            }

            function success1(response) {
                //  alert("kony.apps.coe.ess.myTime.ListViewTabUI.timeSheetId " + kony.apps.coe.ess.myTime.ListViewTabUI.timeSheetId);
                //  this.firstResponse = response;
                // var model = scopeObj.getController().getApplicationContext().getModel("Timesheet_Note", "MYTIME", {"access": "offline"});
                var query = "select tn.Added_On,tn.comments,tn.Employee_id,e.First_Name as name from Timesheet_note tn left join employee e on tn.employee_id=e.id where timesheet_id='" + kony.apps.coe.ess.myTime.CalendarViewUI.timeSheetId + "'";
                kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query, querySuccess.bind(this, response), queryFailure);
                kony.sdk.mvvm.log.info("success fetching data ", response);
            }

            function error1(err) {
                kony.sdk.mvvm.log.error("In fetchData errorcallback in controller extension ", err);
            }

            function querySuccess(response1, response2) {
                //   alert("response1 "+response1);
                finalResponse.timeSheetEntries = response1;
                //  finalResponse.timeSheetComments = response2;
                temp = finalResponse.timeSheetEntries;
                //alert("temp "+temp);
                for (var i = 0; i < response.length; i++) {
                    sd = new Date((response[i].StartDate).toString().slice(0, 4), ((response[i].StartDate).toString().slice(4, 6) - 1), (response[i].StartDate).toString().slice(6, 8), 0, 0, 0, 0);
                    ed = new Date((response[i].EndDate).toString().slice(0, 4), ((response[i].EndDate).toString().slice(4, 6) - 1), (response[i].EndDate).toString().slice(6, 8), 0, 0, 0, 0);
                    data.push({
                        lblWeek: sd.getDate() + " " + sd.toString().slice(4, 7) + "-" + ed.getDate() + " " + ed.toString().slice(4, 7),
                        lblViewdates: "View Dates",
                        imgViewDate: "closearrow.png",
                        lblHours: response[i].ActualHours + " H",
                        lblDay1: getDateOfDay(1),
                        lblDay2: getDateOfDay(2),
                        lblDay3: getDateOfDay(3),
                        lblDay4: getDateOfDay(4),
                        lblDay5: getDateOfDay(5),

                    });
                }
                //          lblDates:getDateOfDay(1)+"("+parseFloat(temp[0].Actual_Hours).toFixed(2)+" H),"+getDateOfDay(2)+"("+parseFloat(temp[1].Actual_Hours).toFixed(2)+" H),"+getDateOfDay(3)+"("+parseFloat(temp[2].Actual_Hours).toFixed(2)+" H),"+getDateOfDay(4)+"("+parseFloat(temp[3].Actual_Hours).toFixed(2)+" H),"+getDateOfDay(5)+"("+parseFloat(temp[4].Actual_Hours).toFixed(2)+" H),"

                frmListView.segViewDates.setData(data);
            }

            function queryFailure(err) {
                    kony.print("Error in query Failure " + err);
                }
                // alert("temp[parseInt(1)].Actual_Hours "+temp[parseInt(1)].Actual_Hours);

            function getDateOfDay(j) {
                    dd = new Date(Date.parse(sd) + j * 86400000);
                    return dd.getDate().toString().slice(0, 3) + " " + dd.toString().slice(4, 7);
                }
                /*    var data = response;
                    var widgetMap = null;
                    var rowTemplate = null;
                    if (data !== null && data !== undefined && data.length !== 0) {
                        frmSearchMyTime.segSearchResults.setVisibility(true);
                        frmSearchMyTime.noResultsLbl.setVisibility(false);
                        if (frmSearchMyTime.lbView.selectedKey === "lb1") {
                            for (var count = 0; count < data.length; count++) {
                                data[count].template = flxSegSearchTimesheets;
                                data[count].Definition = kony.apps.coe.ess.globalVariables.timesheetLengthConfig;
                                data[count].Duration = kony.apps.coe.ess.myTime.Search.toDDMON(data[count].StartDate.toString()) + "-" + kony.apps.coe.ess.myTime.Search.toDDMON(data[count].EndDate.toString());
                                data[count].StatusImg = kony.apps.coe.ess.myTime.Search.StatusImageInfo[data[count].Status];
                            }
                            //Todo Need to implement img for status 
                            widgetMap = {
                                "lblTime": "Duration",
                                "lblStat" :"Definition",
                                "lblDuration": "ActualHours",
                                "imgStat": "StatusImg"
                            };
                            rowTemplate = flxSegSearchTimesheets;
                        } else {
                            for (var projectCount = 0; projectCount < data.length; projectCount++) {
                                data[projectCount].template = flxSegSearchProjectsBig;
                                if (data[projectCount].Billable === "1") {
                                    data[projectCount].Billable = "Billable";
                                } else {
                                    data[projectCount].Billable = "Not Billable";
                                }
                            }
                            widgetMap = {
                                "lblProjectName": "ProjectName",
                                "lblTimeType": "Billable",
                                "lblDuration": "ActualHours"
                            };
                            rowTemplate = flxSegSearchProjects;
                        }
                        frmSearchMyTime.segSearchResults.rowTemplate = rowTemplate;
                        frmSearchMyTime.segSearchResults.widgetDataMap = widgetMap;
                        frmSearchMyTime.segSearchResults.setVisibility(true);
                        frmSearchMyTime.segSearchResults.setData(data);
                    } else {
                        frmSearchMyTime.segSearchResults.removeAll();
                        frmSearchMyTime.segSearchResults.setVisibility(false);
                        frmSearchMyTime.noResultsLbl.setVisibility(true);
                    }
                    frmSearchMyTime.segSearchResults.onRowClick = kony.apps.coe.ess.myTime.Search.viewTimesheetDetails;*/
            kony.print("-- End searchSuccessCallBack --");
        }
        /**
         * Failure CallBack for Search Operation
         */
    function searchFailureCallBack(response) {
        kony.print("-- Start searchSuccessCallBack --");
        handleError(response);
        kony.print("-- End searchSuccessCallBack --");
    }

    kony.print("-- End handleSearchOperation --");
};

kony.apps.coe.ess.myTime.ListViewTabUI.getProcessedData = function(data) {
    kony.print("-- Start getProcessedData --");
    alert("getProcessedData \n" + data);
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
        //  frmCalendarView.errordarkbackground.isVisible = false;
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
            //  frmCalendarView.errordarkbackground.isVisible = true;
                break;
            
            default:
                handleError("Error in Status skin");
                break;
        }
    }*/
    //frmCalendarView.lblSubmittedDate.text = data[0].Created_On;
    kony.apps.coe.ess.myTime.ListViewTabUI.overtimeHours = 0;
    kony.apps.coe.ess.myTime.ListViewTabUI.billableHours = 0;
    kony.apps.coe.ess.myTime.ListViewTabUI.totalHours = 0;
    kony.apps.coe.ess.myTime.ListViewTabUI.empId = data[0].Employee_Id;
    // alert("in here in "+data);
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
                timeentry.template = flxOuterList;
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
                timeentry.template = flxOuterList;
            }
            finalData.push(timeentry);
            //    alert("finaldata \n "+JSON.stringify(finalData));
        }
    }
    //  alert("b4");
    kony.apps.coe.ess.myTime.ListViewTabUI.totalHours = totalHours;
    kony.apps.coe.ess.myTime.ListViewTabUI.overtimeHours = overtimeHours;
    kony.apps.coe.ess.myTime.ListViewTabUI.billableHours = billableHours;
    kony.apps.coe.ess.myTime.ListViewTabUI.status = data[0].Status_Name;

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
    kony.apps.coe.ess.myTime.ListViewTabUI.getSubmittedDate(data);
    kony.print("-- End getProcessedData --");
    return (finalData);
};

kony.apps.coe.ess.myTime.ListViewTabUI.prototype.loadDataView = function() {
    alert("loadDataView");
    alert("finalResponse.timeSheetEntries " + finalResponse.timeSheetEntries);
    processedData.timeEntries = kony.apps.coe.ess.myTime.ListViewTabUI.getProcessedData(finalResponse.timeSheetEntries);
    kony.apps.coe.ess.myTime.ListViewTabUI.setDataToViewTimeSheet(processedData.timeEntries);
    kony.apps.coe.ess.Sync.UI.showSyncProgressBarIfSyncing();
};

/**
 * @class       ListViewTabUI
 * @type        UI
 * @param       None
 * return       None.
 * desc         This method handles the navigation to view timesheet form
 */
kony.apps.coe.ess.myTime.ListViewTabUI.prototype.navigateToViewTimesheetForm = function() {
    try {
        kony.print("-- Start navigateToViewTimesheetForm --");
        // alert("navigateToViewTimesheetForm");
        var currDate = new Date();
        // var currMonth=parseInt(currDate.getMonth())+1;
        var currMonth = "" + (("0" + (parseInt(currDate.getMonth()) + 1)).slice(-2));
        var currYear = currDate.getFullYear();
        // alert("currYear " + currYear);
        //alert("currMonth " + currMonth);
        //alert("currDate " + currDate);

        var sqlQuery = "select ts.Start_Date as startDate,ts.End_Date as endDate,ts.Id as timesheetID,ts.Status_Id as statusID " +
            "from Timesheet ts where " +
            "(ts.Start_Date between '" + currYear + currMonth + "01'" +
            " AND '" + currYear + currMonth + "31') OR (ts.End_Date between '" + currYear + currMonth + "01' AND '" + currYear + currMonth + "31')";
        kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", sqlQuery, function(res) {
            //  alert("res here " + JSON.stringify(res));
            kony.apps.coe.ess.myTime.ListViewTabUI.finalTimesheetData = res;
            //   alert("kony.apps.coe.ess.myTime.CalendarViewUI.finalTimesheetData " + kony.apps.coe.ess.myTime.ListViewTabUI.finalTimesheetData);

            if (kony.apps.coe.ess.myTime.ListViewTabUI.finalTimesheetData.length > 0) {
                kony.apps.coe.ess.myTime.ListViewTabUI.timeSheetId = kony.apps.coe.ess.myTime.ListViewTabUI.finalTimesheetData[0].timesheetID;
                //          alert("kony.apps.coe.ess.myTime.ListViewTabUI.timeSheetId " + kony.apps.coe.ess.myTime.ListViewTabUI.timeSheetId);

            }
            /*else {
                       kony.apps.coe.ess.myTime.CalendarViewUI.isSendBack = false;
                       kony.apps.coe.ess.myTime.CalendarViewUI.timeSheetId = null;
                   }*/

        }, function(err) {
            handleError(err);
        }, false);

        kony.print("-- End navigateToViewTimesheetForm --");
    } catch (e) {
        handleError(e);
    }
};

kony.apps.coe.ess.myTime.ListViewTabUI.setDataToViewTimeSheet = function(data) {
    kony.print("-- Start setDataToViewTimeSheet --");
    // alert("setDataToViewTimeSheet \n" + JSON.stringify(data));
    try {
        if (data !== null || data !== undefined || data.length > 0) {
            frmListView.lblNoResult.setVisibility(false);
            frmListView.segmentData.setData(data);
        } else {
            frmListView.lblNoResult.setVisibility(true);
        }
        var today = new Date();
        //  frmCalendarView.lblCurrentMonth.text = kony.apps.coe.ess.myTime.nToStr.fullmonth[today.getMonth()];
        //  frmCalendarView.lblCurrentYear.text = today.getFullYear().toFixed(0);
        frmListView.lblOHours.text = kony.apps.coe.ess.myTime.ListViewTabUI.overtimeHours.toFixed(2);
        frmListView.lblTHours.text = kony.apps.coe.ess.myTime.ListViewTabUI.totalHours.toFixed(2);
        frmListView.lblBHours.text = kony.apps.coe.ess.myTime.ListViewTabUI.billableHours.toFixed(2);
        var status = "SAVED";
        alert("status " + status);
        frmListView.lblApproved.skin = status.skin;
        frmListView.lblApproved.text = status;
        if (status.centerY === "") {
            frmListView.lblApproved.centerY = status.centerY;
            frmListView.lblApprovedDate.isVisible = false;
        } else {
            frmListView.lblApproved.centerY = status.centerY;
            frmListView.lblApprovedDate.isVisible = true;
        }
    } catch (err) {
        alert(err.message);
    }
    kony.print("-- End setDataToViewTimeSheet --");
};

kony.apps.coe.ess.myTime.ListViewTabUI.getSubmittedDate = function(data) {
    if (data === null || data.length <= 0) {
        return;
    }
    var query = "select t.SubmittedOn from Timesheet t where Id='" + data[0].Timesheet_Id + "'";
    kony.apps.coe.ess.MVVM.executeDBQuery("MYTIME", query,
        kony.apps.coe.ess.myTime.ListViewTabUI.formattingdate,
        function(err) {
            handleError(err);
        });
};

/**
 * @function - formattingdate
 */
kony.apps.coe.ess.myTime.ListViewTabUI.formattingdate = function(resDate) {

    if (resDate === null || resDate.length <= 0) {
        frmListView.lblSubmittedDate.text = "-";
        return;
    }
    var date = resDate[0].SubmittedOn;
    if (date === null || date === undefined || isNaN(parseInt(date))) {
        frmListView.lblSubmittedDate.text = "-";
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
    frmListView.lblSubmittedDate.text = finalDate;
};

/**
 * @class       TimesheetCreate
 * @type        function
 * @param       data set to set in segment
 * return       None.
 * desc         This method sets the data to segment
 */
kony.apps.coe.ess.myTime.ListViewTabUI.prototype.updateSegment = function(i) {
    kony.print("--------------------start updateSegment--------------------");
    // alert("updateSegment temp \n"+temp);
    /*frmListView.lblTimeSheetDate.text="";

  if(temp[parseInt(i)]!= null || temp[parseInt(i)]!= undefined){
  var overtimeHours=0;
  var billableHours=0;

  var data=[];

    if ((temp[parseInt(i)].ISOVERTIME) == 1) {
       overtimeHours = overtimeHours + parseFloat(temp[i].Actual_Hours);
        }
        if ((temp[parseInt(i)].isBillable) == 1) {
      billableHours = billableHours + parseFloat(temp[i].Actual_Hours);
       }
  data.push({
      "lblProjectName" : temp[parseInt(i)].projectname,
      "lblProductiveHours" : temp[parseInt(i)].time_type_name,
      "lblDescription" : temp[parseInt(i)].Activity_Description,
      "lblProductiveHoursValue" : temp[parseInt(i)].Actual_Hours,
      "lblTaskName" : temp[parseInt(i)].Project_Task_id,
      "lblCostCenter" : temp[parseInt(i)].proid,
      "lblActivityId" : temp[parseInt(i)].StatusId
                    });

 if(data!==null||data!==undefined||data.length>0){
 frmListView.lblNoResult.setVisibility(false);
 frmListView.lblTHours.text = temp[parseInt(i)].Actual_Hours;
 frmListView.lblBHours.text = billableHours.toFixed(2);
 frmListView.lblOHours.text = overtimeHours.toFixed(2);
 frmListView.segmentData.setData(data);
}
    else
      {
      frmListView.lblNoResult.setVisibility(true);
      frmListView.lblTHours.text = "-";
      frmListView.lblBHours.text = "-";
      frmListView.lblOHours.text ="-";
      }
  }
  else{
    frmListView.lblNoResult.setVisibility(true);
    alert("Select week in Calendar");
  }
  */
    kony.print("--------------------end updateSegment--------------------");
};
kony.apps.coe.ess.myTime.ListViewTabUI.prototype.onImgTempClick = function(context, eventobject) {

    try {
        try {
            alert(eventobject);
        } catch (err) {
            alert(err.message);
        }
        alert("context.widgetInfo " + context.widgetInfo);
        //alert(frmListView.segViewDates.selectedItems);
        var selectedValue = frmListView.segViewDates.data[context.rowIndex];
        //  alert("selectedValue "+selectedValue);
        if (selectedValue.imgViewDate === "openarrow.png") {
            selectedValue.imgViewDate = "closearrow.png";
            // context.widgetInfo.selectedRowItems[0].lblDay1.setVisibility(false);
        } else {
            selectedValue.imgViewDate = "openarrow.png";
            // widget.lblDay1.setVisibility(false);

        }
        frmListView.segViewDates.setDataAt(selectedValue, context.rowIndex, context.sectionIndex);
    } catch (err) {
        alert(err.message);
    }
};