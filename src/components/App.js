// import { React } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import {
  About,
  Contact,
  ForgotPassword,
  Home,
  Invite,
  Login,
  Logout,
  Owner,
  ResetPassword,
  Signup,
  Videos,
  Whoops404,
} from '../pages';
import '../../stylesheets/APP.scss';

const App = () =>
  (<Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
    <Route path="/forgot" component={ForgotPassword} />
    <Redirect from="/history" to="/about/history" />
    <Route path="/invite" component={Invite} />
    <Redirect from="/location" to="/about/location" />
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <Route path="/owner/dashboard" component={Owner} />
    <Route path="/owner/report" component={Owner} />
    <Route path="/reset/:token" component={ResetPassword} />
    <Redirect from="/services" to="/about/services" />
    <Route path="/signup" component={Signup} />
    <Route path="/video" component={Videos} />
    <Route component={Whoops404} />
  </Switch>);

export default App;
