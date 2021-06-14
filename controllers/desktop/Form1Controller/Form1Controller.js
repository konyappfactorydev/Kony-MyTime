define({ 

  //Type your controller code here 
  //Type your code here
  client : null,
  identityService : null,
  oauthlogin:function(providerName) {
    function loginsuccess(res) {
      this.view.lbl.text = "Login Success.";
      kony.print("login success " + JSON.stringify(res));
    }

    function loginfailure(err) {
      kony.print("login failure " + JSON.stringify(err));
    }

    client = kony.sdk.getCurrentInstance();
    identityService = client.getIdentityService(providerName);
    var options = {};

    options.loginOptions = {};
//     options["UseDeviceBrowser"] = true;
//     options["success_url"] = "http://com.orgname.TestOAuthLogin";  
    identityService.login(options, loginsuccess.bind(this), loginfailure)
  },

  oauthlogout :function(providerName) {
    function logoutsuccess(res) {
      alert("logout success " + JSON.stringify(res));
    }

    function logoutfailure(err) {
      alert("logout failure " + JSON.stringify(err));
    }

    var options = {};
    options.loginOptions = {};
//     options["UseDeviceBrowser"] = true;
//     options["success_url"] = "http://com.orgname.TestOAuthLogin";  
    identityService.logout(logoutsuccess, logoutfailure, options);
  },

  boxoauthlogin : function() {
    this.oauthlogin("testBoxSvc");
  },

  boxoauthlogout : function() {
    this.oauthlogout("testBoxSvc");
  }

});