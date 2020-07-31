import PropTypes from 'prop-types';
import OwnerTournament from './OwnerTournament.jsx';
import '../../../stylesheets/OwnerList.scss';

const OwnerList = ({
  tournaments = [], expires, playername, onFetch = f => f, onRemove = f => f,
}) =>
  (<div className="tournament-list">
    {(tournaments.length === 0) ?
      <p>No Events Listed. (Create an Event?)</p> :
tournaments.map(tournament =>
(<OwnerTournament
  key={tournament.tournament_id}
  expires={expires}
  playername={playername}
  {...tournament}
  onRemove={() => onRemove(tournament.tournament_name)}
  onFetch={() => onFetch(tournament.tournament_id)}
/>))
}
  </div>);

OwnerList.propTypes = {
  tournaments: PropTypes.array,
  expires: PropTypes.string,
  playername: PropTypes.string,
  onFetch: PropTypes.func,
  onRemove: PropTypes.func,
};

export default OwnerList;
