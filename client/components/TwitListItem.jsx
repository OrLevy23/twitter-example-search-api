import React from "react";
import moment from "moment";
import { Grid, Row, Col, Panel } from "react-bootstrap";
import PropTypes from "prop-types";
import styles from "./TwitListItem.css";


const TwitListItem = (props) => {
	const data = props.data;
	if (!data) {
		return;
	}
	const imagePath = data.user.profile_image_url.replace("_normal", "");
	const userName = data.user.name;
	const screenName = data.user.screen_name;
	const date = moment(data.created_at, "dd MMM DD HH:mm:ss ZZ YYYY", "en").format("MMM DD");
	const content = data.text;
	return (
		<div className={styles.listItem} height={"100%"}>
			<Panel className={styles.panel}>
				<Grid>
					<Row >
						<Col xs={2} md={2} lg={2}>
							<img src={imagePath} alt={""} className={styles.image} />
						</Col>
						<Col xs={9} md={9} lg={9}>
							<div className={styles.RowDiv}>
								<Col xs={3} md={3} lg={3} className={styles.leftText}>
									{userName}
								</Col>
								<Col xs={3} md={3} lg={3} >
									{`@${screenName}`}
								</Col>
								<Col xs={8} md={8} lg={8} className={styles.rightText}>
									{date}
								</Col>
							</div>
							<Row className={styles.contentDiv}>
								{content}
							</Row>
						</Col>
					</Row>
				</Grid>
			</Panel>
		</div>
	);
};
TwitListItem.PropTypes = {
	data: PropTypes.object,
};

TwitListItem.defaultProps = {
	data: {},
};

export default TwitListItem;
