// Import Statements
import { FC } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Burger, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Menu.module.scss'

// Props Definition
interface Props {
    MenuItems: {
        name: string
        url: string
    }[]
}

const Menu_Component: FC<Props> = ({ MenuItems }) => {

    // States & Hooks
    const [opened, { toggle }] = useDisclosure();
    const navigate = useNavigate();


    // Functions
    const handleLogOut = () => {
        document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
        navigate('/login', { replace: true });
    }


    return (
        <div className={classes.menuIcon}>
            <Menu
                withArrow
                arrowPosition="center"
                width={200}
                shadow="md"
                position="bottom-end"
                closeOnClickOutside={false}
            >
                <Menu.Target>
                    <Burger opened={opened} onClick={toggle} size={25} color="#848eff" />
                </Menu.Target>
                <Menu.Dropdown className={classes.menuDropdown}>
                    {MenuItems.map((item, index) => (
                        <Menu.Item key={index} component={NavLink} to={item.url} className={classes.menuItems} onClick={toggle}>
                            {item.name}
                        </Menu.Item>
                    ))}
                    <Menu.Item onClick={handleLogOut} className={classes.menuItems}>
                        {document.cookie.includes('session=active') ? "Log Out" : "Log In"}
                    </Menu.Item>
                    <Menu.Item component={NavLink} to="/signup" className={classes.menuItems}>
                        Sign Up
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
    )
}

export default Menu_Component;
