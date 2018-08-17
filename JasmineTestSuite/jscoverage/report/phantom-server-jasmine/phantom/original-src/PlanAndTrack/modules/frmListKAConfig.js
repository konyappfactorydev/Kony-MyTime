// config file for frmOrderList to map the result to widget
var frmListKAConfig = {
    "formid": "frmListKA",
    "frmListKA": {
        "entity": "WorkOrder",
        "objectServiceName": "BPTService",
        "objectServiceOptions": {
            "access": "offline"
        },
        "customInfo": {
            "segListKA": {
                "useCustomGrouping": false,
                "groupBy": "",
                "grouptype": "Filters"
            }
        }
    },
  "segSingleSelectStatusKA":
  {
      "fieldprops": {
            "entity": "Status",     
            "widgettype": "Segment",
            "querytype": "sql",
        	"query":"WHERE Type_id='EAM_WORD' and Code not in('E0001','E0005','E0007')",       
            "field": {
                "lblTmpViewKA": {
                    "widgettype": "Label",					
                    "field": "Code",
                    "text": "Code",
                    "alias": "Code"
                },
				  "lblTmpHideStatusKA":{
                 "widgettype": "Label",
                    "field": "lblTmpHideStatusKA",
                    "text": "",
                    "alias": "lblTmpHideStatusKA"
				},
				"imgCheckKA": {
                    "widgettype": "Image",
                    "field": "Type_id",
                    "text": "Type_id",
                    "alias": "Type_id"
                }
			}
	  }
  },
  "segStatusKA":
  {
      "fieldprops": {
            "entity": "Status",     
            "widgettype": "Segment",
            "querytype": "sql",
        	"query":"select Code,Type_id from status where Type_id='EAM_WORD' and Code !='E0007'",
            
            "field": {
                "lblTmpStatusKA": {
                    "widgettype": "Label",
                    "field": "Code",
                    "text": "Code",
                    "alias": "Code"
                },
				  "lblTmpHideStatusKA":{
                 "widgettype": "Label",
                    "field": "lblTmpHideStatusKA",
                    "text": "",
                    "alias": "lblTmpHideStatusKA"
				},
                 "lblLineStatusTmpKA": {
                    "widgettype": "Label",
                    "field": "lblLineStatusTmpKA",
                    "text": "",
                    "alias": "lblLineStatusTmpKA"
                },
                 "btnTmpUncheckKA": {
                    "widgettype": "Button",
                    "field": "btnTmpUncheckKA",
                    "text": "",
                    "alias": "btnTmpUncheckKA"
                }
            }
      }
  },
  "segTechSearchKA":
  {
     "fieldprops": {
            "entity": "SystemUser",     
            "widgettype": "Segment",
            "querytype": "sql",  		
            "field": {
                "lblTechNameKA": {
                    "widgettype": "Label",			
                    "field": "FirstName",
                    "text": "FirstName",
                    "alias": "FirstName"
                },
              "lblTechLastNameKA":
              {
                   "widgettype": "Label",			
                    "field": "LastName",
                    "text": "LastName",
                    "alias": "LastName"
                
              },
				"lblTechFirstNameKA":
              {
                "widgettype": "Label",			
                    "field": "MobilePhone",
                    "text": "MobilePhone",
                    "alias": "MobilePhone"
                
                
              },
			  "imgTmpCheckKA": {
                    "widgettype": "Image",
                    "field": "MobilePhone",
                    "text": "MobilePhone",
                    "alias": "MobilePhone"
               },
			  "lblTechLatKA":
              {
                "widgettype": "Label",			
                    "field": "Latitude",
                    "text": "Latitude",
                    "alias": "Latitude"                       
              },
              "lblTechLonKA":
              {
                "widgettype": "Label",			
                    "field": "Longitude",
                    "text": "Longitude",
                    "alias": "Longitude" 
              }
			}
	  }
    
    
    
  },
  "segTechnicianNameKA":
  {
      "fieldprops": {
            "entity": "SystemUser",     
            "widgettype": "Segment",
            "querytype": "sql",
            "field": {
                "lblTmpTechnicianNameKA": {
                    "widgettype": "Label",
                    "field": "FirstName",
                    "text": "FirstName",
                    "alias": "FirstName"
                },
                 "lblLineTechnicianTmpKA": {
                    "widgettype": "Label",
                    "field": "lblLineTechnicianTmpKA",
                    "text": "",
                    "alias": "lblLineTechnicianTmpKA"
                },
                 "btnTmpUncheckKA": {
                    "widgettype": "Button",
                    "field": "btnTmpUncheckKA",
                    "text": "",
                    "alias": "btnTmpUncheckKA"
                },
               "lblTechLastNameKA":
              {
                   "widgettype": "Label",			
                    "field": "LastName",
                    "text": "LastName",
                    "alias": "LastName"
                
              },
				"lblTechFirstNameKA":
              {
                "widgettype": "Label",			
                    "field": "MobilePhone",
                    "text": "MobilePhone",
                    "alias": "MobilePhone"
                
                
              }
            }
      }
  },
  "segPriorityKA":
  {
   	"fieldprops": {
            "entity": "Priority",     
            "widgettype": "Segment",
            "querytype": "sql",
            
            "field": {
                "lblTmpStatusKA": {
                    "widgettype": "Label",
                    "field": "Description",
                    "text": "Description",
                    "alias": "Description"
                },
                "lblLineStatusTmpKA": {
                    "widgettype": "Label",
                    "field": "lblLineStatusTmpKA",
                    "text": "",
                    "alias": "lblLineStatusTmpKA"
                },
                 "btnTmpUncheckKA": {
                    "widgettype": "Button",
                    "field": "btnTmpUncheckKA",
                    "text": "",
                    "alias": "btnTmpUncheckKA"
                }
            }
      }  
   
  },
   "segListKA": {
        "fieldprops": {
            "entity": "WorkOrder",   	
            "widgettype": "Segment",
            "querytype": "sql",
       
            "field": {
                "lblTmpDescKA": {
                    "widgettype": "Label",
                    "field": "Description",
                    "text": "Description",
                    "alias": "Description"
                },              
                "lblTmpStatusKA": {
                    "widgettype": "Label",
                    "field": "Status_id",
                    "text": "Status_id",
                    "alias": "Status_id"
                },
                "lblTmpLocationKA": {
                    "widgettype": "Label",
                    "field": "Address1",
                    "text": "Address",
                    "alias": "Address1Map"
                },
                "lblName2KA": {
                    "widgettype": "Label",
                    "field": "Name2",
                    "text": "Address",
                    "alias": "AddressNameMap"

                },
                "lblAddress2KA": {
                    "widgettype": "Label",
                    "field": "Address2",
                    "text": "Address",
                    "alias": "Address2Map"
                },
                "lblAddress3KA": {
                    "widgettype": "Label",
                    "field": "Address3",
                    "text": "Address",
                    "alias": "Address3Map"
                },
                "lblRegionKA": {
                    "widgettype": "Label",
                    "field": "Region_id",
                    "text": "Address",
                    "alias": "RegionMap"
                },
				"lblLatKA": {
                    "widgettype": "Label",
                    "field": "Latitude",
                    "text": "Address",
                    "alias": "Latitude"
                },
				"lblLongKA": {
                    "widgettype": "Label",
                    "field": "Longitude",
                    "text": "Address",
                    "alias": "Longitude"
                },
              "lblCityKA":
              {
                 "widgettype": "Label",
                    "field": "City_id",
                    "text": "Address",
                    "alias": "CityMap"
              },
                "lblZipCodeKA": {
                    "widgettype": "Label",
                    "field": "ZipCode",
                    "text": "Address",
                    "alias": "ZipCode"
                },
                "lblStartedDateKA": {
                    "widgettype": "Label",
                    "field": "PlannedStartDate",
                    "text": "PlannedStartDate",
                    "alias": "PlannedStartDate"
                },
              "lblPlannedEndDateKA":{
                    "widgettype": "Label",
                    "field": "PlannedEndDate",
                    "text": "PlannedEndDate",
                    "alias": "PlannedEndDate"
                },
                "lblTmpPriorityKA": {
                    "widgettype": "Label",
                    "field": "Priority",
                    "text": "Priority",
                    "alias": "Priority"
                },
                "imgPriorityKA": {
                    "widgettype": "Image",
                    "field": "PriorityType",
                    "text": "PriorityType",
                    "alias": "PriorityType"
                },
              	"imgStatusKA": {
                    "widgettype": "Image",
                    "field": "MaintenancePlant",
                    "text": "MaintenancePlant",
                    "alias": "MaintenancePlant"
                },
                "btnTrackingKA": {
                    "widgettype": "Button",
                    "field": "Instructions",
                    "text": "Instructions",
                    "alias": "Instructions"

                },
              "btnSelectRowKA": {
                    "widgettype": "Button",
                    "field": "Code",
                    "text": "Code",
                    "alias": "Code"
                },
                "lblTmpTechnicianKA": {
                    "widgettype": "Label",
                    "field": "SystemUserFirstName",
                    "alias": "Technician"
                },
              "lblTmplLastNameKA":
              {
                "widgettype": "Label",
                    "field": "SystemUserLastName",
                    "alias": "LastName" 
                
              },
                "lblTmpTypeKA": {
                    "widgettype": "Label",
                    "field": "Type_id",
                    "text": "Type_id",
                    "alias": "Type_id"
                },
			  "lblGreyKA": {
                    "widgettype": "Label",
                    "field": "lastmodifiedts",
                    "text": "lastmodifiedts",
                    "alias": "lastmodifiedts"
              },
			  "lblTechnicianFullNameKA": {
                    "widgettype": "Label",
                    "field": "TechnicianSecHeader",
                    "alias": "TechnicianSecHeader"
                }

            }
        }
    }	
}