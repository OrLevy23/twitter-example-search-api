const request = require("supertest");

describe("loading express", () => {
	let app;
	beforeEach(() => {
		app = require("../app.js");
	});
	afterEach(() => {
		// app.close();
	});
	it("responds to /status with valid params", function(done) { 
		/* If i use arrow function here then this will not pass into the function */
		this.timeout(6000); // The first get will take more time due to authentication				
		request(app)
			.get("/status")
			.query({ search: "tapingo" })
			.expect(200, done);
	});
	it("/status returns error when not passing params", (done) => {
		request(app)
			.get("/status")
			.expect(400, done);
	});
	it("404 everything else", (done) => {
		request(app)
			.get("/foo/bar")
			.expect(404, done);
	});
});

