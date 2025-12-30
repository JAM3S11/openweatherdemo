import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './common/Header';
import HomePage from './pages/HomePage';
import MoreHomePage from './pages/MoreHomePage';
import IllustrationPage from './pages/IllustrationPage';
import ShowcasePage from './pages/ShowCasePage';
import Footer from './common/Footer';

export default function App() {
  const handleStart = () => {
    window.scrollTo({ top: 800, behavior: 'smooth'});
  };

  return (
    <div className='flex flex-col min-h-screen bg-white'>
      <Header />
      <main className='flex-grow'>
        <Routes>
          <Route path='/' element={
            <>
              <HomePage onStart={handleStart} />
              <MoreHomePage />
              <IllustrationPage />
              <ShowcasePage />
            </>
          } />
          <Route path='/illustration' element={<IllustrationPage />} />
          <Route path='/showcase' element={<ShowcasePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}