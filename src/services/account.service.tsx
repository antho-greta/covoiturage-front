// Fichier pour les services de gestion de compte
// On peut transéferer facilement le token d'un composant à un autre
// On peut aussi vérifier si l'utilisateur est connecté

const saveToken = (token: string) => {
    localStorage.setItem('token', token);
}

const logout = () => {
    localStorage.removeItem('token');
}

const isLogged = () => {
    const token = localStorage.getItem('token');
    console.log('Token: ', token);
    const logged = !!token;
    console.log('Is logged: ', logged);
    return logged;
}

export const accountService = {
    saveToken, logout, isLogged
};