import React, { Component } from 'react'

class BlogCardEdit extends Component {


  render() {
    return(
      <div className="container-fluid">
          {console.log(this.props, 'props from edit')}
          {console.log(blog)}
          <form onSubmit={this.handleOnSubmit}>
            <div>
              <input onChange={this.handleOnChange} name="title" placeholder={blog.title}></input>
            </div>
            <div>
              <input onChange={this.handleOnChange} name="body" placeholder={blog.body}></input>
            </div>
        <div className="card-footer">
          <div className="row">
            <button onClick={() => console.log('complete')} className="btn btn-primary mx-3 col">
              Complete
            </button>
          </div>
         </div>
         </form>
    </div>
    )
  }
}

export default BlogCardEdit;