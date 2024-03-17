import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
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

interface GlobalStyleProps {
    className?: string
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
    div {
        font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }
`

const AuthGuard = ({children}: {children: React.ReactNode}) => {
    if (!accountService.isLogged()) {
        return <Login/>
    }
    return children
};


ReactDOM.render(
    <React.StrictMode>
        <Router>
            <GlobalStyle />
            <Header />
            <Routes>
                <Route path="/" element={<AuthGuard><AllTrips /></AuthGuard>} />
                <Route path="/searchTrips" element={<AuthGuard><SearchTrip /></AuthGuard>} />
                <Route path="/yourTrips" element={<AuthGuard><YourTrips /></AuthGuard>} />
                <Route path="/addTrip" element={<AuthGuard><AddTrip /></AuthGuard>} />
                <Route path="/account" element={<AuthGuard><Account /></AuthGuard>} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Error />}/>
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)