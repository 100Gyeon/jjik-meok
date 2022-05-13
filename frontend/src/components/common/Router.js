import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Home from 'pages/Home';
import Receipt from 'pages/Receipt';
import Refrigerator from 'pages/Refrigerator';

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/refrigerator" element={<Refrigerator />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/*" element={<p>Page Not Found</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
