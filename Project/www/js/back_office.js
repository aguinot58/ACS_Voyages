let tabpage = [["./vol_solPalmanova_test.html", "vol solPalmanova"]];

let nb_contenu_gener = 0;
let nb_contenu_serv = 0;
let nb_photo_gener = 0;

function delete_image(e) {
    e.target.previousSibling.remove();
    e.target.remove();
}

function delete_contenu(e) {
    let contenu_del = e.target.id.split("_");
    document.getElementById("title_contenu_"+contenu_del[2]+"_"+contenu_del[3]).remove();
}

function form_delete_click_img() {
    let deleteImg = document.querySelectorAll('.delete_image');
    deleteImg.forEach(function(item) {
        item.addEventListener('click', delete_image);
    });
}

function form_delete_click_contenu() {
    let deleteContenu = document.querySelectorAll('.delete_contenu');
    deleteContenu.forEach(function(item) {
        item.addEventListener('click', delete_contenu);
    });
}

function form_down_up_contenu_click() {
    let down_up = document.querySelectorAll('.afficher_masquer_contenu');
    down_up.forEach(function(item) {
        item.addEventListener('click', down_up_contenu);
    });
}

function down_up_contenu(e) {//img_down
    let down_up = e.target.id.split("_");
    if(e.target.classList.contains("img_down")) {
        document.getElementById(e.target.id).outerHTML = '<img id="afficher_masquer_'+down_up[2]+"_"+down_up[3]+'" class="afficher_masquer_contenu img_up" alt="afficher le contenu" title="suprimer le voyage" src="./../img/bullet_arrow_down.svg" />';
        document.getElementById(e.target.id).style.transform = "rotate(180deg)";
    } else if(e.target.classList.contains("img_up")) {
        document.getElementById(e.target.id).outerHTML = '<img id="afficher_masquer_'+down_up[2]+"_"+down_up[3]+'" class="afficher_masquer_contenu img_down" alt="afficher le contenu" title="suprimer le voyage" src="./../img/bullet_arrow_down.svg" />';
        document.getElementById(e.target.id).style.transform = "rotate(0deg)";
    }
    form_down_up_contenu_click();
}

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
    let nm_contenu = nb_contenu_gener;
    if(id == "services") {
        nm_contenu = nb_contenu_serv;
    }
    document.getElementById(id).innerHTML += '<figure id="title_contenu_'+id+'_'+nm_contenu+'" class="title_contenu">'+
    '<img id="delete_contenu_'+id+'_'+nm_contenu+'" class="delete_contenu" alt="suprimer le contenu" title="suprimer le contenu" src="./../img/icons8-supprimer-pour-toujours-90.svg" />'+
    '<label>Titre</label>'+
    '<input type="text" value="'+title+'" />'+
    '<img id="afficher_masquer_'+id+'_'+nm_contenu+'" class="afficher_masquer_contenu img_down" alt="afficher le contenu" title="suprimer le voyage" src="./../img/bullet_arrow_down.svg" />'+
    '<label id="label_contenu_120" class="label_contenu contenu_clos">Contenu</label><textarea id="text_contenu_120" class="text_contenu contenu_clos" rows="10">'+contenu+'</textarea>'+
    '</figure>'; 
    form_delete_click_contenu();
    form_down_up_contenu_click();
    if(nm_contenu == 0) {
        document.getElementById('afficher_masquer_'+id+'_'+nm_contenu).click();
    }
}

function resetPage() {
    nb_contenu_gener = 0;
    nb_contenu_serv = 0;
    nb_photo_gener = 0;
    document.getElementById("titre-page").innerHTML = "";
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
        document.getElementById("add_img").innerHTML += "<img class=\"delete_image\" id=\"delete_img_"+nb_photo_gener+"\" alt=\"suprimer le voyage\" title=\"suprimer le voyage\" src=\"./../img/icons8-supprimer-pour-toujours-90.svg\" />";
        nb_photo_gener++;
    });
    form_delete_click_img();
}

function recup_title(doc) {
    let h1_list = doc.querySelectorAll("h1");
    h1_list.forEach(element => {
        document.getElementById("titre-page").value = element.innerHTML;
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
                nb_contenu_gener++;
            }
            name = element.innerHTML.reduceWhiteSpace().trim();
        } else if(element.classList.contains('contenu')) {
            value = element.innerHTML.reduceWhiteSpace().trim();
        } else if(element.classList.contains('contenu-add')) {
            value += "\n"+element.innerHTML.reduceWhiteSpace().trim();
            
        }
    });
    if(value != "") {
        add_title_contenu("general", name, value);
        nb_contenu_gener++;
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
                    value = element1.innerHTML.reduceWhiteSpace().trim();
                    add_title_contenu("services", name, value);
                    nb_contenu_serv++;
                    value = "";
                });
            } else if(element.classList.contains('contenu-section-services')) {
                let services = element.querySelectorAll("p");
                services.forEach(element1 => {
                    name = "contenu";
                    value += "\n"+element1.innerHTML.reduceWhiteSpace().trim();
                });
            }
        });
        add_title_contenu("services", name, value);
        nb_contenu_serv++;
    });
    
}

function loadHTMLPage(e) {
    let value_tab = Number.parseInt(e.target.id.split("_")[1]);
    loadHTML(tabpage[value_tab][0]);
}

function loadHtmlDoc(doc) {
    resetPage();
    recup_title(doc);
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
      img.classList.add("img-slide-presentation");
      img.file = file;
      preview.appendChild(img); // En admettant que "preview" est l'élément div qui contiendra le contenu affiché.

      var imgDelete = document.createElement("img");
      imgDelete.classList.add("delete_image");
      imgDelete.src = "./../img/icons8-supprimer-pour-toujours-90.svg";
      imgDelete.setAttribute("alt","suprimer le voyage");
      imgDelete.id = "delete_img_"+nb_photo_gener;
      preview.appendChild(imgDelete);

      nb_photo_gener++;

      var reader = new FileReader();
      reader.onload = (function(aImg) {
          return function(e) { 
              aImg.src = e.target.result;
            };
        })(img);
      reader.readAsDataURL(file);
    }
    form_delete_click_img();
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
    nb_contenu_gener++;
}

function add_service_contenu() {
    add_title_contenu("services", "", "");
    nb_contenu_serv++;
}

createTabPage();
document.getElementById('fileToUpload').addEventListener('change', loadFiles);
document.getElementById('img-add').addEventListener('click', img_add);
document.getElementById('add-gener-contenu').addEventListener('click', add_gener_contenu);
document.getElementById('add-service-contenu').addEventListener('click', add_service_contenu);
document.getElementById('add-service-contenu').addEventListener('click', add_service_contenu);

let itemsAnnuler = document.querySelectorAll('.annuler');
itemsAnnuler.forEach(function(item) {
    item.addEventListener('click', resetPage);
});

let items = document.querySelectorAll('.modif_row');
items.forEach(function(item) {
    item.addEventListener('click', loadHTMLPage);
});