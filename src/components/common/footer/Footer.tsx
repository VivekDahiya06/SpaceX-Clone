// Import Statements
import { BsTwitterX, BsLinkedin, BsInstagram } from "react-icons/bs";
import classes from "./Footer.module.scss";


const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className={classes.footer_UpperSection}>
                <ul className={classes.ul}>
                    <li>
                        <a href="https://x.com/SpaceX" target="_blank" rel="noreferrer noopener">
                            <BsTwitterX size={20} color="#fff" />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/spacex/#" target="_blank" rel="noreferrer noopener">
                            <BsInstagram size={20} color="#fff" />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/company/spacex/" target="_blank" rel="noreferrer noopener">
                            <BsLinkedin size={20} color="#fff" />
                        </a>
                    </li>
                </ul>
            </div>
            <div className={classes.footer_LowerSection}>
                <p>&copy;Copyright 2025</p>
                <p>Developed by <span>Vivek Dahiya</span></p>
            </div>
        </footer>
    )
}

export default Footer;
