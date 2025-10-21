import logo from './logo.svg';
import './App.css';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { MainPage } from './components/MainPage/MainPage';
import { Register } from './components/Register/Register';
function App() {
  return (
    <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route exact path="/register" element={<Register />} />

          </Routes>
        </Router>
    </div>
  );
}

export default App;
