import React from 'react';
import { subscribeToTimer } from '../../lib/socketApi';
import '../../../stylesheets/SocketTest.scss';

class SocketTest extends React.Component {
  constructor(props) {
    super(props);
    subscribeToTimer((err, timestamp) => this.setState({
      timestamp,
    }));
    this.state = {
      timestamp: 'Need to design expire observable',
    };
  }
  render() {
    return (
      <div className="socket-test">
        <p className="socket-intro">
          This is the timer value2: {this.state.timestamp}
        </p>
      </div>
    );
  }
}

export default SocketTest;
