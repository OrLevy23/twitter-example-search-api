const decStrNum = (n) => {
	n = n.toString();
	let result = n;
	let i = n.length - 1;
	while (i > -1) {
		if ("0" === n[i]) {
			result = `${result.substring(0, i)}9${result.substring(i + 1)}`;
			i--;
		} else {
			result = result.substring(0, i) + (parseInt(n[i], 10) - 1).toString() + result.substring(i + 1);
			return result;
		}
	}
	return result;
};

const parseDate = (date) => {
	const temp = new Date(date);
	return `${temp.getMonth()}/${temp.getDay()}/${temp.getFullYear()}`;
};


module.exports = {
	decStrNum,
	parseDate,
};
