import React from 'react';
import PropTypes from 'prop-types';

import BlogDisplay from "./BlogDisplay.jsx";

const BlogList = ({
	blogs = [],
}) =>
	(<div id="blogs-list">
		{
			(blogs.length === 0) ?
				<p>...checking for available blogs</p> :
				blogs.map(blog =>
					(<BlogDisplay
						{...blog}
						key={blog.blog_id}
					/>))
		}
	</div>);

BlogList.propTypes = {
	blogs: PropTypes.array,
};

BlogList.defaultProps = {
};

export default BlogList;