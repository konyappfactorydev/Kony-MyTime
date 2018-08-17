// config file for frmDetailsKA to map the result to widget
var frmDetailsKAConfig = {
    "formid": "frmDetailsKA",
    "frmDetailsKA": {
        "entity": "WorkOrder",
        "objectServiceName": "BPTService",
      	"additionalFields": ["Location_id","FunctionalLocation_id","PlannedStartDate","PlannedEndDate","ActualStartDate"],
        "query": "&$expand=WorkOrderContact,Address,OrderAsset,WorkOrderPriority,WorkCenterWO,SystemUserWO",
        "objectServiceOptions": {
            "access": "online"
        }
    },
    "flxCustInfoKA": {
		 "fieldprops": {
        "entity": "Contact",
        "widgettype": "FlexContainer",
        "constrained": true,
		"query": "&$filter=id eq {Contact_id}",           
		 }
    }, 
 
  
    "lblCustomerValKA": {
        "fieldprops": {
            "widgettype": "Label",
            "field": "FirstName",
            "text": "FirstName",
            "alias": "FirstName",
            "parent": "flxCustInfoKA",
            "entity": "Contact"
        }
    },
    "lblCustomerLastNameKA": {
        "fieldprops": {
            "widgettype": "Label",
            "field": "LastName",
            "text": "LastName",
            "alias": "LastName",
            "parent": "flxCustInfoKA",
            "entity": "Contact"
        }
    },
  	 "lblStartTImeValKA":{
        "fieldprops": {
            "widgettype": "Label",
            "field": "PlannedStartDate",
            "text": "PlannedStartDate",
            "alias": "PlannedStartDate",            
            "entity": "WorkOrder"
        }
    },
  	"lblLastUpdatedTimeKA":{
        "fieldprops": {
            "widgettype": "Label",
            "field": "lastmodifiedts",
            "text": "lastmodifiedts",
            "alias": "lastmodifiedts",            
            "entity": "WorkOrder"
        }
    },
    "lblCustomerNumbKA": {
        "fieldprops": {
            "widgettype": "Label",
            "field": "PrimaryPhone",
            "text": "CustomerNum",
            "alias": "PrimaryPhone",
            "parent": "flxCustInfoKA",
            "entity": "Contact"
        }
    },
    "lblCustomerEmailKA": {
        "fieldprops": {
            "widgettype": "Label",
            "field": "Email",
            "text": "Email",
            "alias": "Email",
            "parent": "flxCustInfoKA",
            "entity": "Contact"
        }
    },
    "lblStatusKA": {
        "fieldprops": {
            "widgettype": "Label",
            "field": "Status_id",
            "text": "Status_id",
            "alias": "Status_id",
          "entity": "WorkOrder"
        }
    },
    "lblAssignedTechnicianNumbKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "WorkCenterWO.SystemUserWO.MobilePhone",
            "text": "TechnicianNumber",
            "alias": "TechnicianNumber"
        }
    },
    "lblTechnicianNameKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "SystemUserFirstName",
            "text": "Technician",
            "alias": "Technician"
        }
    },
    "lblAssignedTechnicianNameKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "SystemUserFirstName",
            "text": "Technician1",
            "alias": "Technician1"
        }
    },
    "lblAssignedTechnicianLastNameKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "SystemUserLastName",
            "text": "Technician2",
            "alias": "Technician2"
        }
    },
    "lblPriorityKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "WorkOrderPriority.Description",
            "text": "Priority",
            "alias": "Priority"
        }
    },
    "lblTypeValKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "Type_id",
            "text": "Type_id",
            "alias": "Type_id"
        }
    },
    "lblOrderIDKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "Code",
            "text": "Code",
            "alias": "Code"
        }
    },
    "lblDescKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "Description",
            "text": "Description",
            "alias": "Description"
        }
    },
    "lblWOCodeKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "Code",
            "text": "Code",
            "alias": "Code"
        }
    },
    "lblProbDescValKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "Description",
            "text": "Description",
            "alias": "Description"
        }
    },
  "flxAssetRightKA":
  {
    "fieldprops": {
        "entity": "Asset",
        "widgettype": "FlexContainer",
        "constrained": true,
      	"query": "&$filter=id eq {Asset_id}",  
		 }   
  },
    "lblAssetValKA": {
        "fieldprops": {
            "entity": "Asset",
          	 "parent": "flxAssetRightKA",
            "widgettype": "Label",
            "field": "Description",      
            "text": "Assetid",
            "alias": "Description"
        }
    },
    "lblMaintainanceValueKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "MaintenancePlant",
            "text": "MaintenancePlant",
            "alias": "MaintenancePlant"
        }
    },
    "lblPlantValKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "Plant_id",
            "text": "Plant_id",
            "alias": "Plant_id"
        }
    },
   
    "lblAssemblyValKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "Assembly",
            "text": "Assembly",
            "alias": "Assembly"
        }
    },
    "lblWorkCenterValKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "WorkCenter_id",
            "text": "WorkCenter_id",
            "alias": "WorkCenter_id"
        }
    },
    "lblAddress1KA": {
        "fieldprops": {
            "widgettype": "Label",
            "entity": "WorkOrder",
            "field": "Address.Address1",
            "text": "Address",
            "alias": "Address1Map"
        }
    },
    "lblName2KA": {
        "fieldprops": {
            "widgettype": "Label",
            "entity": "WorkOrder",
            "field": "Address.Name2",
            "text": "Address",
            "alias": "AddressNameMap"
        }
    },
    "lblAddress2KA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "Address.Address2",
            "text": "Address2",
            "alias": "Address2Map"
        }
    },
    "lblAddress3KA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "Address.Address3",
            "text": "Address3",
            "alias": "Address3Map"
        }
    },
    "lblCityKA": {
        "fieldprops": {
            "entity": "WorkOrder",
            "widgettype": "Label",
            "field": "Address.City_id",
            "text": "Address",
            "alias": "CityMap"
        }
    },
   
   "flxDetailsInfoKA":
  {
   "fieldprops": {
        "entity": "Location",
        "widgettype": "FlexContainer",
        "constrained": true,
		"query": "&$filter=id eq {Location_id}",
     		
		 } 
    
  },
    "lblLocationValKA": {
        "fieldprops": {
          	"entity":"Location",        	         
            "widgettype": "Label",
            "field": "id",
            "text": "id",
            "alias": "id",
  			"parent":"flxDetailsInfoKA"
        }
    }, 
  
  "lblRoomValKA": {
        "fieldprops": {
           "entity":"Location",        	
            "widgettype": "Label",
            "field": "Room",
            "text": "Room",
            "alias": "Room",
             "parent":"flxDetailsInfoKA"
        }
    },
  "flxFunctionalLocationKA":
  {
   "fieldprops": {
        "entity": "FunctionalLocation",
        "widgettype": "FlexContainer",
        "constrained": true,
		"query": "&$filter=id eq {FunctionalLocation_id}",
     		
		 } 
    
  },
  "lblFunctionalLocationValKA": {
        "fieldprops": {
            "entity": "FunctionalLocation",
            "widgettype": "Label",
            "field": "Description",
            "text": "Description",
            "alias": "Description",
             "parent": "flxFunctionalLocationKA",
        }
    }
};