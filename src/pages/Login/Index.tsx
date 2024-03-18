import Login from "../../components/Form/loginForm.tsx";
import Page from "../../components/Page";
import {Card} from "@/components/ui/card";


function LoginPage() {
    return (
        <Page>
            <Card>

            </Card>
            {/*<Card className="w-[350px]">*/}
            {/*    <CardHeader>*/}
            {/*        <CardTitle>Connexion</CardTitle>*/}
            {/*    </CardHeader>*/}
            {/*    <CardContent>*/}
                    <Login/>
            {/*    </CardContent>*/}
            {/*</Card>*/}
        </Page>
    )
}

export default LoginPage