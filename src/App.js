/*
@node_command.js Copyright (c) 2023 Jalasoft
2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20, Edificio Union No 1376, La Paz, Bolivia All rights reserved
This software is the confidential and proprietary information of
Jalasoft, Confidential Information "). You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into with Jalasoft
*/

import React, { useState } from 'react';
import { ColorModeContext, useMode } from './alternative_theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import {Dashboard} from './scenes/dashboard';
// import Form from './scenes/profileform';
import { initialValues, Form } from './scenes/profileform';
import InterviewEnglish from './scenes/interviews/english';
import InterviewInformative from './scenes/interviews/informative';
import InterviewPsicologic from './scenes/interviews/psicologic';
// MEETING
import MyMeetings from './scenes/meeting/pages/create';
import NewMeeting from './scenes/meeting/pages';
import Waiting from './scenes/meeting/components/waiting.jsx';
import Room from './scenes/meeting/pages/room.jsx';

import Edit from './scenes/form'
//questionnaire
import QuestionnaireForm from './scenes/questionnaire/questionnaire_form';
import Aptitude from './scenes/questionnaire/tests_forms/aptitude';
import Concentration from './scenes/questionnaire/tests_forms/concentration';
import Logical from './scenes/questionnaire/tests_forms/logical';
import Reasoning from './scenes/questionnaire/tests_forms/reasoning';
import Spatial from './scenes/questionnaire/tests_forms/spatial';


import {Login} from './scenes/login';
import { ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client'
import { Workshop } from "./scenes/workshop";

const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: createUploadLink({
      uri: 'http://localhost:5000/graphql',
    }),
  });

function App() {
  const [theme, colorMode] = useMode();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState(null);

    function handleLogin() {
      setIsLoggedIn(true);
    }

    function handleLoginData(data) {
      setLoginData(data);
    }

  return (
  <ApolloProvider client={client}>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="app">
          {isLoggedIn ? (
          <>
            <Sidebar initialValues={initialValues} />
            <main className="content">
              <Topbar />
              <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/edit" element={<Edit loginData={loginData}/>} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/informative" element={<InterviewInformative />} />
                  <Route path="/psicologic" element={<InterviewPsicologic />} />
                  <Route path="/english" element={<InterviewEnglish />} />
                  <Route path="/questionnaire_form" element={<QuestionnaireForm />} />
                  <Route path="/aptitude" element={<Aptitude />} />
                  <Route path="/concentration" element={<Concentration />} />
                  <Route path="/logical" element={<Logical />} />
                  <Route path="/reasoning" element={<Reasoning />} />
                  <Route path="/spatial" element={<Spatial />} />
                  <Route path="/meeting" element={<NewMeeting />} />
                  <Route path="/meeting/new" element={<MyMeetings />} />
                  <Route path="/meeting/waiting-room" element={<Waiting />} />
                  <Route path="/meeting/room/:id" element={<Room />} />
                  <Route path="/workshop" element={<Workshop />} />
              </Routes>
            </main>
          </>
            ) : (
          <main className="content">
            <Login onLogin={handleLogin} loginData={handleLoginData} />
          </main>
        )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  </ApolloProvider>

  );
}

export default App;
