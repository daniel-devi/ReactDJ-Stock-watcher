import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './main.css'

/// Pages imports
import HomePage from './pages/HomePage';
import SignUp from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import StockData from './pages/StockData'
import Dashboard from './pages/Dashboard';

/**
 * App component
 * @returns {JSX.Element} The main application component
 */

function App() {
    return (
        <Router>
            <Routes>
                {/* Define routes for different pages */}
        
                <Route path="/" element={<HomePage />} />

                {/* Authentication Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path='/register' element={<SignUp/>} />

                <Route path='/stock' element={<StockData/>} />
                <Route path="/dashboard" element={< Dashboard/>} />
                
                {/* Define a route for the NotFoundPage */}
                
                <Route path="*" element={<NotFoundPage />} />
                
            </Routes>
        </Router>
    );
}

export default App;