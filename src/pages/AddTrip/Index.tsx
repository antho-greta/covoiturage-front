import {useEffect, useState} from "react";
import axios from "axios";
import Page from "@/components/Page";
import {accountService} from "@/services/account.service";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Button} from "@/components/ui/button.tsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Card} from "@/components/ui/card.tsx";

type City = {
    id: number;
    cityName: string;
};

type Trip = {
    idTrip: number;
    idCityDepart: number;
    idCityArrivee: number;
    personData: string;
    idPerson: number;
    killometers: string;
}

function AddTrip() {
    const [cities, setCities] = useState<City[] | null>(null);
    const [startDate, setStartDate] = useState(new Date());
    const [idCityDepart, setIdCityDepart] = useState(0);
    const [idCityArrivee, setIdCityArrivee] = useState(0);
    const [personData, setPersonData] = useState([]);
    const [personId, setPersonId] = useState(0);
    const [killometers, setKillometers] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = accountService.isLogged() ? localStorage.getItem("token") : "";
        axios({
            method: "get",
            url: `http://localhost:8000/api/person/info`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            console.log(response);
            setPersonData(response.data);
            setPersonId(response.data.id);
        })
        axios({
            method: "get",
            url: `http://localhost:8000/api/city/listCity`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            console.log(response.data)
            setCities(response.data);
        })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    useEffect(() => {
        setError(null);
    }, [idCityDepart, idCityArrivee]);


    const handleSubmit = () => {
        if (idCityArrivee === 0 || idCityDepart === 0) {
            setError("Veuillez choisir une ville d'arrivée et de départ !")
        }
        if (idCityArrivee === idCityDepart) {
            setError("La ville de départ et d'arrivée ne peuvent pas être les mêmes");
        }
        if (killometers === "") {
            setError("Veuillez renseigner le nombre de kilomètres");
        }
        const tripData = {
            idToDrive: personId,
            idToStartCity: idCityDepart,
            idToEndCity: idCityArrivee,
            killometers: killometers,
            dateTrip: new Date(startDate).toISOString().slice(0, 19).replace('T', ' '),
        };
        console.log(tripData)
        axios.post("http://localhost/api/trip/createTrip", tripData)
            .then((response) => {
                console.log("données envoyées: ", tripData);
                console.log(response.data);
                alert("Trajet ajouté avec succès");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Page>
            <Card>
                {error ? error : null}
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}>
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

                    <label>Date du départ
                        <DatePicker
                            selected={startDate}
                            onChange={(date: Date) => setStartDate(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="yyyy-MM-dd'T'HH:mm"
                        />
                    </label>

                    <label>
                        Nombre de kilomètres
                        <input type="number" value={killometers} onChange={(e) => setKillometers(e.target.value)}/>
                    </label>

                    <Button type="submit">Soumettre</Button>
                </form>
            </Card>
        </Page>
    );
}

export default AddTrip;
