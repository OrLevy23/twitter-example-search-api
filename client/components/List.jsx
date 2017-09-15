import React from "react";
import PropTypes from "prop-types";
import { Grid } from "react-bootstrap";
import TwitListItem from "./TwitListItem.jsx";
import styles from "./List.css";


export default class List extends React.Component {
	constructor() {
		super();
		this.state = {
			statuses: [],
		};
	}

	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll.bind(this));
	}


	handleScroll() {
		const D = document;
		if (window.scrollY + window.innerHeight === D.documentElement.scrollHeight) {
			if (!this.props.isRequesting) {
				this.props.scrollToLoad(this.props.lastId, this.props.prevId);
			}
		}
	}

	render() {
		return (
			<Grid>
				{this.props.statuses.map((item) => { return <TwitListItem data={item} key={item.id} />; })}
				{
					(this.props.isRequesting &&
						<div className={styles.loadingDiv}>
							<h1 className={styles.message}> Loading ... </h1>
						</div>)
				}
				{
					this.props.isFinished ? <h1 className={styles.message}> Youv'e seen it all ... </h1> : ""
				}
				{
					this.props.error ? <h1 className={styles.message}> Something went wrong ... </h1> : ""

				}
			</Grid>
		);
	}
}
List.propTypes = {
	scrollToLoad: PropTypes.func,
	statuses: PropTypes.arrayOf(PropTypes.object),
	isRequesting: PropTypes.bool,
	isFinished: PropTypes.bool,
	lastId: PropTypes.number,
	prevId: PropTypes.number,
	error: PropTypes.bool,
};

List.defaultProps = {
	scrollToLoad: () => { return null; },
	statuses: [],
	isRequesting: true,
	isFinished: false,
	lastId: 0,
	prevId: 0,
	error: false,
};

