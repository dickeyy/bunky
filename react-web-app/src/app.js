import React from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import ReactGA from 'react-ga4';

// Pages
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';

export default function App() {
    React.useEffect(() => {
        ReactGA.initialize("G-XGZR7JX9MT");
        ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
    }, []);

    console.log(ReactGA.send('pageview'))
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<HomePage />} />

                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </BrowserRouter>
    );
};
