import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../../stylesheets/VideoDashboard.scss';
import { Videos } from '../containers';
import { withRouter } from 'react-router';
import { MessageBoardId } from '../containers';

// https://stackoverflow.com/questions/40352310/how-do-you-mix-componentdidmount-with-react-redux-connect
// https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html (replace componentWillMount)

function findVideos (onFetch) {
  onFetch();
}

class VideoDashboard extends Component {
  state = {
    onFetch: this.props.onFetch,
  };

  componentDidMount() {
    this._asyncRequest = findVideos(
      this.state.onFetch
    );
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }
  render() {
    const {
      videos,
    } = this.props;
    return (
      <div id="video-dashboard">
        <br />
        <br />
        <br />
        <br />
        <br />
        <MessageBoardId />
        <div><p>Videos</p></div>
        <table>
        <Videos videos={videos} />
        </table>
        <div>
        </div>
      </div>
    );
  }
}

VideoDashboard.propTypes = {
  videos: PropTypes.array,
  onFetch: PropTypes.func,
};

VideoDashboard.defaultProps = {
  onFetch: f => f,
};

export default withRouter(VideoDashboard);
