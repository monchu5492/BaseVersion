import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../../../stylesheets/AddUserForm.scss';

import { MessageBoardId } from '../containers';
import { strengthColor, strengthIndicator } from '../../lib/strength';

let color = '#bbb';
let strength;

function redirectMe(square_url) {
  window.open(`${square_url}`);
}

class AddUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      confirmed: '',
      strength: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (name === 'password') {
      strength = strengthIndicator(value);
      color = strengthColor(strength);
      this.setState({
        strength: color,
      });
    }

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const sendMessage = this.props.onMessage;
    const hist = this.props.history;
    const email = this.state.email;
    const pass = this.state.password;
    let dashOk = false;

    axios.post('http://localhost:4500/signup_v2', {
      email: this.state.email,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      password: this.state.password,
      confirmed: this.state.confirmed,
      strength: this.state.strength,
    })
      .then((response) => {
        if (response.data !== 'undefined') {
          if (/^20000/.test(response.data)) {
            dashOk = true;
            axios.post('http://localhost:4500/authentication/login_v2', {
              email,
              password: pass,
            });
          } else {
            // send the message to the message board action
            return sendMessage(response.data);
          }
        }
      })
      .then(() => {
        if (dashOk === true) { // all good let the user through
          hist.push('/owner/dashboard');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div id="add-user" style={this.style}>
        <br />
        <br />
        <h1>[ Signup ]</h1>
        <div id="messageboard">
          <MessageBoardId />
        </div>
        <br />
        <form onSubmit={this.handleSubmit} method="post">
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
            name="firstname"
            type="name"
            placeholder="First Name"
            maxLength="40"
            className="form-control"
            value={this.state.firstName}
            onChange={this.handleInputChange}
            required
          />
          <input
            name="lastname"
            type="name"
            placeholder="Last Name"
            maxLength="40"
            className="form-control"
            value={this.state.lastName}
            onChange={this.handleInputChange}
            required
          />
          <label style={{ color: `${color}` }}> Strength:
            <input
              name="password"
              type="password"
              placeholder="A secure password"
              maxLength="40"
              className="password-input"
              value={this.state.password}
              onChange={this.handleInputChange}
              style={{
							border: `1px solid ${color}`,
						}}
              required
            />
          </label>
          <input
            name="confirmed"
            type="password"
            placeholder="Confirm Password"
            maxLength="40"
            className="password-input"
            value={this.state.confirmed}
            onChange={this.handleInputChange}
            required
          />
          <p>
            <strong>Passwords must contain:</strong>
            <ul>
              <li>at least 8 characters</li>
              <li>upper and lower case letters</li>
              <li>at least one number</li>
              <li>at least one special character such as:    [!@#$%^&*)(+=._-]</li>
              <li>when Strength text turns <span id="greenText">green</span> you are go!</li>
            </ul>
          </p>
          <p>
            By creating an account, you accept use of the site as explained in our
            <a href="http://localhost:3000/about/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>
            {/* <a href="https://wildalmonds.com/about/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> */}
          </p>
          <p>
            Accounts will be subject to future email approval sent from email address:
            <br />
            wildalmondz@gmail.com.
            <br />
          </p>
          <input name="addit" type="submit" defaultValue="Sign up" className="btn btn-primary btn-block" />
        </form>
      </div>
    );
  }
}

AddUserForm.propTypes = {
  onNewUser: PropTypes.func,
  onMessage: PropTypes.func,
};

AddUserForm.defaultProps = {
  onNewUser: f => f,
  onMessage: f => f,
};

export default withRouter(AddUserForm);
