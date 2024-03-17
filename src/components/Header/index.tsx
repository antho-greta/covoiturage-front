import {Link} from 'react-router-dom'
import styled from 'styled-components'
import colors from "../../utils/style/color.tsx";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList
} from "@radix-ui/react-navigation-menu";


interface StyledLinkProps {
    className?: string,
    $isFullLink?: boolean
}

const StyledLink = styled(Link)<StyledLinkProps>`
    padding: 15px;
    color: #8186a0;
    text-decoration: none;
    font-size: 18px;
    list-style-type: none;

    &:hover {
        background-color: ${colors.secondary};
        color: white;
    }
`

const CenteredNavigationMenuList = styled(NavigationMenuList)`
    display: flex;
    justify-content: center;
    list-style-type: none;
`

function Header() {
    return (
        <NavigationMenu>
            <CenteredNavigationMenuList>
                <NavigationMenuItem>
                    <StyledLink to="/">Liste des Trajets</StyledLink>
                    <StyledLink to="/searchTrips">Rechercher un Trajet</StyledLink>
                    <StyledLink to="/yourTrips">Vos Trajets</StyledLink>
                    <StyledLink to="/addTrip">Publier un Trajet</StyledLink>
                    <StyledLink to="/account">Mon compte</StyledLink>
                </NavigationMenuItem>
            </CenteredNavigationMenuList>
        </NavigationMenu>
    )
}

export default Header