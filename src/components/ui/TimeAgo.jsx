import React from 'react';
import { testState } from '../../lib/time-expires';
import PropTypes from 'prop-types';

const TimeAgo = ({ timestamp }) =>
  (<div className="time-ago">
    { testState(timestamp) }
   </div>
  );

TimeAgo.propTypes = {
  timestamp: PropTypes.string.isRequired,
};

TimeAgo.displayName = 'TimeAgo';

export default TimeAgo;
