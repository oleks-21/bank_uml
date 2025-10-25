import './App.css';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MainPage } from './components/MainPage/MainPage';
import { Register } from './components/Register/Register';
import { AccountPage } from './components/AccountPage/AccountPage';
import { TopBar } from './components/TopBar/TopBar';
function App() {
  return (
    <div>
      <Router>
          <TopBar />
        <div style={{ marginTop: "5em" }}>
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/account" element={<AccountPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
