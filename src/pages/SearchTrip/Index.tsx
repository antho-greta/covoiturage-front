import React, {useEffect, useState} from "react";
import {accountService} from "@/services/account.service.tsx";
import axios from "axios";
import Page from "@/components/Page";
import {Button} from "@/components/ui/button.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import DatePicker from "react-datepicker";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx";
import {Link} from 'react-router-dom';

function SearchTrips() {
    const [cities, setCities] = useState<City[] | null>(null);
    const [carBrands, setCarBrands] = useState<string[]>([]);
    const [startDate, setStartDate] = useState(new Date());
    const [idCityDepart, setIdCityDepart] = useState(0);
    const [idCityArrivee, setIdCityArrivee] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [trips, setTrips] = useState<Trip[] | null>(null);

    useEffect(() => {
        const token = accountService.isLogged() ? localStorage.getItem('token') : '';

        axios({
            method: 'get',
            url: 'http://localhost:8000/api/car/brand/listCarBrand',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setCarBrands(response.data);
            // fetchTrips(token);
        });

        axios({
            method: 'get',
            url: 'http://localhost:8000/api/city/listCity',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                setCities(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axios({
            method: 'get',
            url: 'http://localhost:8000/api/trip/listTrip/',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                setTrips(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    useEffect(() => {
        setError(null);
    }, [idCityDepart, idCityArrivee]);

    const [filteredTrips, setFilteredTrips] = useState<Trip[] | null>(null);

    /**
     * Fonction qui permet de filtrer les trajets
     * On filtre en fonction d'une ville de depart, avec une date donnée
     * On filtre en fonction d'une ville d'arrivée, avec une date donnée
     * On filtre en fonction d'une ville de depart et d'une ville d'arrivée, avec une date donnée
     */
    const handleSearch = () => {
        const cityNameDepart = cities?.find(city => city.id === idCityDepart)?.cityName;
        const cityNameArrivee = cities?.find(city => city.id === idCityArrivee)?.cityName;
        let filteredTrips;
        if (trips && cityNameDepart && cityNameArrivee) {
            filteredTrips = trips.filter((trip: any) => {
                const tripDate = new Date(trip["date du trajet"]);
                const selectedDate = new Date(startDate);
                return trip["ville de départ"] === cityNameDepart &&
                    trip["ville d'arrivée"] === cityNameArrivee &&
                    tripDate >= selectedDate;
            });
        } else if (trips && cityNameDepart) {
            filteredTrips = trips.filter((trip: any) => {
                const tripDate = new Date(trip["date du trajet"]);
                const selectedDate = new Date(startDate);
                return trip["ville de départ"] === cityNameDepart &&
                    tripDate >= selectedDate;
            });
        } else if (trips && cityNameArrivee) {
            filteredTrips = trips.filter((trip: any) => {
                const tripDate = new Date(trip["date du trajet"]);
                const selectedDate = new Date(startDate);
                return trip["ville d'arrivée"] === cityNameArrivee &&
                    tripDate >= selectedDate;
            });
        }
        setFilteredTrips(filteredTrips);
    }

    return (
        <Page>
            <div className="pt-3 rounded-none w-[80%] h-[100%] text-center text-white">
                <h1 className="p-2 bg-bleuFonce my-2 rounded">Rechercher un Trajets</h1>
                <Card>
                    <div className={"p-5 flex flex-col justify-center items-center border-b"}>
                        {error ? error : null}
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSearch();
                        }}>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder={"choisissez une marque de voiture"}/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Marque de voiture</SelectLabel>
                                        {carBrands.filter(brand => typeof brand === 'object').map((brand: any) => (
                                            <SelectItem key={brand.idCarBrand} value={brand.carBrandName}>
                                                {brand.carBrandName}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Select onValueChange={(value: string) => setIdCityDepart(parseInt(value))}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choisissez une ville de départ"/>
                                </SelectTrigger>
                                <SelectContent className="m-2">
                                    <SelectGroup>
                                        <SelectLabel>Villes de départ</SelectLabel>
                                        {
                                            cities?.map((city) => (
                                                city && city.id &&
                                                <SelectItem key={city?.id} value={city?.id.toString()}>
                                                    {city?.cityName}
                                                </SelectItem>
                                            ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Select
                                onValueChange={(value: string) => setIdCityArrivee(parseInt(value))}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choisissez une ville de d'arrivée"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Villes d'arrivée</SelectLabel>
                                        {
                                            cities?.map((city) => (
                                                city && city.id &&
                                                <SelectItem key={city?.id} value={city?.id.toString()}>
                                                    {city?.cityName}
                                                </SelectItem>
                                            ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <label className={"w-full flex flex-col text-left my-2 py-2 text-black"}>Date du départ
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date: Date) => setStartDate(date)}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    dateFormat="yyyy-MM-dd'T'HH:mm"
                                />
                            </label>

                            <Button type="submit">Rechercher</Button>
                        </form>
                    </div>
                    {filteredTrips && filteredTrips.length > 0 ? (
                        filteredTrips && filteredTrips.map((trip: any, index: number) => (
                                <div key={trip.id}>
                                    <Link to={`/trip/${trip.id}`} key={index}>
                                        <Card key={index}
                                              className="w-full border-none my-1 bg-bleuFonce hover:bg-bleuClair cursor-pointer transition-colors duration-200">
                                            <CardContent className="flex justify-between pl-4 pr-4">
                                                <div>
                                                    <span>{trip["ville de départ"]}  </span>
                                                    <FontAwesomeIcon icon={faArrowRight}/>
                                                    <span>  {trip["ville d'arrivée"]}</span>
                                                </div>
                                                <div>
                                                    <p>{trip["distance en kilometres"]} km</p>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="justify-start pl-4">
                                                <span className="text-gray-400">{trip["date du trajet"]}</span>
                                            </CardFooter>
                                        </Card>
                                    </Link>
                                </div>
                            )
                        )
                    ) : (
                        <div className={"flex flex-col p-4"}>
                            <p>Aucun trajet trouvé 🧐</p>
                        </div>
                    )}
                </Card>
            </div>
        </Page>
    )
}

export default SearchTrips;