kony = kony || {};
kony.servicesapp = kony.servicesapp || {};

kony.servicesapp.EMPTY_STRING = "";
kony.servicesapp.IDLE_TIMEOUT = "IDLE_TIMEOUT";
kony.servicesapp.ORDER_EXECUTION_STATUS = "ORDER_EXECUTION_STATUS";
kony.servicesapp.TASK_EXECUTION_STATUS = "TASK_EXECUTION_STATUS";
kony.servicesapp.servicesStatus = {};
kony.servicesapp.servicesStatus.key = {"Scheduled" : "Scheduled", "Paused": "Paused", "Accepted" : "Accepted", "Started" : "Started",
												"Completed" : "Completed", "Rejected" : "Rejected","OnRoute" : "On Route"};

kony.servicesapp.constants = Class( {
     $statics : {
	    scopeObj : null,
		getServiceConstantsObj : function(){
			if(kony.servicesapp.constants.scopeObj){
				return kony.servicesapp.constants.scopeObj;
			}else{
				kony.servicesapp.constants.scopeObj = new kony.servicesapp.constants();
				return kony.servicesapp.constants.scopeObj;
			}
		}
	},
    /**
     * constructor method.
     */
	constructor : function() {
		try{
	    	var  idleTimeOut = 10;
	    	var statusKey = kony.servicesapp.servicesStatus.key;
	    	var orderExecutionStatus = {"Scheduled" : [kony.i18n.getLocalizedString("i18n.common.statusMechine.onRouteKA"),kony.i18n.getLocalizedString("i18n.common.statusMechine.rejectKA")],
			  	"On Route" : [kony.i18n.getLocalizedString("i18n.common.statusMechine.startKA")],
			  	"Started" : [kony.i18n.getLocalizedString("i18n.common.statusMechine.pauseKA"),kony.i18n.getLocalizedString("i18n.common.statusMechine.completeKA")],
			  	"Paused" : [kony.i18n.getLocalizedString("i18n.common.statusMechine.resumeKA")],
			  	"Completed" : [],
			  	"Rejected" : []
		  	};
			var taskExecutionStatus  = {"Scheduled" : [kony.i18n.getLocalizedString("i18n.common.statusMechine.startKA")],
				"Started" : [kony.i18n.getLocalizedString("i18n.common.statusMechine.pauseKA"),kony.i18n.getLocalizedString("i18n.common.statusMechine.completeKA")],
				"Paused" : [kony.i18n.getLocalizedString("i18n.common.statusMechine.resumeKA")],
				"Completed" : [],
				"Rejected" : []
			};
			this.getValue = function(key,value){
				switch(key){
					case "IDLE_TIMEOUT" : 
						return idleTimeOut;
					case "ORDER_EXECUTION_STATUS" : 
						return orderExecutionStatus[value] ? orderExecutionStatus[value] : [];
					case "TASK_EXECUTION_STATUS" : 
						return taskExecutionStatus[value] ? taskExecutionStatus[value] : [];
				}
			};
		}catch(err){
			kony.print("==error in resourcesSegmentOnClickKA==>");
			kony.print(err.toString());
		}
	}
 });