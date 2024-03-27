import {Link, useLocation} from 'react-router-dom'
import {
    NavigationMenu,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList
} from "@/components/ui/navigation-menu.tsx";
import {navigationMenuTriggerStyle} from "@/components/ui/navigation-menu.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faPlus, faRoad, faSearch, faUser} from "@fortawesome/free-solid-svg-icons";
import {accountService} from "@/services/account.service.tsx";

function Header() {
    const location = useLocation();

    if(location.pathname === "/login" || !accountService.isLogged()) {
        return null;
    }

    return (
        <NavigationMenu className="shadow-md shadow-dark">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link to="/allTrips">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <FontAwesomeIcon icon={faList}  />Liste des Trajets
                        </NavigationMenuLink>
                    </Link>
                    <Link to="/searchTrips">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <FontAwesomeIcon icon={faSearch} /> Rechercher un Trajet
                        </NavigationMenuLink>
                    </Link>
                    <Link to="/yourTrips">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <FontAwesomeIcon icon={faRoad} />Vos Trajets
                        </NavigationMenuLink>
                    </Link>
                    <Link to="/addTrip">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <FontAwesomeIcon icon={faPlus} /> Publier un Trajet
                        </NavigationMenuLink>
                    </Link>
                    <Link to="/account">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            <FontAwesomeIcon icon={faUser} /> Mon compte
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default Header