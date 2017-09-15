const express = require("express");
const request = require("request");

const router = express.Router();

const privateKey = require("../key.js");

const encodeSecret = new Buffer(`${privateKey.consumerKey}:${privateKey.consumerSecret}`).toString("base64");
const twitterUrl = "https://api.twitter.com/1.1/search/tweets.json?q=";


const options = {
	url: "https://api.twitter.com/oauth2/token",
	headers: {
		Authorization: `Basic ${encodeSecret}`,
		"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },

	body: "grant_type=client_credentials",
};
let key;
let numOfTries = 0;
const maxNumOfTries = 2; /* I've encountered with a lot of timeouts in the api so i added
							 multiple attempts in case one fails, this is configurable here  */

const authenticate = () => {
	return new Promise((resolve, reject) => {
		request.post(options, (error, response) => {
			try {
				if (error) console.log(error);
				const bearer = JSON.parse(response.body).access_token;
				if (bearer) {
					key = bearer;
					resolve(bearer);
				} else {
					reject();
				}
			} catch (e) {
				reject(e);
			}
		});
	});
};

const getStatus = (bearer, maxId, search) => {
	console.log(`id ${maxId}`);
	console.log(search);
	return new Promise((resolve, reject) => {
		const optionsGetStatus = {
			url: `${twitterUrl}${search}&max_id=${maxId}&count=20`,
			headers: {
				Authorization: `Bearer ${bearer}`,
				"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
		};
		request.get(optionsGetStatus, (error, res) => {
			if (error) {
				reject(error);
			}
			try {
				if (200 === res.statusCode) {
					resolve(res.body);
				} else if (401 === res.statusCode) {
					authenticate()
						.then((newBearer) => {
							resolve(getStatus(newBearer, maxId));
						});
				} else {
					reject(error);
				}
			} catch (e) {
				reject(e);
			}
		});
	});
};

const authnticateAndGetStatus = (lastId, search) => {
	return new Promise((resolve, reject) => {
		if (key) {
			getStatus(key, lastId, search)
				.then((result) => {
					resolve(result);
					numOfTries = 0;
				})
				.catch((e) => {
					if (numOfTries < maxNumOfTries) {
						numOfTries++;
						console.log(`Try Number ${numOfTries}  Error: ${e}`);
						resolve(authnticateAndGetStatus(lastId, search));
					} else {
						numOfTries = 0;
						reject(e);
					}
				});
		} else {
			/* Authentication did not happend, will authenticate and call itself */
			authenticate()
				.then(() => {
					resolve(authnticateAndGetStatus(lastId, search));
				})
				.catch((authenticationError) => {
					console.log(`Authentication Error: ${authenticationError}`);
					reject(authenticationError);
				});
		}
	});
};

router.get("/", (req, res) => {
	const id = req.query.lastId || 0;
	const search = req.query.search;
	console.log(search);
	if (search) {
		authnticateAndGetStatus(id, search)
			.then((response) => {
				res.send(response).end();
			})
			.catch((error) => {
				res.status(500).send(error);
			});
	} else {
		res.status(400).send("not a valid request");
	}
});


module.exports = router;
