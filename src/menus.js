import HomeIcon from "react-icons/lib/fa/home";
import { NavLink } from "react-router-dom";
import { UserGreetingId } from "./components/containers";
import "../stylesheets/menus.scss";
import btnRipple from "../stylesheets/btn.js";
import "../stylesheets/btn.scss";
import Dropdown from "react-bootstrap/Dropdown";

const selectedStyle1 = {
  backgroundColor: "white",
  color: "#8d8741",
  borderRadius: "20px",
};

const selectedStyle2 = {
  backgroundColor: "white",
  color: "#daad86",
  height: "44px",
  textAlign: "center",
  borderRadius: "10px",
};

export const MainMenu = () => (
  <nav className="main-menu">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <NavLink to="/">
      <HomeIcon />
    </NavLink>
    <NavLink to="/about" activeStyle={selectedStyle1}>
      About
    </NavLink>
    <NavLink to="/owner/dashboard" activeStyle={selectedStyle1}>
      Dashboard
    </NavLink>
    <NavLink to="/login" activeStyle={selectedStyle1}>
      Login
    </NavLink>
    <NavLink to="/logout" activeStyle={selectedStyle1}>
      Logout
    </NavLink>
    <button className="btn" onClick={(e) => btnRipple.ripple(e)}>
      <UserGreetingId />
    </button>
  </nav>
);

export const AboutMenu = ({ match }) => (
  <div className="about-menu">
    <li>
      <NavLink to="/about" style={match.isExact && selectedStyle2}>
        [Company]
      </NavLink>
    </li>
    <li>
      <NavLink to="/about/help" activeStyle={selectedStyle2}>
        [How to play]
      </NavLink>
    </li>
    <li>
      <NavLink to="/about/media" activeStyle={selectedStyle2}>
        [Media]
      </NavLink>
    </li>
    <li>
      <NavLink to="/about/services" activeStyle={selectedStyle2}>
        [Services]
      </NavLink>
    </li>
    <li>
      <NavLink to="/about/terms" activeStyle={selectedStyle2}>
        [Terms & Conditions]
      </NavLink>
    </li>
  </div>
);
