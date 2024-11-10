import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './main.css'

/// Pages imports
import HomePage from './pages/HomePage';

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
                
                {/*
                <Route path="*" element={<NotFoundPage />} />
                */}
            </Routes>
        </Router>
    );
}

export default App;