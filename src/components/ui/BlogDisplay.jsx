import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import axios from 'axios';
import { Blogs } from "../containers"

  let blog = {
    blog_id: '',
    title: '',
    body: '',
  }

  class BlogDisplay extends Component {
    state = {
      edit: false
    }

    componentDidUpdate(){
      blog = {...blog, blog_id: this.props.blog_id}
    }


    handleOnChange(e) {
      console.log(blog)
      let name = e.target.name
      let value = e.target.value
      blog[name] = value
      // this.setState(blog)
    }
    
    handleOnSubmit(e) {
      this.setState({edit: false})
      e.preventDefault();
      e.target.reset()
      console.log('submited')
      const apiPath = "http://localhost:4500";

      axios.patch(`${apiPath}/blogs/patchBlog`, {
        //going to add userid later as Author later to relate blog to user as well as display the user
        ...blog,
      })
      .then((res) => {
        console.log(res.body)
       // setBlog(Blog)
      })
      .then((response) => {
        if (response.data !== 'undefined') {
          console.log(response.data)
          if (/^20000/.test(response.data)) {
            dashOk = true;
          } else {
            // send the message to the message board action
            return sendMessage(response.data);
          }
        }
      })
      .then(() => {
        if (dashOk === true) { // all good let the user through
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }

    render(){
      return(
        this.state.edit ? 
        <div className="container-fluid">
          {console.log(this.props, 'props from edit')}
          {console.log(blog)}
          <form onSubmit={this.handleOnSubmit}>
            <div>
              <input onChange={this.handleOnChange} name="title" placeholder={this.props.title}></input>
            </div>
            <div>
              <input onChange={this.handleOnChange} name="body" placeholder={this.props.body}></input>
            </div>
        <div className="card-footer">
          <div className="row">
            <button type='submit' className="btn btn-primary mx-3 col">
              Complete
            </button>
          </div>
         </div>
         </form>
    </div> : <div className="container-fluid">
          {console.log(this.props, 'from blogdisplay')}
          <div>{this.props.title}</div>
          <div>{this.props.body}</div>
        <div className="card-footer">
          <div className="row">
            <button onClick={() => this.setState({edit: true})} className="btn btn-primary mx-3 col">
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
    onFetch: PropTypes.func,
    changeNew: PropTypes.func
  };

  BlogDisplay.defaultProps = {
    onFetch: f => f,
  };

  export default withRouter(BlogDisplay);