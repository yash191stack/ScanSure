import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Result from './Pages/Result';
import About from './Pages/About';
import HowItWorks from './Pages/HowItWorks';
import Awareness from './Pages/Awareness';
import Insights from './Pages/Insights';
import Alternatives from './Pages/Alternatives';


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/result" element={<Result />} />
            <Route path="/about" element={<About />} />
            <Route path="/how" element={<HowItWorks />} />
            <Route path="/awareness" element={<Awareness />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/alternatives" element={<Alternatives />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
