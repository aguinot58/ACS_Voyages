/**
 * Pour lire un fichier exterieur html
 */
class LoadHTML {
    /**
     * Le constructeur de la classe
     * url (string) : lien de la page html
     */
    constructor(url) {
        this.url = url;
    }

    /**
     * recupere le fichier sous format de texte (code source).
     * 
     * pour le code :
     * let load_Html = new LoadHTML(page);
     * load_Html.load().then(function(html) { $["le travail a effectuer"] }
     * 
     * @returns (Promise) : sous format texte
     */
    load() {
        return fetch(this.url)
        .then(response => response.text())
        .catch(error => console.log('Failed to fetch page: ', error.message));
    }

    /**
     * recupere le fichier sous format DOM pouvent etre utiliser dans javascript.
     * 
     * pour le code :
     * let load_Html = new LoadHTML(page);
     * load_Html.loadDOM().then(function(html) { $["le travail a effectuer"] }
     * 
     * @returns (Promise) : sous format DOM
     */
    loadDOM() {
        return this.load().then(response => (new DOMParser()).parseFromString(response, "text/html"))
    }
}
