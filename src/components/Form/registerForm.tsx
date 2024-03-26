import {accountService} from "@/services/account.service.tsx";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import LoginFormFirst from "@/components/Form/loginFormFirst.tsx";

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

function registerForm() {
    const [isSetUp, setIsSetUp] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            login: "",
            password: "",
        },
    });
    const handleSubmitRegisterForm = (data: ProfileProps) => {
        const login = data.login;
        const password = data.password;

        axios.post('http://localhost:8000/register/create', {
            login: login,
            password: password
        })
            .then(res => {
                console.log(res.data);
                if(res.data.id){
                    const idRegister = res.data.id;
                    console.log("idRegister: ", idRegister);
                    accountService.saveIdRegister(idRegister);
                }else{
                    console.log("l'id du register n'est pas défini");
                }
                accountService.saveToken(res.data.token);
                setIsSetUp(true);
            })
            .catch(err => console.log("Erreur du serveur : ", err));
    }

    return isSetUp ? <LoginFormFirst /> :(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitRegisterForm)} className="space-y-8">
                <Card className="w-[700px] h-auto justify-center items-center flex flex-col">
                    <CardHeader className="w-full">
                        <CardTitle>Créer vos identifiants</CardTitle>
                    </CardHeader>
                    <CardContent className="w-[600px] justify-center items-center flex flex-col">
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
                                <FormItem className="mt-8">
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
                        <Button type="submit" className="mt-4">Créer le compte</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}

export default registerForm;