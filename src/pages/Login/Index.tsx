import Page from "../../components/Page";
import ProfileForm from "@/components/Form/loginForm.tsx"
import {Button} from "@/components/ui/button.tsx";
import LoginForm from "@/components/Form/loginForm.tsx";
import RegisterForm from "@/components/Form/registerForm.tsx";
import {useState} from "react";

function LoginPage() {
    const [isRegister, setIsRegister] = useState(false);

    return (
        <Page className="justify-center">
            {isRegister ? <RegisterForm/> : <LoginForm/>}
            <Button className={"mt-2"} onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? "Déjà un compte ? Connectez-vous" : "Pas encore de compte ? Inscrivez-vous"}
            </Button>
        </Page>

    )
}

export default LoginPage