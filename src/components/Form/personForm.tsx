import {accountService} from "@/services/account.service.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useState} from "react";
import axios from "axios";
import {Card, CardTitle} from "@/components/ui/card.tsx";
import {
    useNavigate,
} from "react-router-dom";
import Page from "@/components/Page";

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

function personForm() {
    const [person, setPerson] = useState<Person | null>(null);
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prenom: "",
            nom: "",
            telephone: "",
            email: "",
            ville: "",
            cdp: "",
        },
    })

    const handleSubmitFormPerson = async (data: z.infer<typeof formSchema>) => {
        const token = accountService.isLogged() ? localStorage.getItem('token') : '';
        const idRegister = localStorage.getItem('idRegister');

        console.log("idRegister envoyé à l'API :", idRegister);

        axios.post('http://localhost:8000/api/personne/create', {
            idRegister: idRegister,
            firstName: data.prenom,
            lastName: data.nom,
            phone: data.telephone,
            mail: data.email,
            cityName: data.ville,
            cityCdp: data.cdp
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log("Réponse de l'API : ", res);
            navigate('/');
            alert("Votre profil a bien été créé !");
        }).catch(err => console.log("Erreur du serveur : ", err));
    }

    return (
        <Page>
            <Card>
                <CardTitle>Saisissez vos informations de profil</CardTitle>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmitFormPerson)} className="space-y-8 text-left">
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
                        <div
                            className="w-full bg-bleuFonce flex justify-around items-center h-[50px]"
                        >
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
                            }}>Effacer</Button>
                        </div>
                    </form>
                </Form>
            </Card>
        </Page>
    )
}

export default personForm;