import React from 'react';
import PropTypes from 'prop-types';
import { Blogs, NewBlog } from "../containers"
import { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';

function findBlogs (onFetch) {
  onFetch();
}

class BlogContainer extends Component {
  state = {
    onFetch: this.props.onFetch,
    edit: this.props.edit,
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
    console.log(this.props, 'props in render from BlogContainer')
    const {blogs, edit} = this.props;

    return (
      <div className="container-fluid blog" style={{paddingTop: "10em", width: "100vw"}}>
            <h1 className="text-center">Wild Blog</h1>
        <div className="row">
          <div className="col-md">
            <NewBlog />
          </div>
          <div className="col-md">
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
  edit: PropTypes.bool,
};

BlogContainer.defaultProps = {
  onFetch: f => f,
};

export default withRouter(BlogContainer);