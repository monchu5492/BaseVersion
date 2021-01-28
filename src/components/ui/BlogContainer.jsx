import React from 'react';
import PropTypes from 'prop-types';
import { Blogs, NewBlog } from "../containers"
import BlogForm from "./BlogForm.jsx";
import { Component } from 'react';
import { withRouter } from 'react-router';

function findBlogs (onFetch) {
  onFetch();
}

class BlogContainer extends Component {
  state = {
    onFetch: this.props.onFetch,
    new: false,
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

  changeNew() {
    this.state.new = !this.state.new
    return this.state.new
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
          <div className="col-md">
            <NewBlog />
            {/* <BlogForm /> */}
          </div>
          <div className="col-md">
            <Blogs blogs={blogs} changeNew={this.changeNew}/>
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