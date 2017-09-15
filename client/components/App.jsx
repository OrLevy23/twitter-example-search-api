import React, { Component } from "react";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import List from "../containers/List.js";
import { scrollToLoad } from "../actions/Main.js";


const app = require("../reducers/Index.js");


const store = createStore(
	app,
	applyMiddleware(thunk)
);


class App extends Component {
	constructor() {
		super();
		this.state = {
			statuses: [],
			lastId: 0,
			finishedLoading: false,
			isRequesting: true,
			error: false,
		};
	}
	componentWillMount() {
		store.dispatch(scrollToLoad());
	}

	render() {
		return (
			<Provider store={store}>
				<List />
			</Provider>
		);
	}
}


export default App;

