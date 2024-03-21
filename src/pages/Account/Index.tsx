import Page from "../../components/Page";
import {useEffect, useState} from "react";
import {accountService, useLogout} from "../../services/account.service.tsx";
import axios from "axios";
import {Card, CardContent, CardDescription, CardFooter, CardTitle} from "@/components/ui/card.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button} from "@/components/ui/button.tsx";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import Modal from "@/components/Modal/index.tsx";

interface Person {
    id: number;
    login: string;
    prenom: string;
    nom: string;
    telephone: string;
    email: string;
    adresse: string;
    ville: string;
}

interface Car {
    id: number;
    marque: string;
    modele: string;
    couleur: string;
    immatriculation: string;
    "nombre de places": number;
}

function Account() {
    const [personData, setPersonData] = useState<Person | null>(null);
    const [carData, setCarData] = useState<Car | null>(null);
    const logout = useLogout();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleClose = (() => {setIsModalOpen(false);});

    useEffect(() => {
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
    }, [])


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
                                </CardDescription>
                            )}
                        </div>
                        {carData && (
                        <div className="border-l  pl-2 flex flex-col justify-between text-left">
                            <p>Modèle de voiture :  {carData.marque} {carData.modele}</p>
                            <p>Immatriculation du véhicule : {carData.immatriculation}</p>
                            <p>Nombre de place{carData["nombre de places"]}</p>
                        </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex-col">
                        <div className="flex justify-center mt-2">
                            <Button className="text-white m-1" onClick={() => setIsModalOpen(true)}>Modifier</Button>
                            <Button className="text-white m-1" onClick={(logout)}>Se déconnecter</Button>
                        </div>
                    </CardFooter>
                </Card>

                <Modal
                    isOpen={isModalOpen}
                    handleClose={handleClose}>
                    {/* Le contenu de la modale */}
                    <header>
                        <h1>Hello world</h1>
                        <small>pour être original...</small>
                    </header>
                </Modal>
            </div>
        </Page>
    )
}

export default Account