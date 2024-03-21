import Page from "@/components/Page";

function Error() {
    return (
        <Page>
            <div className="pt-3 rounded-none w-[80%] h-[100%] cursor-pointer text-center flex items-center justify-center">
                <h1 className="text-4xl">Oups 🙈 <br/>
                Cette page n'existe pas</h1>
            </div>
        </Page>
    )
}

export default Error