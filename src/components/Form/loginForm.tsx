import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import axios from "axios";
import {accountService} from "@/services/account.service.tsx";
import {useNavigate} from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Button} from "@/components/ui/button.tsx";

interface ProfileProps {
    login: string;
    password: string;
}

// On définis le schema de validation
const formSchema = z.object({
    login: z.string().min(2, {
        message: "⬆ Un login possède au moins 2 charactères.",
    }),
    password: z.string().min(4, {
        message: "⬆ Un mot de passe possède au moins 4 charactères.",
    }),
})

function ProfileForm() {
    const navigate = useNavigate();

    // 1. On utilise useForm pour gérer le formulaire
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            login: "",
            password: "",
        },
    });

    // 2. On définit la fonction qui sera appelée lors de la soumission du formulaire
    const handleSubmitLoginForm = async (data: ProfileProps) => {
        console.log("Formulaire soumis avec succès ! Données :", data);
        axios.post('http://localhost:8000/api/login_check', {username: data.login, password: data.password})
            .then(res => {
                console.log(res.data);
                accountService.saveToken(res.data.token);
                navigate('/allTrips');
            })
            .catch(err => console.log("Error from server: ", err));
    };

    return(
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmitLoginForm)} className="space-y-8">
                    <Card className="w-[500px] h-auto">
                        <CardHeader>
                            <CardTitle>Authentification</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name= "login"
                                render={ ({ field }) => (
                                    <FormItem>
                                        <FormLabel>Login</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="login" placeholder="login"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" placeholder="password"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit">Connexion</Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        );
}
export default ProfileForm;