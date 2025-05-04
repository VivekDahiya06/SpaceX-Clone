import { Burger, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { FC } from 'react'
import { NavLink } from 'react-router-dom';
import classes from './Menu.module.scss'


interface Props {
    MenuItems: {
        name: string
        url: string
    }[]
}

const Menu_Component: FC<Props> = ({ MenuItems }) => {

    // States
    const [opened, { toggle }] = useDisclosure();

    return (
        <div className={classes.menuIcon}>
            <Menu
                withArrow
                arrowPosition="center"
                width={200}
                shadow="md"
                position="bottom-end"
                closeOnClickOutside={false}
                zIndex={9999}
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
                    <Menu.Item component={NavLink} to="/login" className={classes.menuItems}>
                        Log In
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
