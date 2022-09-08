import React from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";

// Pages
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<HomePage />} />

                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </BrowserRouter>
    );
};
