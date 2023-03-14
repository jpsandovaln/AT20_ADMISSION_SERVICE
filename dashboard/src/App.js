import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from './scenes/global/Topbar';
import Sidebar from "./scenes/global/Sidebar";
import Dashborard from "./scenes/dashboard";
import Aptitude from "./scenes/aptitude";
import Concentration from "./scenes/concentration";
import Logical from "./scenes/logical";
import Reasoning from "./scenes/reasoning";
import Spatial from "./scenes/spatial";

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
                <Route path="/aptitude" element={<Aptitude />} />
                <Route path="/concentration" element={<Concentration />} />
                <Route path="/logical" element={<Logical />} />
                <Route path="/reasoning" element={<Reasoning />} />
                <Route path="/spatial" element={<Spatial />} />
              </Routes>        
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
