

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex">
        {/* <SideNav /> Keep the side navigation visible */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


