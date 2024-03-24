import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {BrowserRouter as Router, Navigate, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import AllTrips from './pages/AllTrips/Index.tsx'
import SearchTrip from './pages/SearchTrip/Index.tsx'
import YourTrips from './pages/YourTrips/Index.tsx'
import AddTrip from './pages/AddTrip/Index.tsx'
import Account from './pages/Account/Index.tsx'
import Login from "./pages/Login/Index.tsx";
import Error from "./components/Error.tsx";

import Header from './components/Header'
import {createGlobalStyle} from "styled-components";
import {accountService} from "./services/account.service.tsx";
import {Switch} from "@radix-ui/react-switch";
import TripDetails from "@/pages/Trip";

interface GlobalStyleProps {
    className?: string
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
    div {
        font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }
`

const AuthGuard = ({children}: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=> {
        if (!accountService.isLogged()) {
            navigate('/login');
        }
    }, [location]);

    if (!accountService.isLogged()) {
        return null;
    }
    return children
};


ReactDOM.render(
    <React.StrictMode>
        <Router>
            <GlobalStyle/>
            <Header/>
            <Routes>
                <Route path="/" element={<Navigate to="/allTrips" replace />} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/allTrips" element={<AuthGuard><AllTrips/></AuthGuard>}/>
                <Route path="/searchTrips" element={<AuthGuard><SearchTrip/></AuthGuard>}/>
                <Route path="/yourTrips" element={<AuthGuard><YourTrips/></AuthGuard>}/>
                <Route path="/addTrip" element={<AuthGuard><AddTrip/></AuthGuard>}/>
                <Route path="/account" element={<AuthGuard><Account/></AuthGuard>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/trip/:id" element={<AuthGuard><TripDetails/></AuthGuard>}/>
                <Route path="*" element={<Error/>}/>
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)