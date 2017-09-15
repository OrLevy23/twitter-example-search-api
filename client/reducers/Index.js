const { combineReducers } = require("redux");
const main = require("./Main");


const combined = combineReducers({
	main,
});

module.exports = combined;
