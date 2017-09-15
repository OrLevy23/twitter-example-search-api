import { sendHttpRequest } from "../helpers/Http.js";

const ACTION_LIST_UPDATED = "action.application.list.updated";
const ACTION_SCROLL_EVENT_TO_LOAD = "action.application.scroll.load";
const ACTION_LIST_UPDATING = "action.application.list.updating";
const ACTION_LIST_FINISHED_LOADING = "action.application.list.finished";
const ACTION_FAILED_TO_FETCH = "action.application.failed.to.fetch";
const search = "tapingo";

const listUpdated = (statuses) => {
	return {
		type: ACTION_LIST_UPDATED,
		payload: {
			statuses,
		},
	};
};

const listUpdating = () => {
	return {
		type: ACTION_LIST_UPDATING,
	};
};

const listDone = () => {
	return {
		type: ACTION_LIST_FINISHED_LOADING,
	};
};

const failedToFetch = (errorData) => {
	return {
		type: ACTION_FAILED_TO_FETCH,
		payload: {
			error: true,
			payload: {
				errorData,
			},
		},
	};
};

const requestUpdate = (lastId) => {
	return (dispatch) => {
		sendHttpRequest(lastId, search)
			.then((response) => {
				try {
					const statuses = JSON.parse(response).statuses;
					dispatch(listUpdated(statuses));
				} catch (e) {
					console.log(e);
					dispatch(failedToFetch(e));
				}
			})
			.catch((e2) => {
				console.log(e2);
				dispatch(failedToFetch(e2));
			});
	};
};


const scrollToLoad = (lastId) => {
	return (dispatch) => {
		dispatch(listUpdating());
		dispatch(requestUpdate(lastId));
	};
};


module.exports = {
	ACTION_LIST_UPDATED,
	ACTION_LIST_UPDATING,
	ACTION_LIST_FINISHED_LOADING,
	ACTION_SCROLL_EVENT_TO_LOAD,
	ACTION_FAILED_TO_FETCH,
	listUpdated,
	listUpdating,
	listDone,
	scrollToLoad,
	failedToFetch,
};
