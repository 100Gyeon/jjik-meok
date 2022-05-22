import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Home from 'pages/Home';
import Refrigerator from 'pages/Refrigerator';
import Receipt from 'pages/Receipt';
import Recipe from 'pages/Recipe';

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/refrigerator" element={<Refrigerator />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/*" element={<p>Page Not Found</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
