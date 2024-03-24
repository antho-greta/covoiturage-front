import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { accountService } from "@/services/account.service.tsx";
import Page from '../../components/Page/index.tsx';

interface Trip {
    id: number;
    "prénom du conducteur": string;
    "nom du conducteur": string;
    "ville de départ": string;
    "ville d'arrivée": string;
    "distance en kilometres": number;
    "nombre de place disponobles": number;
    "date du trajet": string;
}

const TripDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [trip, setTrip] = useState<Trip | null>(null);

    useEffect(() => {
        const token = accountService.isLogged() ? localStorage.getItem('token') : '';
        axios({
            method: 'get',
            url: `http://localhost:8000/api/trip/selectedTrip/${id}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data[1][0]); // Log the data to see what you're receiving
                setTrip(response.data[1][0]);
            })

            .catch((error) => console.log(error))
    }, [id]);

    return (
        <Page>
            {trip && (
                <div>
                    <h1>Trip Details</h1>
                    <p>Conducteur: {trip["prénom du conducteur"]} {trip["nom du conducteur"]}</p>
                    <p>Ville de départ: {trip["ville de départ"]}</p>
                    <p>Ville d'arrivée: {trip["ville d'arrivée"]}</p>
                    <p>Distance: {trip["distance en kilometres"]} km</p>
                    <p>Places disponibles: {trip["nombre de place disponobles"]}</p>
                    <p>Date du trajet: {trip["date du trajet"]}</p>
                </div>
            )}
        </Page>
    );
};

export default TripDetails;