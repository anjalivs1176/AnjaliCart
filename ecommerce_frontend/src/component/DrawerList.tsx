import { ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../state/store'
import { logout } from '../state/AuthSlice'

interface menuItem {
    name: string,
    path: string,
    icon: any,
    activeIcon: any
}

interface DrawerListProps {
    menu: menuItem[],
    menu2: menuItem[],
    toggleDrawer: () => void
}

const DrawerList = ({ menu, menu2, toggleDrawer }: DrawerListProps) => {

    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const handleClick = (path: string) => {
        navigate(path);
        toggleDrawer();
    }

    const handleLogout=()=>{
        dispatch(logout(navigate))
    }

    return (
        <div className='h-full'>
            <div className='flex flex-col justify-between h-full w-[300px] border-r py-5'>

                {/* MAIN MENU */}
                <div className='space-y-2'>
                    {
                        menu.map((item, index: number) => {
                            const isActive = item.path === location.pathname;

                            return (
                                <ListItem
                                    key={index}
                                    onClick={() => handleClick(item.path)}
                                    className={`cursor-pointer flex items-center gap-4 rounded-r-full px-5 py-3 transition-all duration-200
                                        ${isActive ? 'bg-primary-color text-white shadow-md' : 'text-primary-color hover:bg-gray-100'}
                                    `}
                                >
                                    <ListItemIcon className='min-w-min'>
                                        {isActive ? item.activeIcon : item.icon}
                                    </ListItemIcon>

                                    <ListItemText primary={item.name} />
                                </ListItem>
                            )
                        })
                    }
                </div>
                <Divider/>
                <div className='space-y-2'>
                    {
                        menu2.map((item, index: number) => {
                            const isActive = item.path === location.pathname;

                            return (
                                <ListItem
                                    key={index}
                                    onClick={
                                        () => {
                                            navigate(item.path)
                                            if(item.path == "/") handleLogout()
                                        }
                                    }
                                    className={`cursor-pointer flex items-center gap-4 rounded-r-full px-5 py-3 transition-all duration-200
                                        ${isActive ? 'bg-primary-color text-white shadow-md' : 'text-primary-color hover:bg-gray-100'}
                                    `}
                                >
                                    <ListItemIcon className='min-w-min'>
                                        {isActive ? item.activeIcon : item.icon}
                                    </ListItemIcon>

                                    <ListItemText primary={item.name} />
                                </ListItem>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default DrawerList
