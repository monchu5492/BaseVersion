import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import storeFactory from '../../store/index';
import { fetchLogout } from '../../actions';
import { browserHistory } from "react-router";

const serverStore = storeFactory();

function logout(hist) {
  serverStore.dispatch(fetchLogout());
  // location.replace("https://wildalmonds.com/login")
  // browserHistory.push('https://wildalmonds.com/login');
  hist.push('/login');
}

class Logout extends Component {
  state = {
    onFetchLogout: this.props.fetchLogout,
    history: this.props.history
  };

  componentWillMount() {
    this._asyncRequest = logout(
      this.state.history
    );
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }
  render() {
  //  const {
  //    fetchLogout, history
  //  } = this.props;
    return (
      <section>
        <div>Logged Out</div>
      </section>
    );
  }
}

Logout.propTypes = {
  fetchLogout: PropTypes.func,
};

Logout.defaultProps = {
  fetchLogout: f => f,
};

export default withRouter(Logout);
