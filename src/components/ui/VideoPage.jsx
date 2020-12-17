import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../../stylesheets/VideosPage.scss';

function redirectMe(link, id) {
	console.log(`Video Id: ${id}`);
	window.open(`${link}`);
}

class VideoPage extends Component {
	render() {
		return (
			(
				<div id="videos" style={this.style}>
					<div className="wrapper">
						{
							this.props.video_id % 2 === 0 ? (
								<tr className="even">
									<td className="title">{this.props.video_title}</td>
									<button onClick={() => {console.log(this.props)}}>hello</button>
									<td id="uploaded">{this.props.date}</td>
									<td>
										<button
											id="create"
											onClick={() => {
												redirectMe(this.props.video_link, this.props.video_id);
											}}
										>Watch
										</button>
									</td>
								</tr>
							) : (
								<tr className="odd">
									<td className="title">{this.props.video_title}</td>
									<td id="uploaded">{this.props.date}</td>
									<td>
										<button
											id="create"
											onClick={() => {
												redirectMe(this.props.video_link);
											}}
										>Watch
										</button>
									</td>
								</tr>
							)
						}
					</div>
				</div>)
		);
	}
}

VideoPage.propTypes = {
	video_id: PropTypes.string.isRequired,
	video_title: PropTypes.string.isRequired,
	video_link: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
};

VideoPage.defaultProps = {
};

export default VideoPage;
