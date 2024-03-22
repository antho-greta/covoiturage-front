import Page from "@/components/Page";
import {Link} from "react-router-dom";
import {accountService} from "@/services/account.service.tsx";
import {Button} from "@/components/ui/button.tsx";

function Error() {

    return (
        <Page>
            <div
                className="pt-3 rounded-none w-[80%] h-[100%] cursor-pointer text-center flex items-center justify-center flex flex-col">
                <h1 className="text-4xl">Oups 🙈 <br/>
                    Cette page n'existe pas</h1>
                {!accountService.isLogged() && (
                    <div className="mt-4">
                        <Link to="/login">
                            <Button className="btn btn-primary">Se connecter</Button>
                        </Link>
                    </div>
                )}
            </div>

        </Page>
    )
}

export default Error