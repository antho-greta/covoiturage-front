import Page from "../../components/Page";
import {useEffect, useState} from "react";
import {accountService} from "@/services/account.service.tsx";
import axios from "axios";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Card} from "@/components/ui/card.tsx";

function SearchTrips(){
    const [carBrands, setCarBrands] = useState<string[]>([]);
    /**
     * On récupère les marques de voitures
     */
    useEffect(() => {
        const token = accountService.isLogged() ? localStorage.getItem('token') : '';
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/car/brand/listCarBrand',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setCarBrands(response.data);
                } else {
                    console.log("Error from server: ", response.data);
                }
            })
            .catch((error) => console.log(error));
    }, []);


    return (
        <Page>
            <h1>Rechercher un Trajets</h1>
            <Card>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder={"choisissez une voiture"}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Marque de voiture</SelectLabel>
                            {carBrands.filter(brand => typeof brand === 'object').map((brand: any) => (
                                <SelectItem key={brand.idCarBrand} value={brand.carBrandName}>
                                    {brand.carBrandName}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Card>


        </Page>
    )
}
export default SearchTrips