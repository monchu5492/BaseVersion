import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
// import { connect } from 'react-redux';
const apiPath = "http://localhost:4500";

const Blog = {
  title: "",
  body: "",
  author: "",
}

function BlogForm(props) {
  const [blog, setBlog] = useState({
    title: "",
    body: "",
    author: "",
  })

  let handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset()
    // const sendMessage = props.onMessage;
    // // const hist = this.props.history;
    // let dashOk = false;
    
    axios.post(`${apiPath}/blogs/postBlog`, {
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

  let handleChangeField = (e) => {
    console.log(blog)
    let name = e.target.name
    let value = e.target.value
    if (name === "author" && !Number.isInteger(parseInt(value))){
      console.log("sorry wrong input. please try again")
      value = ""
    } else if (name === "author" && Number.isInteger(parseInt(value))) {
      console.log("int has been parsed!")
      console.log(parseInt(value))
      value = parseInt(value)
    }
    blog[name] = value
    setBlog(blog)
  }


    return (
      <div className="container-fluid">
        <h1>Hello World!</h1>
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <label for="FormControlInput1">Email address</label>
    <input name="title" class="form-control" id="FormControlInput1" onChange={handleChangeField}></input>
          </div>
          <div className="form-group">
            <label for="formUserInput">Body</label>
            <textarea name="body" className="form-control" id="formUserInput" rows="6" onChange={handleChangeField}></textarea>
          </div>
          <div className="form-group">
            <label for="formUserName">Author</label>
            <input name="author" className="form-control" id="formUserName"  onChange={handleChangeField}></input>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }

  BlogForm.propTypes = {
    onNewBlog: PropTypes.func,
    onMessage: PropTypes.func,
  }

  BlogForm.defaultTypes = {
    onNewBlog: f => f,
    onMessage: f => f,
  }

  export default BlogForm; 