it("testCase1", async function() {
	var _data = testcaseData_1623318108958.dataset;
	await kony.automation.playback.waitFor(["OauthSamp/Form1","btn"]);
	kony.automation.button.click(["OauthSamp/Form1","btn"]);
});