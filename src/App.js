import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Deposit from './pages/Deposit';
import Home from './pages/Home';

function App() {
  return (
    <div className="container">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/update/deposit" element={<Deposit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
