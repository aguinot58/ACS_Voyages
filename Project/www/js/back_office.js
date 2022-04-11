let tabpage = [["./vol_solPalmanova_test.html", "vol solPalmanova"]];

function addRowVoyage(pos, elmt, lien, title){
    var tr = document.createElement('tr');
    elmt.appendChild(tr);
    var td = document.createElement('td');
    td.classList.add("delete");
    td.innerHTML = "<a href=\"#\"><img class=\"delete_row\" id=\"delete_"+pos+"\" src=\"./../img/icons8-supprimer-pour-toujours-90.svg\" /></a>";
    tr.appendChild(td);
    var td1 = document.createElement('td');
    td1.classList.add("edit");
    td1.innerHTML = "<a href=\"#\"><img class=\"modif_row\" id=\"modif_"+pos+"\" src=\"./../img/icons8-modifier.svg\" /></a>";
    tr.appendChild(td1);
    var td2 = document.createElement('td');
    var tdText2 = document.createTextNode(title);
    td2.appendChild(tdText2);
    tr.appendChild(td2);
}

function add_title_contenu(id, title, contenu) {
    document.getElementById(id).innerHTML += '<figure class="title_contenu"><label>Titre</label><input type="text" value="'+title+'" /><label>Contenu</label><textarea rows="10">'+contenu+'</textarea></figure>'; 
}

function resetPage() {
    document.getElementById("add_img").innerHTML = "";
    document.getElementById("general").innerHTML = '';
    document.getElementById("services").innerHTML = '';
}

String.prototype.killWhiteSpace = function() {
    return this.replace(/\s/g, '');
};

String.prototype.reduceWhiteSpace = function() {
    return this.replace(/\s+/g, ' ');
};

function loadImgGener(doc) {
    let list_photo = doc.getElementById("photos-presentation").querySelectorAll("img");
    //all_img
    list_photo.forEach(element => {
        document.getElementById("add_img").innerHTML += element.outerHTML;
    });
}

function loadInfoGener(doc) {
    let info_gener = doc.getElementById("info-gener-grand").querySelectorAll("p");
    let name = "";
    let value = "";
    info_gener.forEach(element => {
        if(element.classList.contains('titre-paragraphe')) {
            if(value != "") {
                add_title_contenu("general", name, value);
            }
            name = element.innerHTML.reduceWhiteSpace();
        } else if(element.classList.contains('contenu')) {
            value = element.innerHTML.reduceWhiteSpace();
        } else if(element.classList.contains('contenu-add')) {
            value += "\n"+element.innerHTML.reduceWhiteSpace();
            
        }
    });
    if(value != "") {
        add_title_contenu("general", name, value);
    }
}

function services(doc) {
    let conteneur_service = doc.querySelectorAll(".conteneur-service");

    conteneur_service.forEach(element0 => {
        let list_services = element0.querySelectorAll("article");
        let name = "";
        let value = "";
        list_services.forEach(element => {
            if(element.classList.contains('titre-section-service')) {
                let services = element.querySelectorAll("p");
                services.forEach(element1 => {
                    name = "titre";
                    value = element1.innerHTML.reduceWhiteSpace();
                    document.getElementById("services").innerHTML += '<label>'+name+'</label><input type="text" value="'+value+'" />';
                    value = "";
                });
            } else if(element.classList.contains('contenu-section-services')) {
                let services = element.querySelectorAll("p");
                services.forEach(element1 => {
                    name = "contenu";
                    value += "\n"+element1.innerHTML.reduceWhiteSpace();
                });
            }
        });
        document.getElementById("services").innerHTML += '<label>'+name+'</label><textarea rows="10">'+value+'</textarea>';
    });
    
}

function loadHTMLPage(e) {
    let value_tab = Number.parseInt(e.target.id.split("_")[1]);
    loadHTML(tabpage[value_tab][0]);
}

function loadHtmlDoc(doc) {
    resetPage();
    loadImgGener(doc);
    loadInfoGener(doc);
    services(doc);
}

function loadFiles(event) {
    let files = event.target.files;
    let preview = document.getElementById("add_img");
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var imageType = /^image\//;
  
      if (!imageType.test(file.type)) {
        continue;
      }
  
      var img = document.createElement("img");
      img.classList.add("obj");
      img.file = file;
      preview.appendChild(img); // En admettant que "preview" est l'élément div qui contiendra le contenu affiché.
  
      var reader = new FileReader();
      reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
      reader.readAsDataURL(file);
    }
}

function img_add() {
    document.getElementById('fileToUpload').click();
}

function createTabPage() {
    let i = 0;

    tabpage.forEach(element => {
        let elmt = document.getElementById("tab_find");
        addRowVoyage(i, elmt, element[0], element[1]);
        i++;
    });
}

function add_gener_contenu() {
    add_title_contenu("general", "", "");
}

createTabPage();
document.getElementById('fileToUpload').addEventListener('change', loadFiles);
document.getElementById('img-add').addEventListener('click', img_add);
document.getElementById('add-gener-contenu').addEventListener('click', add_gener_contenu);

let itemsAnnuler = document.querySelectorAll('.annuler');
itemsAnnuler.forEach(function(item) {
    item.addEventListener('click', resetPage);
});

let items = document.querySelectorAll('.modif_row');
items.forEach(function(item) {
    item.addEventListener('click', loadHTMLPage);
});