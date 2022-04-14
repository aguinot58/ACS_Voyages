let valueTabbledFind = 0;

function tab_selected() {
    let items = document.getElementsByName('group1');
    items.forEach(function(item) {
        if(Number.parseInt(item.value) == valueTabbledFind) {
            item.checked = true;
            if(valueTabbledFind == 1) {
                document.getElementById("choix_information").innerText = document.getElementById("onglet_label_1").innerText;
            } else if(valueTabbledFind == 2) {
                document.getElementById("choix_information").innerText = document.getElementById("onglet_label_2").innerText;
            } else if(valueTabbledFind == 3) {
                document.getElementById("choix_information").innerText = document.getElementById("onglet_label_3").innerText;
            } else {
                document.getElementById("tab0").checked = true;
                document.getElementById("choix_information").innerText = document.getElementById("onglet_label_0").innerText;
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
    if(valueTabbledFind > 3) {
        valueTabbledFind = 0;
    }
    tab_selected();
}

function tab_previous() {
    valueTabbledFind--;
    if(valueTabbledFind < 0) {
        valueTabbledFind = 3;
    }
    tab_selected();
}

let groupTab = document.getElementsByName('group1');
groupTab.forEach(function(item) {
    item.addEventListener('change', tab_select);
});
document.getElementById('tab_next').addEventListener('click', tab_next);
document.getElementById('tab_previous').addEventListener('click', tab_previous);