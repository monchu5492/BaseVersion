import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { Blogs } from "../containers"
import blog from '../../../app/models/blog';

  class BlogDisplay extends Component {
    
    render(){

      return(
        <div className="container-fluid">
          {console.log(this.props)}
        <div className="card-footer">
          <div className="row">
            <button onClick={() => console.log("edit")} className="btn btn-primary mx-3 col">
              Edit
            </button>
            <button onClick={() => console.log("Deleted")} className="btn btn-danger col">
              Delete
            </button>
          </div>
         </div>
    </div>
      )
    }
  }

  BlogDisplay.propTypes = {
    blogs: PropTypes.array,
    onFetch: PropTypes.func
  };

  BlogDisplay.defaultProps = {
    onFetch: f => f,
  };

  export default withRouter(BlogDisplay);