import { FC } from "react";
import classes from "./Header.module.scss";
import { Image } from "@mantine/core";
import { IoMenu } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";

const Header: FC = () => {

  
  // Constants
  const Navbar_List_Items = [
    {
      name: 'About',
      url: '/about'
    },
    {
      name: 'Crew',
      url: '/crew'
    },
    {
      name: 'Rockets',
      url: '/rockets'
    },
    {
      name: 'Launches',
      url: '/launches'
    },
    {
      name: 'StarLink',
      url: '/starlink'
    }

  ]


  // Functions
  const handle_MobileMenu = () => {
    console.log("Mobile Menu Clicked")
  }


  return (
    <header className={classes.header}>
      <nav className={classes.nav}>

        {/*  Left Section  */}
        <div className={`Navbar_LeftSection ${classes.navbar_LeftSection}`}>
          <div className={classes.logo}>
            <Link to="/">
              <Image src="/images/logo.png" styles={{ image: { width: "100%", maxWidth: "200px" } }} />
            </Link>
          </div>
          <ul className={classes.ul}>
            {
              Navbar_List_Items.map((item, index) => {
                return (
                  <NavLink
                    key={index}
                    to={item.url}
                    className={({ isActive }) =>
                      `${classes.navLink} ${isActive ? classes.active : ''}`
                    }
                  >
                    <li>{item.name}</li>
                  </NavLink>
                )
              })
            }
          </ul>
        </div>


        {/*  Right Section  */}
        <div className={`Navbar_RightSection ${classes.navbar_RightSection}`}>
          <ul className={classes.ul}>
            <NavLink to="/login" className={classes.navLink}>
              <li>Log In</li>
            </NavLink>
            <NavLink to="/signup" className={classes.navLink}>
              <li>Sign Up</li>
            </NavLink>
          </ul>
        </div>

        {/* Menu Icon (for Mobile Screens) */}
        <div className={classes.menuIcon}>
          <button onClick={handle_MobileMenu}>
            <IoMenu size={20} color={'#fff'} />
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header
