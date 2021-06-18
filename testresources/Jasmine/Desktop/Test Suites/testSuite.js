define(["Test Cases/testCase1_data"], function() {
	describe("testSuite", function() {
		it("testCase1", async function() {
			var _data = testcaseData_1623318108958.dataset;
			await kony.automation.playback.waitFor(["OauthSamp/Form1","btn"]);
			// :User Injected Code Snippet [// - [1 lines]]
			await kony.automation.webSocket.connectToHost();
			await kony.automation.playback.wait(5000);
    		// :End User Injected Code Snippet {2ce691df-2d15-9c25-e1de-cbdf8b1161a5}
			kony.automation.button.click(["OauthSamp/Form1","btn"]);
			// :User Injected Code Snippet [// - [2 lines]]
		    kony.automation.webSocket.sendMessage({ "eventName": "enterUsername"});
		    await kony.automation.playback.wait(20000);
		    await kony.automation.webSocket.waitForMessage({ "eventName":"executionDone"});
		    // :End User Injected Code Snippet {935e8708-19f8-0401-a025-8b89c89d30a9}
		    expect(kony.automation.widget.getWidgetProperty(["Form1","lbl"], "text")).toEqual("Login Success.");
		}, 90000);
	});
});