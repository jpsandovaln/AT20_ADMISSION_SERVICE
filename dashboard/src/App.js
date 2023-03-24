/*
@node_command.js Copyright (c) 2023 Jalasoft
2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20, Edificio Union No 1376, La Paz, Bolivia All rights reserved
This software is the confidential and proprietary information of
Jalasoft, Confidential Information "). You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into with Jalasoft
*/

import React from 'react';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashborard from './scenes/dashboard';
import { Form, initialValues } from './scenes/profileform';
import InterviewEnglish from './scenes/english';
import InterviewInformative from './scenes/informative';
import InterviewPsicologic from './scenes/psicologic';
import NewMeeting from './scenes/meeting';
import Aptitude from './scenes/aptitude';
import Concentration from './scenes/concentration';
import Logical from './scenes/logical';
import Reasoning from './scenes/reasoning';
import Spatial from './scenes/spatial';
import UserList from './scenes/newUser';

function App () {
    const [theme, colorMode] = useMode();
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div className="app">
                    <Sidebar initialValues={initialValues} />
                    <main className="content">
                        <Topbar/>
                        <Routes>
                            <Route path="/" element={<Dashborard />} />
                            <Route path="/form" element={<Form />} />
                            <Route path="/informative" element={<InterviewInformative />} />
                            <Route path="/psicologic" element={<InterviewPsicologic />} />
                            <Route path="/english" element={<InterviewEnglish />} />
                            <Route path="/meeting" element={<NewMeeting />} />
                            <Route path="/aptitude" element={<Aptitude />} />
                            <Route path="/concentration" element={<Concentration />} />
                            <Route path="/logical" element={<Logical />} />
                            <Route path="/reasoning" element={<Reasoning />} />
                            <Route path="/spatial" element={<Spatial />} />
                            <Route path="/newUser" element={<UserList />} />
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
