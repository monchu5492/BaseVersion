import React from 'react';
import PropTypes from 'prop-types';
import VideoPage from './VideoPage.jsx';
// import { Videos } from '../containers';
import '../../../stylesheets/VideosList.scss';

const VideosList = ({
	videos = [],
}) =>
	(<div id="videos-list">
		{
			(videos.length === 0) ?
				<p>...checking for available videos</p> :
				videos.map(video =>
					(<VideoPage
						{...video}
						key={video.video_id}
					/>))
		}
	</div>);

VideosList.propTypes = {
	videos: PropTypes.array,
};

VideosList.defaultProps = {
};

export default VideosList;
