import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clock from './Clock.jsx';
import '../../../stylesheets/OwnerDashboard.scss';
import { OwnerTournaments } from '../containers';
import { withRouter } from 'react-router';
import { MessageBoardId } from '../containers';
import Header from './Header.jsx';
// import TopMenu from './TopMenu.jsx';

// https://stackoverflow.com/questions/40352310/how-do-you-mix-componentdidmount-with-react-redux-connect
// https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html (replace componentWillMount)

function findOwnerTournaments (onFetchOwnerTournaments) {
  onFetchOwnerTournaments();
}

function signMeUp() {
  location.replace("https://wildalmonds.com/signup")
}

class OwnerDashboard extends Component {
  state = {
    tournament_name: null,
    tournament_description: null,
    tournament_status: null,
    gameName: null,
    externalData: null,
    onFetchOwnerTournaments: this.props.onFetchOwnerTournaments,
  };

  componentDidMount() {
    this._asyncRequest = findOwnerTournaments(
      this.state.onFetchOwnerTournaments
    );
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }
  render() {
    const {
      messagetext, history,
    } = this.props;
    return (
      <div id="owner-dashboard">
        <Header />
        <MessageBoardId />
        <Clock />
        <div >
          <div id="secure-check">{(/^10/.test(messagetext)) ?
            <div>
            <p>This is a secure side option. Contact us at support@wildalmonds.com for a demo or create
            an account.</p>
              <button id="create"
                      onClick={() => {
                        signMeUp();
                      }}
              >Signup
              </button>
            </div>
            :
            <div>
              <h4>
                Refresh page or create an Event then click on Dashboard in a box below
              </h4>
            <button id="create"
              onClick={() => {
                history.push('/create');
              }}
            >Create Event
            </button>
            </div>
        }
          </div>
        </div>
        <div>
        </div>
        <OwnerTournaments />
      </div>
    );
  }
}

OwnerDashboard.propTypes = {
  messagetext: PropTypes.string,
  // userId: PropTypes.string,
  onFetchOwnerTournaments: PropTypes.func,
  onFetch: PropTypes.func,
};

OwnerDashboard.defaultProps = {
  onFetchOwnerTournaments: f => f,
  onFetch: f => f,
};

export default withRouter(OwnerDashboard);
