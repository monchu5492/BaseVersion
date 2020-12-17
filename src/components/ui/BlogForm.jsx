import React from 'react';
import axios from 'axios';
// import { connect } from 'react-redux';

function BlogForm(props) {
  // const [title, setTitle] = useState('')
  // const [body, setBody] = useState('')
  // const [author, setAuthor] = useState(0)

  // useEffect(() => {
  //   console.log(props)
    // if(nextProps.blogToEdit) {
    //   this.setState({
    //     title: nextProps.blogToEdit.title,
    //     body: nextProps.blogToEdit.body,
    //     author: nextProps.blogToEdit.author,
    //   });
    // }
  // });

  // // handleSubmit = () => {
  // //   if(!props.edit) {
  // //     return axios.post('http://localhost:4500/blogs', {
  // //       title,
  // //       body,
  // //       author,
  // //     })
  // //       .then((res) => console.log(res), setTitle(''), setBody(''), setAuthor(''))
  // //   } else {
  // //     return axios.patch(`http://localhost:4500/blogs/${props.blog._id}`, {
  // //       title,
  // //       body,
  // //       author,
  // //     })
  // //       .then((res) => console.log(res), setTitle(''), setBody(''), setAuthor(''));
  // //   }
  // // }

  // handleChangeField = (key, event) => {
  //   if(key == "Title"){
  //     setTitle(event.target.value)
  //   }
  //   if(key == "Body"){
  //     setBody(event.target.value)
  //   }
  //   if(key == "Author"){
  //     setAuthor(event.target.value)
  //   }
  // }

  // (ev) => handleChangeField('Body', ev)
    return (
      <div className="container-fluid">
        <h1>Hello World!</h1>
        <form>
          <div class="form-group">
            <label for="exampleFormControlInput1">Email address</label>
            <input type="title" class="form-control" id="exampleFormControlInput1" placeholder="The Example Title"></input>
          </div>
          <div className="form-group">
            <label for="formUserInput">Body</label>
            <textarea type="body" className="form-control" id="formUserInput" rows="6"></textarea>
          </div>
          <div className="form-group">
            <label for="forUserName">Author</label>
            <input type="author" className="form-control" if="forUserName"></input>
          </div>
            <button className="btn btn-success btn-sm">Submit</button>
        </form>
      </div>
    )
  }

  export default BlogForm; 