import React from 'react';
import PropTypes from 'prop-types';

import BlogForm from './BlogForm';

const BlogFormList = ({
	player = [],
}) =>
	(<div id="blogs-list">
		{
			(player.length === 0) ?
				<p>...checking for available blogs</p> :
					(<BlogDisplay
						key={player.player_id}
					/>)
		}
	</div>);


BlogList.propTypes = {
	blogs: PropTypes.array,
};

export default BlogList;