kony = kony || {};
kony.sdk = kony.sdk || {};
kony.sdk.mvvm = kony.sdk.mvvm || {};
kony.sdk.mvvm.v2 = kony.sdk.mvvm.v2 || {};
kony.sdk.mvvm.initApplicationForms = function(appContext) {
    try {
        var frmListKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmListKAConfig);
        var frmListKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmListKAController", appContext, frmListKAModelConfigObj);
        var frmListKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmListKAControllerExtension", frmListKAControllerObj);
        frmListKAControllerObj.setControllerExtensionObject(frmListKAControllerExtObj);
        var frmListKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmListKAFormModel", frmListKAControllerObj);
        var frmListKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmListKAFormModelExtension", frmListKAFormModelObj);
        frmListKAFormModelObj.setFormModelExtensionObj(frmListKAFormModelExtObj);
        appContext.setFormController("frmListKA", frmListKAControllerObj);

        var frmDetailsKAModelConfigObj = appContext.getFactorySharedInstance().createConfigClassObject(frmDetailsKAConfig);
        var frmDetailsKAControllerObj = appContext.getFactorySharedInstance().createFormControllerObject("kony.sdk.mvvm.frmDetailsKAController", appContext, frmDetailsKAModelConfigObj);
        var frmDetailsKAControllerExtObj = appContext.getFactorySharedInstance().createFormControllerExtObject("kony.sdk.mvvm.frmDetailsKAControllerExtension", frmDetailsKAControllerObj);
        frmDetailsKAControllerObj.setControllerExtensionObject(frmDetailsKAControllerExtObj);
        var frmDetailsKAFormModelObj = appContext.getFactorySharedInstance().createFormModelObject("kony.sdk.mvvm.frmDetailsKAFormModel", frmDetailsKAControllerObj);
        var frmDetailsKAFormModelExtObj = appContext.getFactorySharedInstance().createFormModelExtObject("kony.sdk.mvvm.frmDetailsKAFormModelExtension", frmDetailsKAFormModelObj);
        frmDetailsKAFormModelObj.setFormModelExtensionObj(frmDetailsKAFormModelExtObj);
        appContext.setFormController("frmDetailsKA", frmDetailsKAControllerObj);

    } catch (err) {
		kony.application.dismissLoadingScreen();
        var exception = appContext.getFactorySharedInstance().createExceptionObject(kony.sdk.mvvm.ExceptionCode.CD_ERROR_APP_INIT_FORMS, kony.sdk.mvvm.ExceptionCode.MSG_ERROR_APP_INIT_FORMS, err);
        kony.sdk.mvvm.log.error(exception.toString());
        throw exception;
    }
};