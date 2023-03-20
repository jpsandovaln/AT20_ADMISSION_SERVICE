import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from './scenes/global/Topbar';
import Sidebar from "./scenes/global/Sidebar";
import Dashborard from "./scenes/dashboard";
import Form from "./scenes/profileform";
import InterviewEnglish from "./scenes/english";
import InterviewInformative from "./scenes/informative";
import InterviewPsicologic from "./scenes/psicologic";
import AptitudeTest from "./scenes/aptitude";
import ConcentrationTest from "./scenes/concentration";
import LogicalTest from "./scenes/logical";
import ReasoningTest from "./scenes/reasoning";
import SpatialTest from "./scenes/spatial";
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
                <Route path="/form" element={<Form />} />
                <Route path="/informative" element={<InterviewInformative />} />
                <Route path="/psicologic" element={<InterviewPsicologic />} />
                <Route path="/english" element={<InterviewEnglish />} />
                <Route path="/aptitude" element={<AptitudeTest />} />
                <Route path="/reasoning" element={<ReasoningTest />} />
                <Route path="/logical" element={<LogicalTest />} />
                <Route path="/spatial" element={<SpatialTest />} />
                <Route path="/concentration" element={<ConcentrationTest />} />
              </Routes>        
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
