/* start drag drop pour le contenue */
var dragSrcEl = null;
    
    function handleDragStart(e) {
      this.style.opacity = '0.4';
      
      dragSrcEl = this;
  
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
    }
  
    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
  
      e.dataTransfer.dropEffect = 'move';
      
      return false;
    }
  
    function handleDragEnter(e) {
      this.classList.add('over');
    }
  
    function handleDragLeave(e) {
      this.classList.remove('over');
    }
  
    function handleDrop(e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      if (dragSrcEl != this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
      }

      form_down_up_contenu_click();
      
      return false;
    }
  
    function handleDragEnd(e) {
      this.style.opacity = '1';
      
      let items = document.querySelectorAll('.drag_contenu');
      items.forEach(function (item) {
        item.classList.remove('over');
      });
    }
/* end drag drop pour le contenue */

/* start drag drop pour l'image' */
var dragSrcElImg = null;
    
    function handleDragImgStart(e) {
      this.style.opacity = '0.4';
      
      dragSrcElImg = e.target;
  
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text', e.target.id);
    }
  
    function handleDragImgOver(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
  
      e.dataTransfer.dropEffect = 'move';
      
      return false;
    }
  
    function handleDragImgEnter(e) {
      this.classList.add('over');
    }
  
    function handleDragImgLeave(e) {
      this.classList.remove('over');
    }
  
    function handleDropImg(e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      if (dragSrcElImg != this) {
        let src = document.getElementById(e.dataTransfer.getData('text')).src;
        let file = document.getElementById(e.dataTransfer.getData('text')).file;
        dragSrcElImg.src = e.target.src;
        dragSrcElImg.file = e.target.file;
        e.target.src = src;
        e.target.file = file;
      }
      
      return false;
    }
  
    function handleDragImgEnd(e) {
      this.style.opacity = '1';
      
      let items = document.querySelectorAll('.drag_contenu');
      items.forEach(function (item) {
        item.classList.remove('over');
      });
    }
/* end drag drop pour l'image */

/* activation du drag drop pour le contenus */
function allDragDropContenu() {
    let items = document.querySelectorAll('.drop_contenu .drag_contenu');
    items.forEach(function(item) {
      item.addEventListener('dragstart', handleDragStart, false);
      item.addEventListener('dragenter', handleDragEnter, false);
      item.addEventListener('dragover', handleDragOver, false);
      item.addEventListener('dragleave', handleDragLeave, false);
      item.addEventListener('drop', handleDrop, false);
      item.addEventListener('dragend', handleDragEnd, false);
    });
}

/* activation du drag drop pour les images */
function allDragDropImg() {
    let items = document.querySelectorAll('.drop_img .drag_img');
    items.forEach(function(item) {
      item.addEventListener('dragstart', handleDragImgStart, false);
      item.addEventListener('dragenter', handleDragImgEnter, false);
      item.addEventListener('dragover', handleDragImgOver, false);
      item.addEventListener('dragleave', handleDragImgLeave, false);
      item.addEventListener('drop', handleDropImg, false);
      item.addEventListener('dragend', handleDragImgEnd, false);
    });
}

/* La table des pages web de voyage a lire */
let tabpage = [
    ["./data_file_vol_solPalmanova.html", "Sol palmanova test", true],
    ["./vol_solPalmanova.html", "Sol palmanova", true],
    ["./train_londres.html", "Londres", true],
    ["./mer_kiel.html", "Kiel", true],
    ["./vol_losAngeles.html", "Los Angeles", false],
    ["./vol_okinawa.html", "Okinawa", false],
    ["./train_cologne.html", "Cologne", false],
    ["./train_zurich.html", "Zurich", false],
    ["./mer_buenosAires.html", "Buenos Aires", false],
    ["./mer_caraibes.html", "Caraïbes", false]
];

/* variables initialises */
let nb_contenu_gener = 0;
let nb_contenu_serv = 0;
let nb_photo_gener = 0;
let nb_vol = 0;
let nb_chambre = 0;
let idAddImg = "";
let type_transport_value = "vol";
let up_page = false;
let chambre_formule = [];

/* retirer les espaces en trop */
String.prototype.reduceWhiteSpace = function() {
    return this.replace(/\s+/g, ' ');
};

/* supprimer les images */
function delete_image(e) {
    e.target.previousSibling.remove();
    e.target.remove();
}

/* supprimer un conetnu */
function delete_contenu(e) {
    let contenu_del = e.target.id.split("_");
    document.getElementById("title_contenu_"+contenu_del[2]+"_"+contenu_del[3]).remove();
}

/* supprimer une formule pour la chambre */
function delete_formule(e) {
    let contenu_del = e.target.id.split("_");
    document.getElementById("formule_"+contenu_del[2]+"_"+contenu_del[3]+"_"+contenu_del[4]).remove();
}

/* activer le click pour la suppression d'une image */
function form_delete_click_img() {
    let deleteImg = document.querySelectorAll('.delete_image');
    deleteImg.forEach(function(item) {
        item.addEventListener('click', delete_image);
    });
}

/* activer le click pour la suppression d'un contenu dans la page */
function form_delete_click_contenu() {
    let deleteContenu = document.querySelectorAll('.delete_contenu');
    deleteContenu.forEach(function(item) {
        item.addEventListener('click', delete_contenu);
    });
}

/* activer le click pour masquer ou afficher du texte */
function form_down_up_contenu_click() {
    let down_up = document.querySelectorAll('.afficher_masquer_contenu');
    down_up.forEach(function(item) {
        item.addEventListener('click', down_up_contenu);
    });
}

/* afficher ou masquer du texte */
function down_up_contenu(e) {
    let down_up = e.target.id.split("_");
    if(e.target.classList.contains("img_down")) {
        document.getElementById(e.target.id).outerHTML = '<img id="afficher_masquer_'+down_up[2]+"_"+down_up[3]+'" class="afficher_masquer_contenu img_up" alt="masquer le contenu" title="masquer le contenu" src="./../img/bullet_arrow_down.svg" />';
        document.getElementById(e.target.id).style.transform = "rotate(0deg)";
    } else if(e.target.classList.contains("img_up")) {
        document.getElementById(e.target.id).outerHTML = '<img id="afficher_masquer_'+down_up[2]+"_"+down_up[3]+'" class="afficher_masquer_contenu img_down" alt="afficher le contenu" title="afficher le contenu" src="./../img/bullet_arrow_down.svg" />';
        document.getElementById(e.target.id).style.transform = "rotate(180deg)";
    }
    form_down_up_contenu_click();
}

/* ajouter une valeur dans le tableau de recherche
pos (int) : position dans le tableau
elemt : le tableau dans le html
lien (string) : le lien de la page
title (string) : le titre de la page
 */
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

/*
La creation de tous les contenus de la page (general, transport, chambres, services).
id_conteneur (string) : id du contenur de celui-ci
id_contenu (string) : id du contenu
class_contenu (string) : la ou les classe du contenu
contenu (string) : le contenu du bloc
*/
function create_contenu_all(id_conteneur, id_contenu, class_contenu, contenu) {
    document.getElementById(id_conteneur).innerHTML += '<figure id="'+id_contenu+'" class="'+class_contenu+' drag_contenu" draggable="true">'+
    contenu+
    '</figure>'; 
    allDragDropContenu();
}

/* Ajouter un contenu a la page 
id (string) : ou ajouter le contenu (general ou service)
title (string) : le titre
contenu (string) : contenu
*/
function add_title_contenu(id, title, contenu) {
    let nm_contenu = nb_contenu_gener;
    if(id == "services") {
        nm_contenu = nb_contenu_serv;
    }
    let all_contenu = '<img id="delete_contenu_'+id+'_'+nm_contenu+'" class="delete_contenu" alt="suprimer le contenu" title="suprimer le contenu" src="./../img/icons8-supprimer-pour-toujours-90.svg" />'+
    '<label>Titre</label>'+
    '<input id="title_'+id+'_'+nm_contenu+'" type="text" value="'+title+'" />'+
    '<img id="afficher_masquer_'+id+'_'+nm_contenu+'" class="afficher_masquer_contenu img_down" alt="afficher le contenu" title="afficher le contenu" src="./../img/bullet_arrow_down.svg" style="transform: rotate(180deg);" />'+
    '<label class="label_contenu contenu_clos">Contenu</label><textarea id="contenu_'+id+'_'+nm_contenu+'" class="text_contenu contenu_clos" rows="10">'+contenu+'</textarea>';
    create_contenu_all(id, 'title_contenu_'+id+'_'+nm_contenu, "title_contenu", all_contenu);
    form_delete_click_contenu();
    form_down_up_contenu_click();
    if(nm_contenu == 0) {
        document.getElementById('afficher_masquer_'+id+'_'+nm_contenu).click();
    }
}

/*
Creation de date a afficher dans les transports
jour (string) : jour au format '21 juin'
heure (string) : heure du transport sur la forme '15:21'
*/
function date_a_afficher(jour, heure) {
    let tab_mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novemebre", "décembre"];
    let jour_date = jour.split(" ");
    let mois = 0;
    let jour_value = Number.parseInt(jour_date[0]);
    let display_jour = jour_value.toString();
    for(let i=0; i < tab_mois.length; i++) {
        if(jour_date[1].toLowerCase() == tab_mois[i]) {
            mois = i+1;
        }
    }
    let display_mois = mois.toString();
    if(mois < 10) {
        display_mois = "0"+display_mois;
    }
    if(jour_value < 10) {
        display_jour = "0"+display_jour;
    }
    return '2022-'+display_mois+'-'+display_jour+'T'+heure;
}

/*
recuperation du detail pour un trajet dans la page
doc (DOM) : recuperation des donnees sur la page
return (array(string)) : des valeurs du trajet
*/
function vol_detail(doc) {
    let title = "";
    let compagnie = "";
    let jour = "";
    let depart = "";
    let arrivee = "";
    /* recuperer le titre */
    let trajet_vol = doc.querySelectorAll(".trajet-vol");
    trajet_vol.forEach(element => {
        let trajet_p = element.querySelectorAll("p");
        trajet_p.forEach(element1 => {
            title = element1.innerHTML;
        });
    });
    /* recuperer la compagnie */
    let compagnie_vol = doc.querySelectorAll(".compagnie-vol");
    compagnie_vol.forEach(element => {
        let trajet_p = element.querySelectorAll("p");
        trajet_p.forEach(element1 => {
            compagnie += "\n"+element1.innerHTML;
        });
    });
    let nb_value = 0;
    /* recuperer le jour du trajet */
    let detail_vol = doc.querySelectorAll(".detail-vol");
    detail_vol.forEach(element => {
        let trajet_p = element.querySelectorAll("p");
        trajet_p.forEach(element1 => {
            if(nb_value == 0) {
                jour = element1.innerHTML;
            }
            nb_value++;
        });
    });
    nb_value = 0;
    /* recupere le depart */
    let heure_dep = doc.querySelectorAll(".heure-dep");
    heure_dep.forEach(element => {
        let trajet_p = element.querySelectorAll("p");
        trajet_p.forEach(element1 => {
            if(nb_value == 0) {
                depart = element1.innerHTML;
            }
            nb_value++;
        });
    });
    nb_value = 0;
    /* recupere l'arrive */
    let heure_arr = doc.querySelectorAll(".heure-arr");
    heure_arr.forEach(element => {
        let trajet_p = element.querySelectorAll("p");
        trajet_p.forEach(element1 => {
            if(nb_value == 0) {
                arrivee = element1.innerHTML;
            }
            nb_value++;
        });
    });
    return [title, compagnie, date_a_afficher(jour, depart), date_a_afficher(jour, arrivee)];
}

/* recuperer tous les trajets dans la page */
function all_vols(doc) {
    let list_vol = doc.querySelectorAll(".conteneur-vol");
    list_vol.forEach(element_vol => {
        let depart = ["", "", "", ""];
        let retour = ["", "", "", ""];
        /* recupere le trajet de depart */
        let info_depart = element_vol.querySelectorAll(".depart");
        info_depart.forEach(element_dep => {
            depart = vol_detail(element_dep);
        });
        /* recupere le trajet de retour */
        let info_retour = element_vol.querySelectorAll(".retour");
        info_retour.forEach(element_retour => {
            retour = vol_detail(element_retour);
        });
        let detail = "";
        let aeroport = "";
        /* recupere les details du trajet */
        let info_detail = doc.querySelectorAll(".detail");
        info_detail.forEach(element => {
            let trajet_p = element.querySelectorAll("p");
            trajet_p.forEach(element1 => {
                detail += "\n"+element1.innerHTML;
            });
        });
        /* recupere les informations du trajet */
        let info_aeroport = doc.querySelectorAll(".aeroport");
        info_aeroport.forEach(element => {
            let trajet_p = element.querySelectorAll("p");
            trajet_p.forEach(element1 => {
                aeroport += "\n"+element1.innerHTML;
            });
        });
        add_vol_page(depart, retour, detail.reduceWhiteSpace().trim(), aeroport.reduceWhiteSpace().trim());
    });
}

/*
Ajouter un trajet aller retour dans la page.
depart (array(string)) : le depart
arrivee (array(string)) : l'arrivee
detail (string) : detail du trajet
aeroport (string) : detail sur le transport
*/
function add_vol_page(depart, retour, detail, aeroport) {
    let all_contenu = '<img id="delete_contenu_transport_'+nb_vol+'" class="delete_contenu" alt="suprimer le contenu" title="suprimer le contenu" src="./../img/icons8-supprimer-pour-toujours-90.svg" />'+
    '<label>Titre du vol</label>'+
    '<input id="title_transport_'+nb_vol+'" type="text" value="Transport '+nb_vol+'" />'+
    '<img id="afficher_masquer_transport_'+nb_vol+'" class="afficher_masquer_contenu img_down" alt="afficher le contenu" title="afficher le contenu" src="./../img/bullet_arrow_down.svg" style="transform: rotate(180deg);" />'+
    '<label class="title-main contenu_clos">départ</label>'+
    '<label class="label_contenu contenu_clos">Titre</label>'+
    '<input id="title-depart_transport_'+nb_vol+'" class="text_contenu contenu_clos" type="text" value="'+depart[0]+'" />'+
    '<label class="label_contenu contenu_clos">Compagnie</label><textarea rows="3" id="compagnie_depart_transport_'+nb_vol+'" class="text_contenu contenu_clos" rows="10">'+depart[1]+'</textarea>'+
    '<label class="label_contenu contenu_clos">Jour</label><input class="text_contenu contenu_clos" id="jour-depart_transport_'+nb_vol+'" type="datetime-local" value="'+depart[2]+'" />'+
    '<label class="label_contenu contenu_clos">Arrivée</label><input class="text_contenu contenu_clos" id="arrivee-depart_transport_'+nb_vol+'" type="datetime-local" value="'+depart[3]+'" />'+
    '<label class="title-main contenu_clos">retour</label>'+
    '<label class="label_contenu contenu_clos">Titre</label>'+
    '<input id="title-retour_transport_'+nb_vol+'" class="text_contenu contenu_clos" type="text" value="'+retour[0]+'" />'+
    '<label class="label_contenu contenu_clos">Compagnie</label><textarea rows="3" id="compagnie_retour_transport_'+nb_vol+'" class="text_contenu contenu_clos" rows="10">'+retour[1]+'</textarea>'+
    '<label class="label_contenu contenu_clos">Jour</label><input class="text_contenu contenu_clos" id="jour-retour_transport_'+nb_vol+'" type="datetime-local" value="'+retour[2]+'" />'+
    '<label class="label_contenu contenu_clos">Arrivée</label><input class="text_contenu contenu_clos" id="arrivee-retou_transport_'+nb_vol+'" type="datetime-local" value="'+retour[3]+'" />'+
    '<label class="title-main contenu_clos">Détails</label>'+
    /*'<label class="label_contenu contenu_clos">Détail</label><textarea rows="3" id="text_detail_transport_'+nb_vol+'" class="text_contenu contenu_clos" rows="10">'+detail+'</textarea>'+*/
    '<label class="label_contenu contenu_clos text_aeroport_transport">Aéroport</label><textarea rows="3" id="text_aeroport_transport_'+nb_vol+'" class="text_contenu contenu_clos" rows="10">'+aeroport+'</textarea>';
    create_contenu_all('transport', 'title_contenu_transport_'+nb_vol, "title_contenu", all_contenu);
    form_delete_click_contenu();
    form_down_up_contenu_click();
    if(nb_vol == 0) {
        document.getElementById('afficher_masquer_transport_'+nb_vol).click();
    }
    modif_type_transport();
    nb_vol++;
}

/*
ajouter un vol vide sur la page
*/
function add_vol() {
    let depart = ["", "", "2018-06-12T19:30", "2018-06-12T19:30"];
    let retour = ["", "", "2018-06-12T19:30", "2018-06-12T19:30"];
    add_vol_page(depart, retour, "", "")
}

/*
effacer les donnees de la page
*/
function resetPage() {
    nb_contenu_gener = 0;
    nb_contenu_serv = 0;
    nb_photo_gener = 0;
    nb_vol = 0;
    nb_chambre = 0;
    idAddImg = "";
    up_page = false;
    type_transport_value = "vol";
    chambre_formule = [];
    document.getElementById("titre-page").value = "";
    document.getElementById("add_img").innerHTML = "";
    document.getElementById("general").innerHTML = '';
    document.getElementById("services").innerHTML = '';
    document.getElementById('transport').innerHTML = '';
    document.getElementById("pourcentage-page").value = 0;
    document.getElementById('type-transport').value = "";
    document.getElementById("all_chambre").innerHTML = "";
    document.getElementById('up_page').checked = false;
}

/*
creation des images dans l'information du général de la page
doc (DOM) : l'endroit ou récupérer les images
*/
function loadImgGener(doc) {
    let list_photo = doc.getElementById("photos-presentation").querySelectorAll("img");
    list_photo.forEach(element => {
        element.classList.add("drag_img");
        if(element.id == "") {
            element.id = "img_"+nb_photo_gener;
        }
        element.setAttribute('draggable', true);
        document.getElementById("add_img").innerHTML += element.outerHTML;
        /* bouton pour supprimer l'image*/
        document.getElementById("add_img").innerHTML += "<img class=\"delete_image\" id=\"delete_img_"+nb_photo_gener+"\" alt=\"suprimer la photo\" title=\"suprimer la photo\" src=\"./../img/icons8-supprimer-pour-toujours-90.svg\" />";
        nb_photo_gener++;
    });
    form_delete_click_img();
    allDragDropImg();
}

/*
Recuperation du pourcentage
doc (Dom) : pour recuperer le pourcentage
*/
function load_pourcentage(doc) {
    let load_pourcenatge = doc.querySelectorAll('.pourcentage');
    load_pourcenatge.forEach(function(item) {
        let load_p = item.querySelectorAll('p');
        load_p.forEach(function(item_p) {
            document.getElementById("pourcentage-page").value = item_p.innerHTML.replace(/%/g, '');
        });
    });
}

/*
Recuperation du titre
doc (Dom) : pour recuperer le titre
*/
function recup_title(doc) {
    let h1_list = doc.querySelectorAll("h1");
    h1_list.forEach(element => {
        document.getElementById("titre-page").value = element.innerHTML;
    });
}

/*
Recuperation les informations de la page
doc (Dom) : pour recuperer les informations de la page
*/
function loadInfoGener(doc) {
    let name = "";
    let value = "";
    let nb_a = 1;
    /* recupere le type de transport */
    let type_transport = doc.getElementById("barre-nav-voyage").querySelectorAll("a");
    type_transport.forEach(element => {
        if(nb_a == 2) {
            if(element.innerHTML == "Vols") {
                document.getElementById('type-transport').value = "vol";
                type_transport_value = "vol";
            } else if(element.innerHTML == "Trains") {
                document.getElementById('type-transport').value = "train";
                type_transport_value = "train";
            } else if(element.innerHTML == "Transports") {
                document.getElementById('type-transport').value = "croisiere";
                type_transport_value = "croisiere";
            }
        }
        nb_a++;
    });
    /* recupere le contenu */
    let info_gener = doc.getElementById("info-gener-grand").querySelectorAll("p");
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

/*
Recuperation les services
doc (Dom) : pour recuperer les services
*/
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
                    if(value != "") {
                        add_title_contenu("services", name, value);
                        nb_contenu_serv++;
                        value = "";
                    }
                    name = element1.innerHTML.reduceWhiteSpace().trim();
                });
            } else if(element.classList.contains('contenu-section-services')) {
                let services = element.querySelectorAll("p");
                services.forEach(element1 => {
                    value += "\n"+element1.innerHTML.reduceWhiteSpace().trim();
                });
            }
        });
        add_title_contenu("services", name, value);
        nb_contenu_serv++;
    });
    
}

/* 
Demande la lecture de la page html exterieur pour recuperer les informations
e (event) : evenement d'ecoute
*/
function loadHTMLPage(e) {
    let value_tab = Number.parseInt(e.target.id.split("_")[1]);
    up_page = tabpage[value_tab][2];
    loadHTML(tabpage[value_tab][0]);
}

/*
Lectures de la page exterieur
doc (DOM) : de la page extérieur
*/
function loadHtmlDoc(doc) {
    let up_page_old = up_page;
    resetPage();
    up_page = up_page_old;
    recup_title(doc);
    loadImgGener(doc);
    loadInfoGener(doc);
    services(doc);
    load_pourcentage(doc);
    all_vols(doc);
    add_chambre_page(doc)
    document.getElementById('up_page').checked = up_page;
    modif_type_transport();
}

/*
Recuperation d'une image pour afficher dans une des chambres
event (event) : evenement d'ecoute
*/
function loadFilesChambre(event) {
    let files = event.target.files;
    let preview = document.getElementById(idAddImg);
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var imageType = /^image\//;
  
      if (!imageType.test(file.type)) {
        continue;
      }

      var img = document.createElement("img");
      img.classList.add("obj");
      img.classList.add("img-slide-presentation");
      //img.classList.add("drag_img");
      img.id = "img_"+nb_photo_gener;
      //img.setAttribute('draggable', true);
      img.file = file;
      preview.appendChild(img);

      var imgDelete = document.createElement("img");
      imgDelete.classList.add("delete_image");
      imgDelete.src = "./../img/icons8-supprimer-pour-toujours-90.svg";
      imgDelete.setAttribute("alt","suprimer la photo");
      imgDelete.setAttribute("title","suprimer la photo");
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
    //allDragDropImg();
}

/*
Recuperation d'une image pour afficher dans le general
event (event) : evenement d'ecoute
*/
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
      img.classList.add("drag_img");
      img.id = "img_"+nb_photo_gener;
      img.setAttribute('draggable', true);
      img.file = file;
      preview.appendChild(img);

      var imgDelete = document.createElement("img");
      imgDelete.classList.add("delete_image");
      imgDelete.src = "./../img/icons8-supprimer-pour-toujours-90.svg";
      imgDelete.setAttribute("alt","suprimer la photo");
      imgDelete.setAttribute("title","suprimer la photo");
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
    allDragDropImg();
}

/*
Ouvrir la fenetre de telechargement d'une image pour une des chambres
event (event) : evenement d'ecoute
*/
function img_add_chambre(event) {
    let idAddImgTab = event.target.id.split("_");
    idAddImg = "add_img_chambre_"+idAddImgTab[2];
    document.getElementById("fileToUpload_chambre_"+idAddImgTab[2]).click();
}

/*
Recuperation d'une image pour afficher dans une des chambres
e (event) : evenement d'ecoute
*/
function del_formule(event) {
    let num_chambre = Number.parseInt(event.target.id.split("_")[3]);
    let num_formule = Number.parseInt(event.target.id.split("_")[4]);
    document.getElementById('formule_chambre_'+num_chambre+'_'+num_formule).remove();
}

/*
Activer la suppression d'une formule
*/
function from_del_formule() {
    let del_formule_click = document.querySelectorAll('.delete_formule');
    del_formule_click.forEach(function(item) {
        item.addEventListener('click', del_formule);
    });
}

function add_the_formule(num, titre, prix) {
    document.getElementById('add_formules_'+num).innerHTML += '<figure id="formule_chambre_'+num+'_'+chambre_formule[num]+'" class="une_formule">'+
    '<img id="delete_contenu_chambre_'+num+'_'+chambre_formule[num]+'" class="delete_formule" alt="suprimer le contenu" title="suprimer le contenu" src="./../img/icons8-supprimer-pour-toujours-90.svg" />'+
    '<label class="une_formule_titre">Titre</label>'+
    '<input class="une_formule_titre_value text_contenu" id="title_chambre_'+num+'_'+chambre_formule[num]+'" type="text" value="'+titre+'" />'+
    '<label class="une_formule_prix">Prix</label>'+
    '<input class="une_formule_prix_value text_contenu" id="prix_chambre_'+num+'_'+chambre_formule[num]+'" class="prix_chambre" type="number" value="'+prix+'" />'+
    '</figure>';
    chambre_formule[num]++;
    from_del_formule();
}

/*
Ajouter une formule vide
event (event) : evenement d'ecoute
*/
function addformule(event) {
    let num_chambre = Number.parseInt(event.target.id.split("_")[2]);
    add_the_formule(num_chambre, "", 0);
}

/*
Activer un group d'action avec la creation de la chamber
*/
function add_img_chambre() {
    /* active la lecture dans dossier pour recuperer une image dans une des chambre */
    let fileToUpload = document.querySelectorAll('.fileToUpload');
    fileToUpload.forEach(function(item) {
        item.addEventListener('change', loadFilesChambre);
    });

    /* active l'ajout d'une image pour une des chambres */
    let img_add_chambre1 = document.querySelectorAll('.img-add_chambre');
    img_add_chambre1.forEach(function(item) {
        item.addEventListener('click', img_add_chambre);
    });

    /* activer l'ajout de formule pour une des chambre */
    let add_formule = document.querySelectorAll('.add_formule');
    add_formule.forEach(function(item) {
        item.addEventListener('click', addformule);
    });
}

/*
Ajoute une image dans l'une chambre dans la page html, a partir d'un fichier exterieur
doc (DOM) : ou recuperer les images
numchambre (int) : le numero de la chambre dans la page
*/
function loadImgChambre(doc, numchambre) {
    let all_photos = doc.querySelectorAll(".conteneur-photos-chambre");
    all_photos.forEach(element0 => {
        let list_photo = element0.querySelectorAll("img");
        list_photo.forEach(element => {
            //element.classList.add("drag_img");
            //element.setAttribute('draggable', true);
            if(element.id == "") {
                element.id = "img_"+nb_photo_gener;
            }
            document.getElementById('add_img_chambre_'+numchambre).innerHTML += element.outerHTML;
            document.getElementById('add_img_chambre_'+numchambre).innerHTML += "<img class=\"delete_image\" id=\"delete_img_"+nb_photo_gener+"\" alt=\"suprimer la photo\" title=\"suprimer la photo\" src=\"./../img/icons8-supprimer-pour-toujours-90.svg\" />";
            nb_photo_gener++;
        });
    });
    form_delete_click_img();
    //allDragDropImg();
}

/*
Ajoute une formule dans l'une chambre dans la page html, a partir d'un fichier exterieur
doc (DOM) : ou recuperer les formules
numchambre (int) : le numero de la chambre dans la page
*/
function formuleChambre(doc, numchambre) {
    let formule_chambre = doc.querySelectorAll(".formule-chambre");
    formule_chambre.forEach(element => {
        let titre = "";
        let prix = 0;
        let titre_chambre = element.querySelectorAll(".titre-chambre");
        titre_chambre.forEach(element1 => {
            let titre_chambre_p = element1.querySelectorAll("p");
            titre_chambre_p.forEach(element2 => {
                titre = element2.innerHTML;
            });
        });
        let prix_chambre = element.querySelectorAll(".prix");
        prix_chambre.forEach(element1 => {
                prix = Number.parseInt(element1.innerHTML.split(' ')[0]);
        });
        add_the_formule(numchambre, titre, prix);
    });
}

/*
Ajoute une chambre dans la page HTML
title (string) : le titre de la chambre
contenu (string) : le contenu pour la chambre
*/
function add_chambre_def(title, contenu) {
    let all_contenu = '<img id="delete_contenu_chambre_'+nb_chambre+'" class="delete_contenu" alt="suprimer le contenu" title="suprimer le contenu" src="./../img/icons8-supprimer-pour-toujours-90.svg" />'+
    '<label>Titre</label>'+
    '<input id="title_chambre_'+nb_chambre+'" type="text" value="'+title+'" />'+
    '<img id="afficher_masquer_chambre_'+nb_chambre+'" class="afficher_masquer_contenu img_down" alt="afficher le contenu" title="afficher le contenu" src="./../img/bullet_arrow_down.svg" style="transform: rotate(180deg);" />'+

    '<input type="File" name="fileToUpload" id="fileToUpload_chambre_'+nb_chambre+'" class="fileToUpload" accept="image/png, image/jpeg" />'+
    '<figure id="all_img_chambre_'+nb_chambre+'" class="all_img_chambre contenu_clos"><img id="img-add_chambre_'+nb_chambre+'" class="img-add_chambre" alt="ajouter une image" title="ajouter une image" src="./../img/icons8-ajouter-80_1.svg" />'+
    '<figure id="add_img_chambre_'+nb_chambre+'" class="all_chambres_img"></figure>'+
    '</figure>'+

    '<label class="label_contenu contenu_clos">Contenu</label><textarea id="contenu_chambre_'+nb_chambre+'" class="text_contenu contenu_clos" rows="10">'+contenu+'</textarea>'+

    '<figure id="add_formules_'+nb_chambre+'" class="formules_chambre contenu_clos">'+
    '</figure>'+
    '<img id="add-formule_chambre_'+nb_chambre+'" alt="ajouter une formule" title="ajouter une formule" class="add_formule add_formule contenu_clos" src="./../img/icons8-ajouter-80.svg" />';
    create_contenu_all('all_chambre', 'title_contenu_chambre_'+nb_chambre, "title_contenu", all_contenu);
    chambre_formule.push(0);
    form_delete_click_contenu();
    form_down_up_contenu_click();
    add_img_chambre();
    if(nb_chambre == 0) {
        document.getElementById('afficher_masquer_chambre_'+nb_chambre).click();
    }
}

/*
ajouter une chambre a partir d'une page exterieur
doc (DOM) : pour telecharger les informations de la page
 */
function add_chambre_page(doc) {
    let chambre = doc.querySelectorAll('.conteneur-general-chambre');
    chambre.forEach(function(item) {
        let title = "";
        let contenu = "";
        let title_chambre = item.querySelectorAll('h5');
        title_chambre.forEach(function(item1) {
            title = item1.innerHTML;
        });
        let details_chambre = item.querySelectorAll('.details-chambre');
        details_chambre.forEach(function(item1) {
            let contenu_chambre = item1.querySelectorAll('.details-generaux');
            contenu_chambre.forEach(function(item2) {
                let contenu_chambre_p = item2.querySelectorAll('p');
                contenu_chambre_p.forEach(function(item3) {
                    contenu += "\n"+item3.innerHTML;
                });
            });
            let contenu_chambre1 = item1.querySelectorAll('li');
            contenu_chambre1.forEach(function(item2) {
                contenu += "\n"+item2.innerHTML;
            });
        });
        add_chambre_def(title, contenu);
        loadImgChambre(item, nb_chambre);
        formuleChambre(item, nb_chambre);
        nb_chambre++;
    });
}

/*
ajouter une chambre vide sur le html
*/
function add_chambre() {
    add_chambre_def("", "");
    nb_chambre++;
}

/*
ajouter une image dans le general
*/
function img_add() {
    document.getElementById('fileToUpload').click();
}

/*
creation du tableau de la recherche par defaut
*/
function createTabPage() {
    let i = 0;

    tabpage.forEach(element => {
        let elmt = document.getElementById("tab_find");
        addRowVoyage(i, elmt, element[0], element[1]);
        i++;
    });
}

/*
Ajouter un contenu vide dans le general
*/
function add_gener_contenu() {
    add_title_contenu("general", "", "");
    nb_contenu_gener++;
}

/*
Ajouter un contenu vide dans les services
*/
function add_service_contenu() {
    add_title_contenu("services", "", "");
    nb_contenu_serv++;
}

/*
modifier le type de transport dans l'onglet transport
*/
function modif_type_transport() {
    let name_default = "Aéroport";
    if(type_transport_value == "train") {
        name_default = "Gare";
    } else if(type_transport_value == "croisiere") {
        name_default = "Transport";
    }
    let name_transport = document.querySelectorAll('.text_aeroport_transport');
    name_transport.forEach(function(item1) {
        item1.innerHTML = name_default;
    });
}

/*
En cas de changement de selection du type de transport, faire les modifications
*/
function type_transport_change() {
    type_transport_value = document.getElementById('type-transport').value;
    modif_type_transport();
}

/* creation de la table par defaut */
createTabPage();
document.getElementById('type-transport').addEventListener('change', type_transport_change);
document.getElementById('fileToUpload').addEventListener('change', loadFiles);
document.getElementById('img-add').addEventListener('click', img_add);
document.getElementById('add-gener-contenu').addEventListener('click', add_gener_contenu);
document.getElementById('add-service-contenu').addEventListener('click', add_service_contenu);
document.getElementById('add-service-contenu').addEventListener('click', add_service_contenu);
document.getElementById('add-transport-contenu').addEventListener('click', add_vol);
document.getElementById('add-chambre-contenu').addEventListener('click', add_chambre);

/* activer les boutons pour annuler les changements */
let itemsAnnuler = document.querySelectorAll('.annuler');
itemsAnnuler.forEach(function(item) {
    item.addEventListener('click', resetPage);
});

/* Activer le bouton pour modifier un voyage */
let modif_row = document.querySelectorAll('.modif_row');
modif_row.forEach(function(item) {
    item.addEventListener('click', loadHTMLPage);
});
