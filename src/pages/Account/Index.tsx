import Page from "../../components/Page";
import {useEffect, useState} from "react";
import {accountService, useLogout} from "../../services/account.service.tsx";
import axios from "axios";
import {Card, CardContent, CardDescription, CardFooter, CardTitle} from "@/components/ui/card.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button} from "@/components/ui/button.tsx";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import Modal from "@/components/Modal/index.tsx";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";

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

interface Car {
    id: number;
    marque: string;
    modele: string;
    couleur: string;
    immatriculation: string;
    "nombre de places": number;
}

const formSchema = z.object({
    prenom: z.string().min(3, {
        message: "⬆ Un prénom possède au moins 3 charactères.",
    }),
    nom: z.string().min(3, {
        message: "⬆ Un nom possède au moins 3 charactères.",
    }),
    telephone: z.string().min(10, {
        message: "⬆ Un numéro de téléphone possède au moins 10 chiffres.",
    }),
    email: z.string().email({
        message: "⬆ Veuillez entrer un email valide.",
    }),
    ville: z.string().min(2, {
        message: "⬆ Une ville possède au moins 2 charactères.",
    }),
    cdp: z.string().min(5, {
        message: "⬆ Un code postal possède au moins 5 chiffres.",
    }),
})

function Account() {
    const [personData, setPersonData] = useState<Person | null>(null);
    const [carData, setCarData] = useState<Car | null>(null);
    const logout = useLogout();
    const [personId, setPersonId] = useState(0);
    const [isDataLoaded, setIsDataLoaded] = useState(false); // sert à vérifier si les données on été chargées
    const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);

    //------------------constante pour la création d'une voitures------------------
    const [isCarModalOpen, setIsCarModalOpen] = useState(false);
    const [brand, setBrand] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [numberOfSeats, setNumberOfSeats] = useState<number>(0);
    const [registrationNumber, setRegistrationNumber] = useState<string>('');

    /**
     * modal pour créer une voiture
     */
    const handleOpenCarModal = (() => {
        setIsCarModalOpen(true);
    });

    /**
     * Méthode pour créer une voiture
     */
    const handleCreateCar = () => {
        const token = accountService.isLogged() ? localStorage.getItem('token') : '';
        console.log(brand)
        axios({
            method: 'post',
            url: `http://localhost:8000/api/voiture/creerVoiture/${personId}/${brand}/${model}/${numberOfSeats}/${registrationNumber}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data);
                setCarData(response.data);
                alert("Votre voiture a bien été ajoutée");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    /**
     * modal pour supprimer la voiture
     */
    const [isCarModalDelete, setIsCarModalDelete] = useState(false);
    const handleOpenCarModalDelete = (() => {
        setIsCarModalDelete(true);
    });

    /**
     * Méthode pour supprimer une voiture
     * @param carId
     */
    const handleDeleteCar = (carId: number) => {
        const token = accountService.isLogged() ? localStorage.getItem('token') : '';
        axios({
            method: 'delete',
            url: `http://localhost:8000/api/car/deleteCar/${carId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data);
                alert("Votre voiture a bien été supprimée");
                // Mettre à jour l'état de la voiture ici si nécessaire
            })
            .catch((error) => {
                console.log(error);
            });
    };


    /**
     * modal pour modifier les informations de l'utilisateur
     */
    const [isPersonModalOpen, setIsPersonModalOpen] = useState(false);
    const handleOpenModal = (() => {
        setIsPersonModalOpen(true);
    });
    const handleClosePerson = (() => {
        setIsPersonModalOpen(false);
        setIsDataLoaded(false);
    });
    const handleCloseCar = (() => {
        if (isCarModalDelete) {
            setIsCarModalDelete(false);

        }
        if (isCarModalOpen) {
            setIsCarModalOpen(false);
        }
    });

    /**
     * On récupère les informations de l'utilisateur connecté (et ça voiture)
     */
    useEffect(() => {
        if (!isInitialDataLoaded) {
            const token = accountService.isLogged() ? localStorage.getItem('token') : '';
            axios({
                method: 'get',
                url: 'http://localhost:8000/api/person/info',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((response) => {
                    setPersonData(response.data);
                    setPersonId(response.data.id);
                    return axios({
                        method: 'get',
                        url: `http://localhost:8000/api/car/selectCar/${response.data.id}`,
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                })
                .then((response) => setCarData(response.data))
                .catch((error) => console.log(error))
            setIsInitialDataLoaded(true);
        }

        if (!isDataLoaded) {
            form.reset({
                prenom: personData?.prenom || "", // On utilise l'opérateur nullish pour éviter les erreurs si personData est null
                nom: personData?.nom || "",
                telephone: personData?.telephone || "",
                email: personData?.email || "",
                ville: personData?.ville || "",
                cdp: personData?.cdp || "",
            });
            setIsDataLoaded(true);
        }

    }, [personData, isDataLoaded, isInitialDataLoaded]);

    /**
     * On définis le schema de validation
     */
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prenom: personData?.prenom || "", // On utilise l'opérateur nullish pour éviter les erreurs si personData est null
            nom: personData?.nom || "",
            telephone: personData?.telephone || "",
            email: personData?.email || "",
            ville: personData?.ville || "",
            cdp: personData?.cdp || "",
        },
    });

    /**
     * On définit la fonction qui sera appelée lors de la soumission du formulaire
     */
    const handleSubmitProfilForm = async (data: z.infer<typeof formSchema>) => {
        const token = accountService.isLogged() ? localStorage.getItem('token') : '';
        console.log("Formulaire soumis avec succès ! Données :", data);
        axios.put('http://localhost:8000/api/person/update', {
            idPerson: personId,
            firstName: data.prenom,
            lastName: data.nom,
            mail: data.email,
            phone: data.telephone,
            cityName: data.ville,
            cityCdp: data.cdp
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data);
                setPersonData(res.data);
                alert("Vos informations ont bien été modifiées");
            })
            .catch(err => console.log("Error from server: ", err));
    };

    return (
        <Page>
            <div className="pt-3 rounded-none w-[80%] text-center">
                <div className="flex justify-center mb-4">
                    <h1>Mon Compte</h1>
                </div>
                <Card>
                    <CardContent className="flex justify-between pl-4 pr-4 border-b py-4">
                        <div className="flex justify-around">
                            {personData &&
                                <CardTitle className="border-r">
                                    <h2>{personData.login}</h2>
                                    <FontAwesomeIcon icon={faUser} size="4x" className="mt-3"/>
                                </CardTitle>
                            }
                            {personData && (
                                <CardDescription className="flex flex-col justify-between text-left pl-2">
                                    <p>nom : {personData.prenom}</p>
                                    <p>prenom : {personData.nom}</p>
                                    <p>email : {personData.email}</p>
                                    <p>téléphone : {personData.telephone}</p>
                                    <p>ville : {personData.ville}</p>
                                    <p>Code postal: {personData.cdp}</p>
                                </CardDescription>
                            )}
                        </div>
                        {carData && carData.marque && carData.modele && carData.immatriculation && carData["nombre de places"] ? (
                            <div className="border-l pl-2 text-left rounded hover:bg-bleuClair cursor-pointer"
                                 onClick={handleOpenCarModalDelete}>
                                <div className="text-center border-b">
                                    <h2>Mon véhicule</h2>
                                </div>
                                <div className="pt-2 flex flex-col justify-between md:h-[75%]">
                                    <p>Modèle de voiture : {carData.marque} {carData.modele}</p>
                                    <p>Immatriculation du véhicule : {carData.immatriculation}</p>
                                    <p>Nombre de place maximum : <span>{carData["nombre de places"]}</span></p>
                                </div>
                            </div>
                        ) : (
                            <div className="border-l flex items-center justify-center p-2">
                                <Button className="text-white" onClick={handleOpenCarModal}>Ajouter une
                                    voiture</Button>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex-col">
                        <div className="flex justify-center mt-2">
                            <Button className="text-white m-1" onClick={handleOpenModal}>Modifier</Button>
                            <Button className="text-white m-1 hover:bg-orange" onClick={(logout)}>Se
                                déconnecter</Button>
                        </div>
                    </CardFooter>
                </Card>

                {/*Modal pour modifier les informations de l'utilisateur*/}
                <Modal isOpen={isPersonModalOpen} handleClose={handleClosePerson}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmitProfilForm)} className="space-y-8 text-left">
                            <h2 className="text-center text-white">Modifier vos informations</h2>
                            <FormField
                                control={form.control}
                                name="prenom"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Nom</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" placeholder="Nom"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="nom"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Prénom</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" placeholder="Prénom"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="telephone"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Téléphone</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" placeholder="Téléphone"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" placeholder="Email"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="ville"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Ville</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" placeholder="Ville"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cdp"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Code Postal</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" placeholder="Code postal"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className="w-full bg-bleuFonce flex justify-around items-center h-[50px]">
                                <Button className={"text-white"} type="submit">Valider</Button>
                                <Button className={"hover:bg-orange text-white"} type="button" onClick={() => {
                                    form.reset({
                                        prenom: "",
                                        nom: "",
                                        telephone: "",
                                        email: "",
                                        ville: "",
                                        cdp: "",
                                    });
                                    setIsDataLoaded(true);
                                }}>Effacer</Button>
                            </div>
                        </form>
                    </Form>
                </Modal>

                {/*Modal pour ajouter une voiture*/}
                <Modal isOpen={isCarModalOpen} handleClose={handleCloseCar}>
                    <h2 className="text-center text-white">Ajouter votre véhicule</h2>
                    <form className={"text-left text-white"}>
                        <label>
                            Marque de voiture
                            <Input type={"text"} value={brand} onChange={(e) => setBrand(e.target.value)}/>
                        </label>
                        <label>
                            Modèle de voiture
                            <Input type={"text"} value={model} onChange={(e) => setModel(e.target.value)}/>
                        </label>
                        <label>
                            Nombre de places
                            <Input type={"number"} value={numberOfSeats}
                                   onChange={(e) => setNumberOfSeats(Number(e.target.value))}/>
                        </label>
                        <label>
                            immatriculation
                            <Input type={"text"} value={registrationNumber}
                                   onChange={(e) => setRegistrationNumber(e.target.value)}/>
                        </label>
                    </form>
                    <div className="flex justify-center">
                        <Button className="text-white m-1 hover:bg-orange" onClick={handleCreateCar}>Valider</Button>
                    </div>
                </Modal>

                {/*Modal pour supprimer la voiture*/}
                <Modal isOpen={isCarModalDelete} handleClose={handleCloseCar} className={"bg-red-200"}>
                    <h2 className="text-center text-white">Supprimer votre véhicule</h2>
                    <div className="flex justify-center">
                        <Button className="text-white m-1 hover:bg-red-500"
                                onClick={() => handleDeleteCar(carData.id)}>Valider</Button>
                    </div>
                </Modal>

            </div>
        </Page>
    )
}

export default Account