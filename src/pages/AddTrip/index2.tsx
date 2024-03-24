import React, { useEffect, useState } from 'react'; import { useForm } from 'react-hook-form'; import axios from 'axios'; import DatePicker from 'react-datepicker'; import Select from 'react-select'; import Page from '@/components/Page'; import { accountService } from '@/services/account.service';  function AddTrip() { const { register, handleSubmit, setValue } = useForm(); const [cities, setCities] = useState([]); const [startDate, setStartDate] = useState(new Date());
    useEffect(() => {
        const token = accountService.isLogged() ? localStorage.getItem('token') : '';
        axios({
            method: 'get',
            url: `http://localhost:8000/api/person/info`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                setPersonData(response.data);
                setPersonId(response.data.id);
                return axios({
                    method: 'get',
                    url: `http://localhost:8000/api/city/listCity`,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            })
            .then((response) => {
                setCities(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    } , []);

    const onSubmit = data => {
        const tripData = {
            idToDrive: 2, // Remplacer par l'ID de l'utilisateur connecté
            idToStartCity: data.startCity.value,
            idToEndCity: data.endCity.value,
            killometers: data.kilometers,
            dateTrip: startDate.toISOString().slice(0, 16)
        };

        axios.post('http://localhost/api/trip/createTrip', tripData)
            .then(response => {
                console.log(response.data);
            });
    };

    return (
        <Page>


            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Ville de départ
                    <Select {...register('startCity')} options={cities} />
                </label>
                <label>
                    Ville d'arrivée
                    <Select {...register('endCity')} options={cities} />
                </label>
                <label>
                    Date du voyage
                    <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                </label>
                <label>
                    Nombre de kilomètres
                    <input {...register('kilometers')} type="number" />
                </label>
                <input type="submit" />
            </form>
        </Page>
    );
};  export default AddTrip;