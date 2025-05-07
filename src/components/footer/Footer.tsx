import { BsTwitterX, BsLinkedin, BsInstagram, BsGithub } from "react-icons/bs";
import classes from "./Footer.module.scss";
const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className={classes.footer_UpperSection}>
                <ul className={classes.ul}>
                    <li><BsTwitterX size={20} color="#fff" /></li>
                    <li><BsInstagram size={20} color="#fff" /></li>
                    <li><BsLinkedin size={20} color="#fff" /></li>
                    <li><BsGithub size={20} color="#fff" /></li>
                </ul>
            </div>
            <div className={classes.footer_LowerSection}>
                <p>&copy;Copyright 2025</p>
                <p>Developed by <span>Vivek Dahiya</span></p>
            </div>
        </footer>
    )
}

export default Footer
