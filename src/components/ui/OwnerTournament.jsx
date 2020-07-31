import { Component } from 'react';
import PropTypes from 'prop-types';
import '../../../stylesheets/OwnerTournament.scss';

class Tournament extends Component {
  state = {
    tournament_name: null,
    tournament_description: null,
    tournament_status: null,
    gameName: null,
    externalData: null,
    onFetchOwnerTournaments: this.props.onFetch,
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
      tournament_name,
      tournament_description,
      tournament_status,
      totalAvailableInvites,
      onFetch,
    } = this.props;
    return (
      <section className="tournament" style={this.style}>
        <h1
          ref="tournament_name"
          onClick={onFetch}
        >{tournament_name}
        </h1>
        <ul>
          <li
            ref="tournament_description"
            onClick={onFetch}
          >Description: {tournament_description}
          </li>
          <li
            ref="tournament_status"
            onClick={onFetch}
          >Status: {tournament_status}
          </li>
          <li
            ref="tournament_status"
            onClick={onFetch}
          >Available Invites: {totalAvailableInvites}
          </li>
        </ul>
        <div
          className="tournament"
          onClick={onFetch}
        />
      </section>
    );
  }
}

Tournament.propTypes = {
  tournament_name: PropTypes.string.isRequired,
  tournament_description: PropTypes.string.isRequired,
  tournament_status: PropTypes.string.isRequired,
  totalAvailableInvites: PropTypes.string,
  onFetch: PropTypes.func,
  onRemove: PropTypes.func,
};

Tournament.defaultProps = {
  totalAvailableInvites: 'Order needed',
  onFetch: f => f,
  onRemove: f => f,
};

export default (Tournament);

