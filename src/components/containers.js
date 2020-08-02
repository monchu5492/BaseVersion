import { connect } from 'react-redux';
import AddUserForm from './ui/AddUserForm.jsx';
import ForgotPasswordForm from './ui/ForgotPasswordForm.jsx';
import Logout from './ui/Logout.jsx';
import MessageBoard from './ui/MessageBoard.jsx';
import OwnerDashboard from './ui/OwnerDashboard.jsx';
import OwnerList from './ui/OwnerList.jsx';
import ResetPasswordForm from './ui/ResetPasswordForm.jsx';
import UserLoginForm from './ui/UserLoginForm.jsx';
import UserGreeting from './ui/UserGreeting.jsx';
import VideoDashboard from './ui/VideoDashboard.jsx';
import VideoPageList from './ui/VideoPageList.jsx';
import {
  addUser,
  checkAuth,
  checkForVideo,
  login,
  resetPassword,
  forgotPassword,
  fetchTournaments,
  fetchTime,
  setMessage,
  fetchPlayerName,
  fetchOwnerTournaments,
  fetchLogout,
}
  from '../actions';

export const OwnerDashboardId = connect(
  state =>
    ({
      messagetext: state.message.text,
      time: state.servertime.time,
      expiretime: state.expiretime.expires,
    }),
  dispatch =>
    ({
      onFetchOwnerTournaments() {
        dispatch(checkAuth());
        dispatch(fetchOwnerTournaments());
      },
      onFetchAuthStatus() {
        dispatch(checkAuth());
      },
    }),
)(OwnerDashboard);

export const LogoutId = connect(dispatch =>
  ({
    onLogout() {
      dispatch(fetchLogout());
    },
  }))(Logout);

export const UserGreetingId = connect(
  state =>
    ({
      player: state.player.playername,
    }),
  dispatch =>
    ({
      onFetchPlayerName() {
        dispatch(fetchPlayerName());
      },
    }),
)(UserGreeting);

export const OwnerTournaments = connect(
  state =>
    ({
      tournaments: state.ownerList.tournaments,
    }),
  dispatch =>
    ({
      onFetch() {
        dispatch(fetchTournaments());
        dispatch(fetchPlayerName());
        dispatch(fetchTime());
      },
      onRemove(id) {
        dispatch(removeTournament(id));
      },
    }),
)(OwnerList);

export const Videos = connect(state =>
  ({
    videos: state.videosList.videos,
  }))(VideoPageList);

export const NewUser = connect(
  null,
  dispatch =>
    ({
      onNewUser(email, password) {
        dispatch(addUser(email, password));
      },
      onMessage(message) {
        dispatch(setMessage(message));
      },
    }),
)(AddUserForm);

export const Forgot = connect(
  null,
  dispatch =>
    ({
      onForgot(email) {
        dispatch(forgotPassword(email));
      },
    }),
)(ForgotPasswordForm);

export const Reset = connect(
  null,
  dispatch =>
    ({
      onReset(token, password) {
        dispatch(resetPassword(token, password));
      },
      onMessage(message) {
        dispatch(setMessage(message));
      },
    }),
)(ResetPasswordForm);

export const UserLogin = connect(
  null,
  dispatch =>
    ({
      onLogin(email, password) {
        dispatch(login(email, password));
      },
      onMessage(message) {
        dispatch(setMessage(message));
      },
    }),
)(UserLoginForm);

export const VideoDashboardId = connect(
  state =>
    ({
      videos: state.videosList.videos,
    }),
  dispatch =>
    ({
      onFetch() {
        dispatch(checkForVideo());
      },
    }),
)(VideoDashboard);

export const MessageBoardId = connect(
  state =>
    ({
      text: state.message.text,
    }),
  dispatch =>
    ({
      onResetMessage() {
        dispatch(setMessage('WildAlmonds'));
      },
    }),
)(MessageBoard);