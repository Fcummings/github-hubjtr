import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Benefits from './components/Benefits';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Signup from './components/Signup';

function App() {
  useEffect(() => {
    console.log('App component rendered');
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <Toaster position="top-center" />
        <Header />
        <Routes>
          <Route path="/" element={
            <main className="pt-16 sm:pt-24 px-4 sm:px-6 lg:px-8">
              <Hero />
              <Features />
              <Benefits />
              <CTA />
            </main>
          } />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;