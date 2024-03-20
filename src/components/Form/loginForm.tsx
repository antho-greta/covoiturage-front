import React, {useState} from 'react';
import axios from 'axios';
import {accountService} from "../../services/account.service";
import {useNavigate} from "react-router-dom";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";

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
                accountService.saveToken(res.data.token);
                navigate('/allTrips');
            })
            .catch(err => console.log(err));
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Connexion</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5 bg-primary">
                            <label>
                                Username:
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                            </label>
                            <label>
                                Password:
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </label>
                            <button type="submit">Login</button>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
            </CardFooter>
        </Card>


    );
}

export default Login;