import React, {useState} from 'react';
import axios from 'axios';
import {accountService} from "../../services/account.service";
import {useNavigate} from "react-router-dom";

interface LoginProps {
    username: string;
    password: string;
}

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log(username, password);
        axios.post('http://localhost:8000/api/login_check', {username, password})
            .then(res => {
                console.log(res);
                accountService.saveToken(res.data.token);
                navigate('/allTrips');
            })
            .catch(err => console.log(err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;