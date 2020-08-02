import React, { Component } from 'react';
import PropTypes from "prop-types";
import '../../../stylesheets/PlayerName.scss';

function findPlayerName (onFetchPlayerName) {
  onFetchPlayerName();
}

class UserGreeting extends Component {
  state = {
    isLoggedIn: false,
    firstname: 'Welcome',
    lastname: 'Guest!',
    onFetchPlayerName: this.props.onFetchPlayerName,
  };

  componentDidMount() {
    setTimeout(() => {
    this._asyncRequest = findPlayerName(
      this.state.onFetchPlayerName
    );
    if (this.props.player) {
      this.setState({isLoggedIn: true});
    }
    }, 250);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isLoggedIn !== this.state.isLoggedIn) {
      console.log(`\n **\nisLoggedIn ${prevState.isLoggedIn} has changed: ${this.state.isLoggedIn}\n\n*****`);
      if (this.props.player) {
        this.setState({isLoggedIn: true});
      }
    }
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    return (
      this.state.isLoggedIn ?
        <div className="player-name">{this.props.player.firstname} {this.props.player.lastname}</div> :
        <div>Hello Guest</div>
    );
  }
}

UserGreeting.propTypes = {
  player: PropTypes.array,
  onFetchPlayerName: PropTypes.func,
};

UserGreeting.defaultProps = {
  onFetchPlayerName: f => f,
  // player: 'Guest',
};
export default UserGreeting;