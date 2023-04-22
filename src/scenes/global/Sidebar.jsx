/*
@node_command.js Copyright (c) 2023 Jalasoft
2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20, Edificio Union No 1376, La Paz, Bolivia All rights reserved
This software is the confidential and proprietary information of
Jalasoft, Confidential Information "). You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into with Jalasoft
*/
import { useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import { tokens } from '../../alternative_theme';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import BugReportIcon from '@mui/icons-material/BugReport';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import GroupsIcon from '@mui/icons-material/Groups';
// eslint-disable-next-line react/prop-types
const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <MenuItem
            active={ selected === title }
            style={{
                color: colors.secondary[100]
            }}
            onClick={ () => setSelected(title) }
            icon={icon}
        >
            <Typography>{ title }</Typography>
            <Link to={ to } />
        </MenuItem>
    );
};

// This function verifies the rol and filter the items to show on the sidebar menu
const filterItemsbyRole = () => {
    const role = 'admin';
    let filteredItem = [];
    if (role === 'admin') {
        filteredItem = ['Dashboard', 'Add User', 'Meetings', 'Interviews', 'Tests', 'Create Questionaries', 'Workshops'];
    } else if (role === 'trainer') {
        filteredItem = ['Dashboard', 'Meetings', 'Interviews', 'Create Questionaries', 'Workshops'];
    } else if (role === 'student') {
        filteredItem = ['Dashboard', 'Profile form', 'Interviews', 'Tests', 'Workshops'];
    }
    return filteredItem;
};

// eslint-disable-next-line react/prop-types
const Sidebar = ({ role }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('Dashboard');
    const filteredItem = filterItemsbyRole(role);

    return (
        <Box
            sx={{
                '& .pro-sidebar-inner': {
                    background: `${colors.body[200]} !important`
                },
                '& .pro-icon-wrapper': {
                    backgroundColor: 'transparent !important'
                },
                '& .pro-inner-item': {
                    padding: '5px 35px 5px 20px !important'
                },
                '& .pro-inner-item:hover': {
                    color: `${colors.primary[100]} !important`
                },
                '& .pro-menu-item.active': {
                    color: `${colors.primary[100]} !important`
                }
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape='square'>
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: '10px 0 20px 0',
                            color: colors.primary[100]
                        }}
                    >
                        {!isCollapsed && (
                            <Box className="menu-item" >
                                <Typography variant='h3' color={colors.primary[100]}>
                                    JALASOFT
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb='25px'>
                            <Box display='flex' justifyContent='center' alignItems='center'>
                                <img
                                    alt='profile-user'
                                    src={ '../../assets/user.jpg' }
                                    className="profile-user"
                                />
                            </Box>
                            <Box textAlign='center'>
                                <Typography
                                    variant='h2'
                                    color={colors.title[100]}
                                    // fontWeight='bold'
                                    sx={{ m: '10px 0 0 0' }}
                                >
                                    Pepito
                                </Typography>
                                <Typography variant='h5' color={colors.lightText[100]}>
                                    Perez
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : '10%'}>
                        {filteredItem.includes('Dashboard') && (
                            <Item
                                title='Dashboard'
                                to='/'
                                icon={<HomeOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        )}
                        {filteredItem.includes('Profile form') && (
                            <Item
                                title='Profile Form'
                                to='/form'
                                icon={<PersonOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        )}
                        <Item
                        title='Edit Profile'
                        to='/edit'
                        icon={<PersonOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                        />

                        {filteredItem.includes('Add User') && (
                            <Item
                                title='Add User'
                                to='/form'
                                icon={<PersonAddIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        )}
                        {filteredItem.includes('Meetings') && (
                            <>
                                <Typography
                                    variant='h5'
                                    color={colors.title[100]}
                                    className='menu-tittle'
                                >
                                    {!isCollapsed ? 'Meeting' : <Divider sx={{ width: '80%' }} />}
                                </Typography>

                                <Item
                                    title='My meetings'
                                    to='/meeting'
                                    icon={<GroupsIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title='New meeting'
                                    to='/meeting/new'
                                    icon={<VideoCallIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </>
                        )}
                       {/*
                       {filteredItem.includes('Interviews') && (
                            <>
                                <Typography
                                    variant='h5'
                                    color={colors.secondary[300]}
                                    sx={{ m: '15px 0 5px 20px' }}
                                >
                                    {!isCollapsed ? 'Intervies' : <Divider sx={{ width: '80%' }} />}
                                </Typography>

                                <Item
                                    title='Informative Interview'
                                    to='/informative'
                                    icon={<PeopleOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />

                                <Item
                                    title='Psicologic Interview'
                                    to='/psicologic'
                                    icon={<PeopleOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />

                                <Item
                                    title='English Interview'
                                    to='/english'
                                    icon={<PeopleOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </>
                        )}
                        */}

                        {filteredItem.includes('Create Questionaries') && (
                            <>
                                <Typography
                                    variant='h5'
                                    color={colors.title[100]}
                                    className='menu-tittle'
                                >
                                    {!isCollapsed ? 'Create Questionnaire' : <Divider sx={{ width: '80%' }} />}
                                </Typography>
                                <Item
                                    title='New Questionnaire'
                                    to='/questionnaire_form'
                                    icon={<FormatListBulletedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </>
                        )}
                        {filteredItem.includes('Tests') && (
                            <>
                                <Typography
                                    variant='h5'
                                    color={colors.title[100]}
                                    className='menu-tittle'
                                >
                                    {!isCollapsed ? 'Test' : <Divider className='divider' />}
                                </Typography>
                                <Item
                                    title='Aptitude Tests'
                                    to='/aptitude'
                                    icon={<ReceiptOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title='Reasoning Test'
                                    to='/reasoning'
                                    icon={<ReceiptOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title='Logical Test'
                                    to='/logical'
                                    icon={<ReceiptOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title='Spatial Test'
                                    to='/spatial'
                                    icon={<ReceiptOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title='Concentration Test'
                                    to='/concentration'
                                    icon={<ReceiptOutlinedIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </>
                        )}

                        {filteredItem.includes('Workshops') && (
                            <>
                                <Typography
                                    variant='h6'
                                    color={colors.title[100]}
                                    className='menu-tittle'
                                >
                                    {!isCollapsed ? 'Workshops' : <Divider sx={{ width: '80%' }} />}
                                </Typography>
                                <Item
                                    title='Workshop 1'
                                    to='/workshop'
                                    icon={<BugReportIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                                <Item
                                    title='Workshop 2'
                                    to='/workshop'
                                    icon={<BugReportIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            </>
                        )}
                        <Item
                            title='FAQ Page'
                            to='/faq'
                            icon={<HelpOutlineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};
export default Sidebar;
