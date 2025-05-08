import { FC } from "react";
import classes from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Menu_Component from "../menu/Menu";

const Header: FC = () => {
  // Constants
  const Navbar_Items = [
    { name: "About", url: "/about" },
    { name: "Crew", url: "/crew" },
    { name: "Rockets", url: "/rockets" },
    { name: "Launches", url: "/launches" },
    { name: "StarLink", url: "/starlink" },
  ];


  // States
  const navigate = useNavigate();


  // Functions
  const handleLogOut = () => {
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    navigate('/login', { replace: true });
  }


  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        {/* Left Section */}
        <div className={`Navbar_LeftSection ${classes.navbar_LeftSection}`}>
          <div className={classes.logo}>
            <Link to="/">
              <img
                src="/images/logo.png"
                loading="lazy"
                className={classes.image}
                alt="Logo"
              />
            </Link>
          </div>
          <ul className={classes.ul}>
            {Navbar_Items.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    `${classes.navLink} ${isActive ? classes.active : ""}`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div className={`Navbar_RightSection ${classes.navbar_RightSection}`}>
          <ul className={classes.ul}>
            <li onClick={handleLogOut} className={classes.navLink}>
                {document.cookie.includes('session=active') ? "Log Out" : "Log In"}
            </li>
            <li>
              <NavLink to="/signup" className={classes.navLink}>
                Sign Up
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Icon */}
        <Menu_Component MenuItems={Navbar_Items} />
        
      </nav>
    </header>
  );
};

export default Header;
