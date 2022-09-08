import React from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";

// Pages
import HomePage from './pages/HomePage';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<HomePage />} />
                
            </Routes>
        </BrowserRouter>
    );
};
