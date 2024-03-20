import Login from "../../components/Form/loginForm.tsx";
import Page from "../../components/Page";

function LoginPage() {
    return (
        <Page>
            <h1 className="text-6xl font-bold underline bg-amber-50">
                Hello world!
            </h1>

            <Login/>
        </Page>


    )
}

export default LoginPage