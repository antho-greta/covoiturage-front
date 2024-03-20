import Page from '../../components/Page/index.tsx';
import {accountService} from "@/services/account.service.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import {Card, CardContent, CardFooter, CardTitle} from "@/components/ui/card.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';

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

function AllTrips() {
    const [data, setData] = useState<Trip[] | null>(null);

    useEffect(() => {
        const token = accountService.isLogged() ? localStorage.getItem('token') : '';
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/trip/listTrip/',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => setData(response.data))
            .catch((error) => console.log(error))
    }, [])

    return (
        <Page>
            <div className="w-full pt-3 rounded-none w-[80%] h-[100%] cursor-pointer text-center">
                <h1 className="p-2">Liste des Trajets</h1>
                {data && data.map((trip, index) => {
                    if (index === 0) return null; // On ne prend pas en compte le premier élément du tableau qui est vide
                    return (
                        <Link to={`/reservation/${trip.id}`} key={index}>
                            <Card key={index} className="w-full rounded-none border-none my-1 bg-bleuClair hover:bg-bleuClairHover transition-colors duration-200">
                                <CardContent className="flex justify-between pl-4 pr-4">
                                    <div>
                                        <span>{trip["ville de départ"]}  </span>
                                        <FontAwesomeIcon icon={faArrowRight}/>
                                        <span>  {trip["ville d'arrivée"]}</span>
                                    </div>
                                    <div>
                                        <p>TODO Total distance</p>
                                    </div>
                                </CardContent>
                                <CardFooter className="justify-start pl-4">
                                    <span className="text-gray-500">{trip["date du trajet"]}</span>
                                </CardFooter>
                            </Card>
                        </Link>
                    )
                })}
            </div>
        </Page>
    )
}

export default AllTrips
