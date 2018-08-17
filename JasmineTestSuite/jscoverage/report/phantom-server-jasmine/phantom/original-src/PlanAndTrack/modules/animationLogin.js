var hasAnimatedLoginScreen = false;

function animateLoginScreen() {
	LocalAuthController.preShow();
    if (!hasAnimatedLoginScreen) {
        frmLoginKA["lblSloganKA"].animate(
            kony.ui.createAnimation({
                "100": {
                    "opacity": 0,
                    "stepConfig": {
                        "timingFunction": kony.anim.EASIN_OUT
                    }
                },
                "0": {
                    "opacity": 1,
                    "stepConfig": {
                        "timingFunction": kony.anim.EASIN_OUT
                    }
                }
            }), {
                "delay": 0.9,
                "fillMode": kony.anim.FILL_MODE_FORWARDS,
                "duration": 1
            }, {
                "animationEnd": function() {
                    kony.print("DG: --- starting 2nd animation");
                    //frmLoginKA["lblSloganKA"].isVisible = "false";
                    frmLoginKA["imgLogoKA"].animate(
                        kony.ui.createAnimation({
                            "100": {
                                "centerY": "93%",
                                "width": "65dp",
                                "height": "20dp",
                                "stepConfig": {
                                    "timingFunction": kony.anim.EASIN_IN_OUT
                                }
                            }
                        }), {
                            "fillMode": kony.anim.FILL_MODE_FORWARDS,
                            "duration": 1.2
                        }, {
                            "animationEnd": function() {
                                frmLoginKA["imgLogoKA"].animate(
                                    kony.ui.createAnimation({
                                        "100": {
                                            "centerX": null,
                                            "left": "50%",
                                            "stepConfig": {
                                                "timingFunction": kony.anim.LINEAR
                                            }
                                        }
                                    }), {
                                        "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                        "duration": 0.5
                                    }, {
                                        "animationEnd": function() {
                                            frmLoginKA["lblPoweredByKA"].animate(
                                                kony.ui.createAnimation({
                                                    "100": {
                                                        "opacity": 3,
                                                   //     "width": "83dp",
                                                      	"top":"95%",
                                                        "stepConfig": {

                                                        }
                                                    }
                                                }), {
                                                    "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                                    "duration": 0.5
                                                }, {
                                                    "animationEnd": function() {
                                                      
                                                        frmLoginKA["lblPoweredByKA"].isVisible = true;
                                                      	frmLoginKA["lblPoweredByKA"].top = "93%";
                                                       	frmLoginKA["lblVersionNumKA"].top = "95%";
                                                  //    	frmLoginKA["lblPoweredByKA"].width = "83dp";
                                                    }
                                                });
                                        }
                                    });
								frmLoginKA["btnTouchIDKA"].animate(
                                    kony.ui.createAnimation({
                                        "100": {
                                            "top": "518dp",
                                            "stepConfig": {
                                                "timingFunction": kony.anim.EASIN_IN_OUT
                                            }
                                        },
                                        "50": {
                                            "top": "568dp",
                                            "stepConfig": {
                                                "timingFunction": kony.anim.LINEAR
                                            }
                                        }
                                    }), {
                                        "delay": 0.2,
                                        "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                        "duration": 1
                                    }, {
                                        "animationEnd": function() {

                                        }
                                    });
                              	frmLoginKA["lblSignInInfoKA"].animate(
                                    kony.ui.createAnimation({
                                        "100": {
                                            "top": "583dp",
                                            "stepConfig": {
                                                "timingFunction": kony.anim.EASIN_IN_OUT
                                            }
                                        },
                                        "50": {
                                            "top": "613dp",
                                            "stepConfig": {
                                                "timingFunction": kony.anim.LINEAR
                                            }
                                        }
                                    }), {
                                        "delay": 0.2,
                                        "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                        "duration": 1
                                    }, {
                                        "animationEnd": function() {

                                        }
                                    });
                                frmLoginKA["flxReConnectKA"].animate(
                                    kony.ui.createAnimation({
                                        "100": {
                                            "top": "463dp",
                                            "stepConfig": {
                                                "timingFunction": kony.anim.EASIN_IN_OUT
                                            }
                                        },
                                        "50": {
                                            "top": "493dp",
                                            "stepConfig": {
                                                "timingFunction": kony.anim.LINEAR
                                            }
                                        }
                                    }), {
                                        "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                        "duration": 1
                                    }, {
                                        "animationEnd": function() {

                                        }
                                    });
                               
                                frmLoginKA["btnLoginKA"].animate(
                                    kony.ui.createAnimation({
                                        "100": {
                                            "top": "383dp",
                                            "stepConfig": {
                                                "timingFunction": kony.anim.EASIN_IN_OUT
                                            }
                                        },
                                        "50": {
                                            "top": "413dp",
                                            "stepConfig": {
                                                "timingFunction": kony.anim.LINEAR
                                            }
                                        }
                                    }), {
                                        "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                        "duration": 1
                                    }, {
                                        "animationEnd": function() {

                                        }
                                    });
                                frmLoginKA["flxSwitchKA"].animate(
                                    kony.ui.createAnimation({
                                        "100": {
                                            "top": "337dp",
                                            "stepConfig": {
                                                "timingFunction": kony.anim.EASIN_IN_OUT
                                            }
                                        },
                                        "50": {
                                            "top": "367dp",
                                            "stepConfig": {
                                                "timingFunction": kony.anim.LINEAR
                                            }
                                        }
                                    }), {
                                        "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                        "duration": 1
                                    }, {
                                        "animationEnd": function() {

                                        }
                                    });

                                frmLoginKA["tbxPasswordKA"].animate(
                                    kony.ui.createAnimation({
                                        "100": {
                                            "top": "270dp",
                                            "stepConfig": {
                                                "timingFunction": kony.anim.EASIN_IN_OUT
                                            }
                                        },
                                        "50": {
                                            "top": "300dp",
                                            "stepConfig": {
                                                "timingFunction": kony.anim.LINEAR
                                            }
                                        }
                                    }), {
                                        "delay": 0.1,
                                        "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                        "duration": 1
                                    }, {
                                        "animationEnd": function() {

                                        }
                                    });
                                frmLoginKA["tbxUserIDKA"].animate(
                                    kony.ui.createAnimation({
                                        "100": {
                                            "top": "210dp",
                                            "stepConfig": {
                                                "timingFunction": kony.anim.EASIN_IN_OUT
                                            }
                                        },
                                        "50": {
                                            "top": "240dp",
                                            "stepConfig": {
                                                "timingFunction": kony.anim.LINEAR
                                            }
                                        }
                                    }), {
                                        "delay": 0.2,
                                        "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                        "duration": 1
                                    }, {
                                        "animationEnd": function() {

                                        }
                                    });
                                frmLoginKA["lblTitleKA"].animate(
                                    kony.ui.createAnimation({
                                        "100": {
                                            "top": "130dp",
                                            "stepConfig": {
                                                "timingFunction": kony.anim.EASIN_IN_OUT
                                            }
                                        },
                                        "50": {
                                            "top": "150dp",
                                            "stepConfig": {
                                                "timingFunction": kony.anim.LINEAR
                                            }
                                        }
                                    }), {
                                        "delay": 0.3,
                                        "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                        "duration": 1
                                    }, {
                                        "animationEnd": function() {
                                            hasAnimatedLoginScreen = true;
                                            LocalAuthController.preShow();
											if(kony.store.getItem("isTouchIDEnabled")){ // To show touch-id based login as soon as the login screen is launched.
												LocalAuthController.authenicateTouchId();		
											}
                                        }
                                    });
                                  

                            }
                        });
                }
            });
    }
	else {
        frmLoginKA["lblSloganKA"].setVisibility(false);
      	frmLoginKA["lblPoweredByKA"].isVisible = true;
		frmLoginKA["imgLogoKA"].centerY = "93%";
		frmLoginKA["imgLogoKA"].width = "65dp";
		frmLoginKA["imgLogoKA"].height = "20dp";
		frmLoginKA["imgLogoKA"].left = "50%";
		frmLoginKA["imgLogoKA"].centerX = null;
		frmLoginKA["lblPoweredByKA"].opacity = 3;
		//frmLoginKA["lblPoweredByKA"].width = "83dp";
		frmLoginKA["lblTitleKA"].top = "130dp";
		frmLoginKA["tbxUserIDKA"].top = "210dp";
		frmLoginKA["tbxPasswordKA"].top = "270dp";
		frmLoginKA["flxSwitchKA"].top = "337dp";
		frmLoginKA["btnLoginKA"].top = "383dp";
		frmLoginKA["flxReConnectKA"].top = "463dp";	
      	frmLoginKA["btnTouchIDKA"].top = "518dp";
		frmLoginKA["lblSignInInfoKA"].top = "583dp";
      	frmLoginKA["lblVersionNumKA"].top = "95%";
    }
}