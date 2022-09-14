import React from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import ReactGA from 'react-ga';

// Pages
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';

export default function App() {
    React.useEffect(() => {
        ReactGA.initialize("G-XGZR7JX9MT");
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<HomePage />} />

                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </BrowserRouter>
    );
};
