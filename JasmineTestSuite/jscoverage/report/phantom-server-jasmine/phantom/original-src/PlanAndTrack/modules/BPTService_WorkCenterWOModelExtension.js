/*
 * Model Extension class for WorkCenterWO object under BPTService object service group
 * Developer can add validation logic here
 *
 */

kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.ObjectServices = kony.sdk.mvvm.ObjectServices || {};
kony.sdk.mvvm.ObjectServices.BPTService = kony.sdk.mvvm.ObjectServices.BPTService || {};

kony.sdk.mvvm.ObjectServices.BPTService.WorkCenterWOModelExtension = Class({
    constructor: function(modelObj) {
        var model = modelObj;

        this.getModel = function() {
            return model;
        };
        this.setModel = function(modelObj) {
            model = modelObj;
        };

    },
    validate: function(dataObject, validationType) {
        //TO-DO add custom validation
        return true;
    }
});