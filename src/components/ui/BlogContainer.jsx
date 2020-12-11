import React from 'react';
import PropTypes from 'prop-types';
import { Blogs } from "../containers"
import BlogForm from "./BlogForm.jsx";
import { Component } from 'react';
import { withRouter } from 'react-router';

function findBlogs (onFetch) {
  onFetch();
}

class BlogContainer extends Component {
  state = {
    onFetch: this.props.onFetch,
  };

  componentDidMount() {
    this._asyncRequest = findBlogs(
      this.state.onFetch
    );
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }
  
  render(){
    console.log(this.props)
    const {
        blogs,
      } = this.props;

    return (
      <div className="container-fluid blog" style={{paddingTop: "10em", width: "100vw"}}>
            <h1 className="text-center">Wild Blog</h1>
        <div className="row">
          <div className="col">
            <BlogForm />
          </div>
          <div className="col">
            <Blogs blogs={blogs}/>
        </div>
      </div>
    </div>
    );
  }
}

BlogContainer.propTypes = {
  blogs: PropTypes.array,
  onFetch: PropTypes.func,
};

BlogContainer.defaultProps = {
  onFetch: f => f,
};

export default withRouter(BlogContainer);