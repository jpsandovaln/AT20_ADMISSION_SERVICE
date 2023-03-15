import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from './scenes/global/Topbar';
import Sidebar from "./scenes/global/Sidebar";
import Dashborard from "./scenes/dashboard";
import NewMeeting from "./scenes/meeting";


function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar/>
              <Routes>
                <Route path="/" element={<Dashborard />} />
                <Route path="/meeting" element={<NewMeeting />} />
              </Routes>        
          </main> 
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
