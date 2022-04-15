let valueTabbledFind = 0;

function tab_selected() {
    let items = document.getElementsByName('group1');
    items.forEach(function(item) {
        if(Number.parseInt(item.value) == valueTabbledFind) {
            item.checked = true;
            if(valueTabbledFind == 1) {
                document.getElementById("choix_recherche").innerText = "Train+hôtel";
                document.getElementById("buttom_find").href = "./pages/train.html";

            } else if(valueTabbledFind == 2) {
                document.getElementById("choix_recherche").innerText = "Croisière";
                document.getElementById("buttom_find").href = "./pages/croisiere.html";
            } else {
                document.getElementById("choix_recherche").checked = true;
                document.getElementById("choix_recherche").innerText = "Vol+hôtel";
                document.getElementById("buttom_find").href = "./pages/vol.html";
            }
        }
    });
}

function tab_select(e) {
    valueTabbledFind = Number.parseInt(e.target.value);
    tab_selected();
}

function tab_next() {
    valueTabbledFind++;
    if(valueTabbledFind > 2) {
        valueTabbledFind = 0;
    }
    tab_selected();
}

function tab_previous() {
    valueTabbledFind--;
    if(valueTabbledFind < 0) {
        valueTabbledFind = 2;
    }
    tab_selected();
}

let items = document.getElementsByName('group1');
items.forEach(function(item) {
    item.addEventListener('change', tab_select);
});
document.getElementById('tab_next').addEventListener('click', tab_next);
document.getElementById('tab_previous').addEventListener('click', tab_previous);
