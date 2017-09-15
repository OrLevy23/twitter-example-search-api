const request = require("request");

const url = "http://localhost:3000";


const sendHttpRequest = (lastId, search) => {
	const options = {
		url: `${url}/status`,
		qs: { lastId,
			search },
	};
	return new Promise((resolve, reject) => {
		request.get(options, (error, res) => {
			if (error || res.statusCode !== 200) {
				const err = error || res.statusCode;
				reject(err);
			} else {
				resolve(res.body);
			}
		});
	});
};


module.exports = {
	sendHttpRequest,
};
