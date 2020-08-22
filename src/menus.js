import HomeIcon from "react-icons/lib/fa/home";
import { NavLink } from "react-router-dom";
import { UserGreetingId } from "./components/containers";
import "../stylesheets/menus.scss";
import btnRipple from "../stylesheets/btn.js";
import "../stylesheets/btn.scss";
import Dropdown from "react-bootstrap/Dropdown";

const selectedStyle = {
  backgroundColor: "white",
  color: "cornflowerblue",
};

export const MainMenu = () => (
  <nav className="main-menu">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <NavLink to="/">
      <HomeIcon />
    </NavLink>
    <NavLink to="/about" activeStyle={selectedStyle}>
      About
    </NavLink>
    <NavLink to="/owner/dashboard" activeStyle={selectedStyle}>
      Dashboard
    </NavLink>
    <NavLink to="/login" activeStyle={selectedStyle}>
      Login
    </NavLink>
    <NavLink to="/logout" activeStyle={selectedStyle}>
      Logout
    </NavLink>
    <button
      className="btn"
      onClick={(e) => btnRipple.ripple(e)}
      style={{ marginLeft: "56em" }}
    >
      <UserGreetingId />
    </button>
  </nav>
);

export const AboutMenu = ({ match }) => (
  <div className="about-menu">
    <li>
      <NavLink to="/about" style={match.isExact && selectedStyle}>
        [Company]
      </NavLink>
    </li>
    <li>
      <NavLink to="/about/help" activeStyle={selectedStyle}>
        [How to play]
      </NavLink>
    </li>
    <li>
      <NavLink to="/about/media" activeStyle={selectedStyle}>
        [Media]
      </NavLink>
    </li>
    <li>
      <NavLink to="/about/services" activeStyle={selectedStyle}>
        [Services]
      </NavLink>
    </li>
    <li>
      <NavLink to="/about/terms" activeStyle={selectedStyle}>
        [Terms & Conditions]
      </NavLink>
    </li>
  </div>
);
