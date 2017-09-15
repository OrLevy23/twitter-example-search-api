import List from "../components/List.jsx";
import { decStrNum } from "../helpers/Utils.js";
import { scrollToLoad, listDone } from "../actions/Main.js";

const { connect } = require("react-redux");


const mapStateToProps = (state) => {
	return {
		statuses: state.main.statuses,
		isRequesting: state.main.isRequesting,
		isFinished: state.main.isFinished,
		lastId: state.main.lastId,
		prevId: state.main.prevId,
		error: state.main.error,
	};
};


const mapDispatchToProps = (dispatch) => {
	return {
		scrollToLoad: (lastId, prevId) => {
			if (lastId === prevId && lastId !== 0) {
				dispatch(listDone());
				return;
			}
			const id = decStrNum(lastId);
			console.log(id);
			dispatch(scrollToLoad(id));
		},
	};
};


module.exports = connect(mapStateToProps, mapDispatchToProps)(List);
