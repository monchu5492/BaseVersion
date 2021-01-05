import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
// import { connect } from 'react-redux';
const apiPath = "http://localhost:4500";

function BlogForm(props) {
  const [blog, setBlog] = useState({
    title: '',
    body: '',
    author: '',
  })

  let handleSubmit = (e) => {
    e.preventDefault();
    // props.onNewBlog({...blog})
    console.log(Blog)
    // const sendMessage = props.onMessage;
    // // const hist = this.props.history;
    // let dashOk = false;
    
    // axios.post(`${apiPath}/blogs/postBlog`, {
    //   ...blog
    // })
    // .then((response) => {
    //   if (response.data !== 'undefined') {
    //     console.log(response.data)
    //     if (/^20000/.test(response.data)) {
    //       dashOk = true;
    //     } else {
    //       // send the message to the message board action
    //       return sendMessage(response.data);
    //     }
    //   }
    // })
    // .then(() => {
    //   if (dashOk === true) { // all good let the user through
    //     hist.push('/owner/dashboard');
    //   }
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
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
            <label for="exampleFormControlInput1">Email address</label>
            <input name="title" class="form-control" id="exampleFormControlInput1" placeholder="The Example Title" onChange={handleChangeField}></input>
          </div>
          <div className="form-group">
            <label for="formUserInput">Body</label>
            <textarea name="body" className="form-control" id="formUserInput" rows="6" onChange={handleChangeField}></textarea>
          </div>
          <div className="form-group">
            <label for="forUserName">Author</label>
            <input name="author" className="form-control" if="forUserName" onChange={handleChangeField}></input>
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