/*
@node_command.js Copyright (c) 2023 Jalasoft
2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20, Edificio Union No 1376, La Paz, Bolivia All rights reserved
This software is the confidential and proprietary information of
Jalasoft, Confidential Information "). You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into with Jalasoft
*/

import { Box, IconButton, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext } from '../../alternative_theme';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import './styles.css'; 

const Topbar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    return (
        <Box display="flex" justifyContent="right" p={3}>
            <Box display="flex" textAlign="right">
                <IconButton className="topbar-icon-button" onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ?(
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton className="topbar-icon-button">
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton className="topbar-icon-button">
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton className="topbar-icon-button">
                    <PersonOutlinedIcon />
                </IconButton>
            </Box>
        </Box>
    )
};

export default Topbar;