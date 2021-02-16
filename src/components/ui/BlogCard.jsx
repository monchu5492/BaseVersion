import React, { Component } from 'react'

class BlogCard extends Component {


  render() {
    return(
      <div className="container-fluid">
          {console.log(this.props)}
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

export default BlogCard;