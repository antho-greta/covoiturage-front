// Fichier pour les services de gestion de compte
// On peut transéferer facilement le token d'un composant à un autre
// On peut aussi vérifier si l'utilisateur est connecté
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/*
 * Fonction pour déconnecter l'utilisateur
 */
export const useLogout = () => {
    const navigate = useNavigate();

    return useCallback(() => {
        localStorage.removeItem('token');
        navigate('/login');
    }, [navigate]);
}

/*
 * Fonction pour sauvegarder le token
*/
const saveToken = (token: string) => {
    localStorage.setItem('token', token);
}

/*
 * Fonction pour vérifier si l'utilisateur est connecté
 */
const isLogged = () => {
    const token = localStorage.getItem('token');
    console.log('Token: ', token);
    const logged = !!token;
    console.log('Is logged: ', logged);
    return logged;
}

/*
 * Export des fonctions
*/
export const accountService = {
    saveToken, isLogged
};