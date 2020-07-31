import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';
import '../../../stylesheets/Menu.scss';

const selectedStyle = { color: 'red' };

const Menu = ({ sort }) =>
  (<nav className="menu">
    <Link to="/events" activeStyle={(sort === '/') ? selectedStyle : {}}>events</Link>
    <Link to="/events/games" activeStyle={selectedStyle}>games</Link>
    <Link to="/events/players" activeStyle={selectedStyle}>players</Link>
  </nav>);

Menu.propTypes = {
  sort: PropTypes.string,
};

export default Menu;
