/* lecture de la page exterieur 
page (string) : le lien de la page a lire
*/
function loadHTML(page){
    fetch(page)
    .then(function(response) {
        /* Recupere le texte de la page html exterieur a partir du lien "page" */
        return response.text()
    })
    .then(function(html) {
        /* creation d'un DOM de la page exterieur */
        var parser = new DOMParser();

        /* lecture du dom de cette page sous format "texte html" */
        loadHtmlDoc(parser.parseFromString(html, "text/html"));
    })
    .catch(function(err) {
        /* en cas d'erreur dans la lecture de la page ou du DOM */
        console.log('Failed to fetch page: ', err);  
    });
}