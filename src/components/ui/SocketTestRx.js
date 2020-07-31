import React from 'react';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromPromise';
// import { subscribeToTimer } from './../../lib/socketApi';

class SocketTest extends React.Component {
  constructor(props) {
    super(props);
    // subscribeToTimer((err, timestamp) => this.setState({
    //  timestamp,
    // }));
    this.state = {
      timestamp: 'Need to design expire observable',
    };
  }
  componentDidMount() {
    const result = Observable.fromPromise(fetch('http://localhost:4500/games/expiredate/6da7df34-132f-45a7-9b8e-df253eca749e'));
    result.subscribe(x => alert(x), e => console.error(e));
  }

  render() {
    return (
      <div className="Socket-test">
        <p className="Socket-intro">
          This is the timer WildAlmonds: {this.state.timestamp}
        </p>
      </div>
    );
  }
}

export default SocketTest;
