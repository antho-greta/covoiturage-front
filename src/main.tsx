import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AllTrips from './pages/AllTrips/Index.tsx'
import SearchTrip from './pages/SearchTrip/Index.tsx'
import YourTrips from './pages/YourTrips/Index.tsx'
import AddTrip from './pages/AddTrip/Index.tsx'
import Account from './pages/Account/Index.tsx'
import Header from './components/Header'
import Error from "./components/Error.tsx";
import {createGlobalStyle} from "styled-components";

interface GlobalStyleProps {
    className?: string
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
    div {
        font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }
`

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <GlobalStyle />
            <Header />
            <Routes>
                <Route path="/" element={<AllTrips />} />
                <Route path="/searchTrips" element={<SearchTrip />} />
                <Route path="/yourTrips" element={<YourTrips />} />
                <Route path="/addTrip" element={<AddTrip />} />
                <Route path="/account" element={<Account />} />
                <Route path="*" element={<Error />}/>
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)