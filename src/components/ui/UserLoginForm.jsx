import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { MessageBoardId } from '../containers';
import '../../../stylesheets/UserLoginForm.scss';

axios.defaults.withCredentials = true;

class UserLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    // this.submit = this.submit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const sendMessage = this.props.onMessage;
    const hist = this.props.history;

    axios.post('http://localhost:4500/authentication/login_v2', {
      email: this.state.email,
      password: this.state.password,
    })
      .then((response) => {
        // / if the response data is error, then send a message
        // if it is not an error, send
        if (response.data !== 'undefined') {
          // console.log(response.data.message);
          if (/^20010/.test(response.data.message)) {
            // sendMessage(response.data); // make sure no message exists
            hist.push('/owner/dashboard');
          } else {
            console.log('\n\n\nData: ', response.data);
            // hist.push('/owner/dashboard');
            return sendMessage(response.data);
          }
        }
        // if (response.data === 'undefined') {
      	//	}
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      history,
    } = this.props;

    return (
      <div id="user-login" style={this.style}>
        <br />
        <br />
        <br />
        <h1>[ Login ]</h1>
        <br />
        <div id="message">
          <MessageBoardId />
        </div>
        <form id="login" onSubmit={this.handleSubmit} method="post">
          <input
            name="email"
            type="email"
            placeholder="Username (email address)"
            maxLength="40"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            maxLength="40"
            className="password-input"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          />
          <input type="submit" defaultValue="Login" className="btn btn-primary btn-block" />
          <p>
            <br />
            <br />
            <br />
          </p>
          <i>Need an account?</i>
          <button
            onClick={() => {
								history.push('/signup');
							}}
          >Create Account
          </button>
          <br />
          <br />
          <i>Forgot Password?</i>
          <button
            onClick={() => {
								history.push('/forgot');
							}}
          >Forgot
          </button>
        </form>
      </div>
    );
  }
}

UserLoginForm.propTypes = {
  onLogin: PropTypes.func,
  onMessage: PropTypes.func,
};

UserLoginForm.defaultProps = {
  onLogin: f => f,
  onMessage: PropTypes.func,
};

export default withRouter(UserLoginForm);
