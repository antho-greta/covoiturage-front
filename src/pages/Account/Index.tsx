import Page from "../../components/Page";
import {useEffect, useState} from "react";
import {accountService} from "../../services/account.service.tsx";
import axios from "axios";

function Account(){
    const [data, setData] = useState(null);

    useEffect(() => {
        const token = accountService.isLogged() ? localStorage.getItem('token') : '';

        axios({
            method: 'get',
            url: 'http://localhost:8000/api/car/listCar',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => setData(response.data))
            .catch((error) => console.log(error))
    }, [])

    return (
        <Page>
            <h1>Mon Compte</h1>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </Page>
    )
}
export default Account