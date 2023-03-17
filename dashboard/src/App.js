import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from './scenes/global/Topbar';
import Sidebar from "./scenes/global/Sidebar";
import Dashborard from "./scenes/dashboard";
import Form from "./scenes/profileform";
import InterviewEnglish from "./scenes/interview/english";
import InterviewInformative from "./scenes/interview/informative";
import InterviewPsicologic from "./scenes/interview/psicologic";
import AptitudeTest from "./scenes/test_sector/aptitude";
import ConcentrationTest from "./scenes/test_sector/concentration";
import LogicalTest from "./scenes/test_sector/logical";
import ReasoningTest from "./scenes/test_sector/reasoning";
import SpatialTest from "./scenes/test_sector/spatial";
import initialValues from "./scenes/profileform";


function App() {
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
                <Route path="/profile-form" element={<Form />} />
                <Route path="/informative-interview" element={<InterviewInformative />} />
                <Route path="/psicologic-interview" element={<InterviewPsicologic />} />
                <Route path="/english-interview" element={<InterviewEnglish />} />
                <Route path="/aptitude-test" element={<AptitudeTest />} />
                <Route path="/reasoning-test" element={<ReasoningTest />} />
                <Route path="/logical-test" element={<LogicalTest />} />
                <Route path="/spatial-test" element={<SpatialTest />} />
                <Route path="/concentration-test" element={<ConcentrationTest />} />
              </Routes>        
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
