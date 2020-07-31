import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert'; // Import
import axios from 'axios';
import '../../../stylesheets/AddUserForm.scss';

import { MessageBoardId } from '../containers';
import { strengthColor, strengthIndicator } from '../../lib/strength';

let color = '#bbb';
let strength;

function logMeIn() {
  location.replace('https://wildalmonds.com/login');
}

class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmed: '',
      strength: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault();
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

  handleSubmit() {
    const sendMessage = this.props.onMessage;
    // const hist = this.props.history;
    // const dashOk = false;

    axios.post(`http://localhost:4500/reset_v3/${this.props.match.params.token}`, {
      password: this.state.password,
      confirmed: this.state.confirmed,
      strength: this.state.strength,
    })
      .then((response) => {
        if (response.data !== 'undefined') {
          if (/^20000/.test(response.data)) {
            confirmAlert({
              title: 'Success',
              message: 'Your password has been changed.',
              buttons: [
                {
                  label: 'Login',
                  onClick: () => { logMeIn(); },
                },
              ],
            });
            this.setState = ({
              password: '',
              confirmed: '',
              strength: '',
            });
          }
        }
        return sendMessage(response.data);
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
        <h1>[ Reset Password ]</h1>
        <div id="messageboard">
          <MessageBoardId />
        </div>
        <br />
        <form onSubmit={this.handleSubmit} method="post">
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
            Passwords must contain:
            <ul>
              <li>at least 8 characters</li>
              <li>upper and lower case letters</li>
              <li>at least one number</li>
              <li>at least one special character such as:    [!@#$%^&*)(+=._-]</li>
              <li>when Strength text turns <span id="greenText">green</span> you are go!</li>
            </ul>
          </p>
          <input name="addit" type="submit" defaultValue="Sign up" className="btn btn-primary btn-block" />
        </form>
      </div>
    );
  }
}

ResetPasswordForm.propTypes = {
  onMessage: PropTypes.func,
};

ResetPasswordForm.defaultProps = {
  onMessage: f => f,
};

export default withRouter(ResetPasswordForm);
