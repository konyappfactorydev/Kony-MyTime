function ActionOnCopyConfirmClick(eventobject, x, y) {
    return AS_Button_975d4a70e71d47c0b750894ac21fdf2c(eventobject, x, y);
}

function AS_Button_975d4a70e71d47c0b750894ac21fdf2c(eventobject, x, y) {
    frmCalendarView.flxCopyWeek.setVisibility(false);
    frmCalendarView.flxCopyIcon.skin = "sknFlxB1PxBGffffffOP100";
    frmCalendarView.imgCopy.src = "copyblue.png";
    (new kony.apps.coe.ess.myTime.CalendarViewUI()).CopyWeekTimesheetConfirm();
}