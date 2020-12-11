import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../../stylesheets/PlayerName.scss";
import player from "../../store/reducers";
import { NavLink } from "react-router-dom";

function findPlayerName(onFetchPlayerName) {
  onFetchPlayerName();
}

class UserGreeting extends Component {
  state = {
    isLoggedIn: false,
    firstname: " ",
    lastname: " ",
    onFetchPlayerName: this.props.onFetchPlayerName,
  };

  componentWillReceiveProps(props) {
    this.setState({
      firstname: props.player.firstname,
      lastname: props.player.lastname,
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this._asyncRequest = findPlayerName(this.state.onFetchPlayerName);
      if (this.props.player) {
        this.setState({ isLoggedIn: true });
      }
    }, 250);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isLoggedIn !== this.state.isLoggedIn) {
      console.log(
        `\n **\nisLoggedIn ${prevState.isLoggedIn} has changed: ${this.state.isLoggedIn}\n\n*****`
      );
      if (this.props.player) {
        this.setState({ isLoggedIn: true });
      }
    }
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    return this.props.player === "Not authenticated" ? (
      <NavLink to="/login">Login</NavLink>
    ) : (
      <div>
        <NavLink to="/logout">Logout</NavLink>
        {this.state.firstname} {this.state.lastname}
      </div>
    );
  }
}

UserGreeting.propTypes = {
  player: PropTypes.array,
  onFetchPlayerName: PropTypes.func,
};

UserGreeting.defaultProps = {
  onFetchPlayerName: (f) => f,
  // player: 'Guest',
};
export default UserGreeting;
