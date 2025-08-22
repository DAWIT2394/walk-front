import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DisplayPage from './component/DisplayPage';
import Home from './component/add';
function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/display" element={<DisplayPage />} />



        </Routes>
      </Router>
    </div>
  );
}

export default App;
