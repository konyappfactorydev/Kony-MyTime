it("testCase1", async function() {
	var _data = testcaseData_1623318108958.dataset;
	await kony.automation.playback.waitFor(["Form1","btn"]);
	// :User Injected Code Snippet [// - [1 lines]]
	kony.automation.webSocket.connectToHost();
	// :End User Injected Code Snippet {2ce691df-2d15-9c25-e1de-cbdf8b1161a5}
	kony.automation.button.click(["Form1","btn"]);
	// :User Injected Code Snippet [// - [2 lines]]
	kony.automation.webSocket.sendMessage({ "eventName": "performLogin"});
	await kony.automation.webSocket.waitForMessage({ "eventName":"performLoginDone"});
	// :End User Injected Code Snippet {935e8708-19f8-0401-a025-8b89c89d30a9}
	expect(kony.automation.widget.getWidgetProperty(["Form1","lbl"], "text")).toEqual(_data.assert.lbl);
});