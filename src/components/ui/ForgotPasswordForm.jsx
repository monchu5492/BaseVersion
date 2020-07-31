import { Component } from 'react';
import PropTypes from 'prop-types';
import '../../../stylesheets/ForgotPasswordForm.scss';
import { MessageBoardId } from '../containers';

class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      value: '',
    });
    this.props.onForgot(this.state.value);
  }

  render() {
    return (
      <div id="forgot-detail">
        <div>
          <h4>Enter the email address you used for WildAlmonds to receive a reset link</h4>
        </div>
        <div id="messageboard">
          <MessageBoardId />
        </div>
        <form id="forgot-entry" onSubmit={this.handleSubmit}>
          <input
            name="email"
            type="email"
            value={this.state.value}
            className="form-control"
            onChange={this.handleChange}
            placeholder="Username (email address)"
            required
          />
          <input name="addit" type="submit" value="Submit" className="btn btn-primary btn-block" />
        </form>
      </div>
    );
  }
}

ForgotPasswordForm.propTypes = {
  onLogin: PropTypes.func,
  onForgot: PropTypes.func,
};

ForgotPasswordForm.defaultProps = {
  onLogin: f => f,
  onForgot: f => f,

};

export default ForgotPasswordForm;

