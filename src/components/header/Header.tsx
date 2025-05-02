import { FC } from "react"
import classes from "./Header.module.scss"
import { Image } from "@mantine/core"

const Header: FC = () => {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>

        {/*  Left Section  */}
        <div className={`Navbar_LeftSection ${classes.navbar_LeftSection}`}>
          <div className={classes.logo}>
            <Image src="/images/logo.png" styles={{ image: { width: "100%", maxWidth: "200px" } }}/>
          </div>
          <ul className={classes.ul}>
            <li>About</li>
            <li>Crew</li>
            <li>Rockets</li>
            <li>Launches</li>
            <li>StarLink</li>
          </ul>
        </div>

        
        {/*  Right Section  */}
        <div className={`Navbar_RightSection ${classes.navbar_RightSection}`}>
          <ul className={classes.ul}>
            <li>Log In</li>
            <li>Sign Up</li>
          </ul>
        </div>

        {/* Menu Icon (for Mobile Screens) */}
        
      </nav>
    </header>
  )
}

export default Header
