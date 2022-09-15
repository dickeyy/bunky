import React from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import ReactGA from 'react-ga';
import ReactGa4 from 'react-ga4';

// Pages
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';

export default function App() {
    React.useEffect(() => {
        ReactGA.initialize("UA-241148324-1");
        ReactGA.pageview(window.location.pathname + window.location.search);

        ReactGa4.initialize("G-KGKNY8Y1KN");
        ReactGa4.send("pageview", {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname,
        });
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
