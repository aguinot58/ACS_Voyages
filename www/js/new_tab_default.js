/*
Ajouter des valeurs de la nouvelle table au tableau des voyages
json (JSON) : tableau sous format json.
 */
function new_tab(json) {
    let i = tabpage.length;
    let elmt = document.getElementById("tab_find");
    json.forEach(element => {
        addRowVoyage(i, elmt, element[0], element[1], element[2]);
        i++;
    });
    modif_row_click();
}

/*
Pour lire le nouveau tableau
*/
let loadJsonTab = new LoadJson();
loadJsonTab.getData('../data_tmp/data.json').then(function(json) {
    if(json != undefined) {
        new_tab(json);
    }
});