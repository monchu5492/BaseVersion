import React from 'react';
import PropTypes from 'prop-types';
import { getClockTime } from '../../lib/lib';

let secondsToWait = 1000;
let checkDistanceForGrowth = (2592000000 * 12);

function checkForExpire(distance) {
  // Bug bug:  Had an issue with the time showing expired for a second
  // Then starting to grow rather than countdown
  // Some of the code below was required to get around that bug
  // Not a very tidy solution though, better code likely possible

  if ((distance < 1000) || (distance > checkDistanceForGrowth)) {
    checkDistanceForGrowth = 999;
    secondsToWait = 2592000000; // one month
    return {
      expires: 'EXPIRED!!!', days: '', hours: '', minutes: '', seconds: '',
    };
  }
  return getClockTime(distance);
}

function setExpired(expireMessage) {
  return {
    expires: `${expireMessage}`, days: '', hours: '', minutes: '', seconds: '',
  };
}

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expires: '', days: '', hours: '', minutes: '', seconds: '',
    };
  }
  componentDidMount() {
    // this must be fixed!!!
    // else delays in loading will result in no expiration shown
    // should be a promise rather than the timeout?
    // show the Loading... until the promise returns?
    setTimeout(() => {
      const baseExpireDate = new Date(this.props.expires);
      const baseTime = new Date(this.props.time);
      const noExpire = 'No expiration';
      const didExpire = 'EXPIRED!!!';

      if (!this.props.expires) {
        this.setState(setExpired(noExpire));
      } else if ((this.props.expires) && (baseExpireDate < baseTime)) {
        this.setState(setExpired(didExpire));
      } else if ((this.props.expires) && (baseExpireDate > baseTime)) {
        this.ticking = setInterval(
          () =>
            this.setState(checkForExpire(Math.abs((baseExpireDate) -
            baseTime.setSeconds(baseTime.getSeconds() + 1))))
          , secondsToWait,
        );
      } else {
        console.log('You should not see me');
      }
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.ticking);
    console.log('Stopping Clock');
  }
  render() {
    const {
      expires, days, hours, minutes, seconds,
    } = this.state;
    return (
      <div id="clockstart">
        <span><strong>{expires}</strong></span>
        <span>{days}</span>
        <span>{hours}</span>
        <span>{minutes}</span>
        <span>{seconds}</span>
      </div>
    );
  }
}

Countdown.propTypes = {
  expires: PropTypes.string,
  time: PropTypes.string,
};

export default Countdown;
