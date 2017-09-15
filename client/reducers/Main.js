const { ACTION_LIST_UPDATED, ACTION_LIST_UPDATING, ACTION_LIST_FINISHED_LOADING, ACTION_FAILED_TO_FETCH } = require("../actions/Main");

const modulesDefinition = (state = {}, action) => {
	switch (action.type) {
		case ACTION_LIST_UPDATED: {
			let { statuses } = action.payload;
			const currentStatuses = state.statuses || [];
			const prevId = state.lastId || 0;
			statuses = currentStatuses.concat(statuses);
			return Object.assign({}, state, {
				statuses,
				lastId: statuses[statuses.length - 1].id - 1,
				prevId,
				isRequesting: false,
			});
		}
		case ACTION_LIST_UPDATING: {
			return Object.assign({}, state, {
				isRequesting: true,
				error: false,
			});
		}

		case ACTION_LIST_FINISHED_LOADING: {
			return Object.assign({}, state, {
				isFinished: true,
			});
		}

		case ACTION_FAILED_TO_FETCH: {
			return Object.assign({}, state, {
				isRequesting: false,
				error: true,
			});
		}

		default:
			return state;
	}
};

module.exports = modulesDefinition;
