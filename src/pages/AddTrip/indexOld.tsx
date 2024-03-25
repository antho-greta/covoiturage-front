import Page from "../../components/Page";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useEffect, useState} from "react";
import axios from "axios";
import {accountService} from "@/services/account.service.tsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"


interface Trajet {
    depart: string;
    arrivee: string;
    date: string;
    distance: string;
}

interface Person {
    id: number;
    login: string;
    prenom: string;
    nom: string;
    telephone: string;
    email: string;
    ville: string;
    cdp: string;
}

const formSchema = z.object({
    depart: z.string().min(0, {
        message: "⬆ veuillez sélectionné une ville de départ",
    }),
    arrivee: z.string().min(0, {
        message: "⬆ veuillez sélectionné une ville d'arrivée",
    }),
    date: z.date().refine(date => !isNaN(date.getTime()), {
        message: "⬆ veuillez sélectionné une date de départ",
    }),
    distance: z.string().min(1, {
        message: "⬆ veuillez renseigner une distance en kilomètre",
    })
})


function AddTrip() {
    const [data, setData] = useState<Trajet[] | null>(null);
    const [cities, setCities] = useState<string[] | null>(null);
    const [personData, setPersonData] = useState<Person | null>(null);
    const [personId, setPersonId] = useState(0);

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
            .then((response) => setCities(response.data))
            .catch((error) => console.log(error))
    }, []);

    /**
     * On définis le schema de validation
     */
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            depart: "",
            arrivee: "",
            date: "",
            distance: "",
        },
    });

    const renderDatePicker = (field: any) => (
        <DatePicker
            {...field}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="yyyy-MM-dd'T'HH:mm"
        />
    );

    const handleSubmitProfilForm = async (data: z.infer<typeof formSchema>) => {
        const token = accountService.isLogged() ? localStorage.getItem('token') : '';
        console.log("Formulaire soumis avec succès ! Données :", data);
        axios.post('http://localhost:8000/api/trip/createTrip', {
            idToDrive: personId,
            idToStartCity: data.depart,
            idToEndCity: data.arrivee,
            dateTrip: data.date.toISOString().slice(0, 16),
            killometers: parseFloat(data.distance)
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data);
                setData(res.data);
                alert("Votre trajet à bien été publié !");
            })
            .catch(err => console.log("Error from server: ", err));
    };

    return (
        <Page>
            <div className="pt-3 rounded-none w-[80%] text-center">
                <div className="flex justify-center mb-4">
                    <h1>Publier un Trajet</h1>
                </div>
                <Card>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmitProfilForm)} className="space-y-8 text-left">
                                <FormField
                                    control={form.control}
                                    name="depart"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Ville de départ</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Choisissez une ville de départ"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {cities && cities.map((city, index) => (
                                                        <SelectItem key={index}
                                                                    value={city.id}>{city.cityName}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="arrivee"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Ville d'arrivée</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Choisissez une ville de départ"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {cities && cities.map((city, index) => (
                                                        <SelectItem key={index}
                                                                    value={city.id}>{city.cityName}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Date de départ</FormLabel>
                                            <FormControl>
                                                {renderDatePicker(field)}
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="distance"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Distance en kilomètre</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="text" placeholder="Distance en kilomètres"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <div className="w-full bg-bleuFonce flex justify-around items-center h-[50px]">
                                    <Button className={"text-white"} type="submit">Valider</Button>
                                    <Button className={"hover:bg-orange text-white"} type="button" onClick={() => {
                                        form.reset({
                                            depart: "",
                                            arrivee: "",
                                            date: "",
                                            distance: "",
                                        });
                                    }}>Effacer</Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </Page>
    )
}

export default AddTrip