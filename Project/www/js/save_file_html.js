function loadTabDat(tab_add) {
  let tr = document.getElementById("tab_find").querySelectorAll("tr");
  let tab_save = [];
  for (i = tabpage.length; i < tr.length; i++) {
    tab_save.push([
      document.getElementById("modif_href_" + i).value,
      document.getElementById("modif_title_" + i).innerHTML,
      document.getElementById("modif_up_" + i).value == "true",
    ]);
  }
  tab_save.push(tab_add);
  return tab_save;
}

function addformuleChambre(title, prix, promo) {
  return (
    '<article class="demi-pension formule-chambre">' +
    '<article class="titre-chambre">' +
    "<p>" +
    title +
    "</p>" +
    "</article>" +
    '<article class="infos-annul">' +
    "<p>Annulation gratuite de l'hébergement jusqu'au 02/06/22</p>" +
    "</article>" +
    '<article class="conteneur-infos-prix">' +
    '<article class="conteneur-prix">' +
    (promo ? '<p class="promotion">Promotion !</p>' : "") +
    '<p class="prix">' +
    prix +
    "€</p>" +
    "</article>" +
    '<p class="infos-offre">Par pers., 3 nuits, vol incl.</p>' +
    "</article>" +
    '<article class="bouton-continuer">' +
    "<button>Continuer</button>" +
    "</article>" +
    "</article>"
  );
}

function addService(title, contenu) {
  letarraycontenu = contenu.split("\n");
  let value = '<article class="conteneur-service">';
  value += '<article class="titre-section-service">';
  value += "<p>" + title + "</p>";
  value += "</article>";

  value += '<article class="contenu-section-services">';
  letarraycontenu.forEach(function (element) {
    value += "<p>" + element + "</p>";
  });
  value += "</article>";
  value += "</article>";
  return value;
}

function addServices(text) {
  let textinfo = "";
  let arrayChambres = document
    .getElementById("services")
    .querySelectorAll(".title_contenu");
  arrayChambres.forEach((element) => {
    let titre = "";
    let contenu = "";
    let arraytitre = element.querySelectorAll("input");
    arraytitre.forEach((element1) => {
      titre = element1.value;
    });
    let arraycontenu = element.querySelectorAll("textarea");
    arraycontenu.forEach((element1) => {
      contenu = element1.value;
    });
    textinfo += addService(titre, contenu);
  });
  return text.replaceAll("#services_voyage#", textinfo);
}

function addChambre(title, formule, photos, detail, nb_chambre) {
  let text =
    '<article class="conteneur-general-chambre chambre' +
    nb_chambre +
    '">' +
    '<article class="conteneur-photos-chambre">' +
    photos +
    '<div class="precedent" onclick="ChangeSlideChambre' +
    nb_chambre +
    '(-1)"><</div>' +
    '<div class="suivant" onclick="ChangeSlideChambre' +
    nb_chambre +
    '(1)">></div>' +
    "</article>" +
    '<article class="conteneur-infos-chambre">' +
    "<h5>" +
    title +
    "</h5>" +
    '<article class="details-chambre">' +
    detail +
    '<p class="afficher-details" id="parag-aff-masq-details' +
    nb_chambre +
    '">' +
    "Voir plus de détails" +
    "</p>" +
    "</article>" +
    formule +
    "</article>" +
    "</article>";
  return text;
}

/*
Entrer le texte sous format html et remplacer "#voyage_title#" par le titre
text (String) : texte sous format html
return (string) : texte modifier
*/
function remplace_title(text) {
  return text.replaceAll(
    "#voyage_title#",
    document.getElementById("titre-page").value
  );
}

/*
Entrer le texte sous format html et remplacer "#voyage_pourcentage#" par le pourcentage
text (String) : texte sous format html
return (string) : texte modifier
*/
function remplace_pourcentage(text) {
  let value = document.getElementById("pourcentage-page").value;
  let display_pour = "";
  if (value < 0) {
    display_pour = '<figure class="pourcentage"><p>' + value + "%</p></figure>";
  }
  return text.replaceAll("#voyage_pourcentage#", display_pour);
}

function ispourcentage() {
  return document.getElementById("pourcentage-page").value < 0;
}

function loadtransport() {
  return document.getElementById("type-transport").value;
}

function remplace_transport(text, transport) {
  let name_transport = "Vols";
  let type_transport = "Vol";
  if (transport == "train") {
    name_transport = "Trains";
    type_transport = "Train";
  } else if (transport == "croisiere") {
    name_transport = "Transports";
    type_transport = "Transports";
  }
  text = text.replaceAll("#voyage_type_info#", type_transport);
  return text.replaceAll("#voyage_type#", name_transport);
}

/*
Entrer le texte sous format html et remplacer "#voyage_pourcentage#" par le pourcentage
id (String) : qui contient les images
return (array) : les "src" des images
*/
function loadImgFile(id) {
  let arrayImg = [];
  let imgs = document.getElementById(id).querySelectorAll("img");
  imgs.forEach(function (imgLoad) {
    if (!imgLoad.id.startsWith("delete_img_")) {
      let srcImg = imgLoad.src;
      if (imgLoad.file != undefined) {
        srcImg = "../data_tmp/images/" + imgLoad.file.name;
      }
      arrayImg.push(srcImg);
    }
  });
  return arrayImg;
}

function remplace_image_general(text) {
  let arrayImgs = loadImgFile("add_img");

  let i = 0;
  arrayImgs.forEach(function (imgSrc) {
    if (i == 0) {
      text = text.replaceAll(
        "#voyage_gde-photo#",
        '<img src="' + imgSrc + '" alt="" />'
      );
    } else {
      text = text.replaceAll(
        "#voyage_voyage-slide" + i + "#",
        '<img src="' +
          imgSrc +
          '" id="voyage-slide' +
          i +
          '" class="img-slide-presentation" alt="" />'
      );
    }
    i++;
  });
  text = text.replaceAll("#voyage_gde-photo#", "");
  text = text.replaceAll("#voyage_voyage-slide1#", "");
  text = text.replaceAll("#voyage_voyage-slide2#", "");
  text = text.replaceAll("#voyage_voyage-slide3#", "");
  text = text.replaceAll("#voyage_voyage-slide4#", "");
  return text;
}

function addInfoGener(title, contenu) {
  let value = '<p class="titre-paragraphe">' + title + "</p>";
  let arrayContenus = contenu.split("\n");
  let i = 0;
  arrayContenus.forEach(function (element) {
    if (i == 0) {
      value += '<p class="contenu">' + element + "</p>";
    } else {
      value += '<p class="contenu-add">' + element + "</p>";
    }
    i++;
  });
  return value;
}

function infoGeneral(text) {
  let textinfo = "";
  let textinfomini = "";
  let i = 0;
  let arrayChambres = document
    .getElementById("general")
    .querySelectorAll(".title_contenu");
  arrayChambres.forEach((element) => {
    let titre = "";
    let contenu = "";
    let arraytitre = element.querySelectorAll("input");
    arraytitre.forEach((element1) => {
      titre = element1.value;
    });
    let arraycontenu = element.querySelectorAll("textarea");
    arraycontenu.forEach((element1) => {
      contenu = element1.value;
    });
    textinfo += addInfoGener(titre, contenu);
    if (i == 0) {
      textinfomini = addInfoGener(titre, contenu);
    }
    i++;
  });
  let textAllInfo =
    '<article id="info-gener-petit">' +
    textinfomini +
    '<p id="afficher-bloc" onclick="afficher()">' +
    "Lire plus à propos de l'hôtel" +
    "</p>" +
    "</article>" +
    '<article id="info-gener-grand">' +
    textinfo +
    '<p id="masquer-bloc" onclick="masquer()">' +
    "Masquer les détails de l'hôtel" +
    "</p>" +
    "</article>";
  return text.replaceAll("#info_general#", textAllInfo);
}

function remplace_image_chambre(nm_chambre) {
  let arrayImgs = loadImgFile("add_img_chambre_" + nm_chambre);

  let i = 0;
  let imgs = "";
  arrayImgs.forEach(function (imgSrc) {
    if (i < 3) {
      let photo_place = "photos-milieu";
      if (i == 1) {
        photo_place = "photos-cotes un";
      } else if (i == 2) {
        photo_place = "photos-cotes deux";
      }
      let j = i + 1;
      let k = nm_chambre + 1;
      let img =
        "<img" +
        ' id="chambre' +
        k +
        "-slide" +
        j +
        '"' +
        ' sizes="(max-width: 656px) 650px, 800px"' +
        ' src="' +
        imgSrc +
        '"' +
        ' alt=""' +
        ' class="' +
        photo_place +
        " img-slide-chambre" +
        k +
        '"' +
        "/>";
      imgs += img;
    }
    i++;
  });
  return imgs;
}

function detailChambre(contenu, nm_chambre) {
  let i = 0;
  let j = 0;
  let generaux = "";
  let listSt = "";
  let list = [];
  let addlist = [];
  let arrayDetails = contenu.split("\n");
  arrayDetails.forEach((element) => {
    if (i < 3) {
      generaux += "<p>" + element + "</p>";
    } else {
      if (j < 4) {
        addlist.push(element);
      } else {
        j = 0;
        list.push(addlist);
        addlist = [];
        addlist.push(element);
      }
      j++;
    }
    i++;
  });
  list.forEach((element) => {
    listSt += "<ul>";
    element.forEach((element1) => {
      listSt += "<li>" + element1 + "</li>";
    });
    listSt += "</ul>";
  });
  return (
    '<article class="details-generaux">' +
    generaux +
    '</article><article class="liste-details" id="lstDetCh' +
    nm_chambre +
    '">' +
    listSt +
    "</article>"
  );
}

function create_all_chambre(text, promo) {
  let chambres = "";
  let arrayChambres = document
    .getElementById("all_chambre")
    .querySelectorAll(".title_contenu");
  arrayChambres.forEach((element) => {
    let num = element.id.split("_")[3];
    let imgs = remplace_image_chambre(num);
    let formules = "";
    let arrayformule = element.querySelectorAll(".une_formule");
    arrayformule.forEach((element1) => {
      let titre_formule = "";
      let prix_formule = "";
      let arraytitre = element1.querySelectorAll(".une_formule_titre_value");
      arraytitre.forEach((element2) => {
        titre_formule = element2.value;
      });
      let arrayprix = element1.querySelectorAll(".une_formule_prix_value");
      arrayprix.forEach((element2) => {
        prix_formule = element2.value;
      });
      formules += addformuleChambre(titre_formule, prix_formule, promo);
    });
    let detail = detailChambre(
      document.getElementById("contenu_chambre_" + num).value,
      num
    );
    let title = document.getElementById("title_chambre_" + num).value;
    chambres += addChambre(title, formules, imgs, detail, num);
  });
  return text.replaceAll("#all_chambres#", chambres);
}

/*
Entrer le texte sous format html et remplacer "#voyage_type#" par le type du voyage
text (String) : texte sous format html
return (string) : texte modifier
*/
function remplace_type_voyage(text) {
  let value_type = document.getElementById("type-transport").value;
  let add_type = "Vols";
  if (value_type == "train") {
    add_type = "Trains";
  } else if (value_type == "croisiere") {
    add_type = "Transports";
  }
  return text.replaceAll("#voyage_type#", add_type);
}

function jourDate(theDate) {
    let date_main = new Date(theDate);

    let tab_mois = ["jan.", "fév.", "mars", "avr.", "mai", "juin", "jui.", "août", "sep.", "oct.", "nov.", "déc."];
    let tabJour = ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."];

    return [
        tabJour[date_main.getDay()],
        date_main.getDate()+" "+tab_mois[date_main.getMonth()],
        date_main.getHours()+":"+date_main.getMinutes()
    ];
}

function calculDuree(heur1, heur2) {
    let coup1 = heur1.split(":");
    let coup2 = heur2.split(":");
    let value1 = Number.parseInt(coup1[0]) * 60 + Number.parseInt(coup1[1]);
    let value2 = Number.parseInt(coup2[0]) * 60 + Number.parseInt(coup2[1]);
    let calcul = value2 - value1;
    let heurf = calcul / 60;
    let minute = calcul - (Math.floor(heurf)*60);
    return Math.floor(heurf)+"h "+minute+"min.";
}

function addUnTransport(depart, retour, detail, aeroport, transport) {
    let type = "vol";
    if (transport == "train") {
        type = "train";
    }
  let departAll = jourDate(depart[2]);
  let departArr = jourDate(depart[3]);
  let retourAll = jourDate(retour[2]);
  let retourtArr = jourDate(retour[3]);
  let durDepart = calculDuree(departAll[2], departArr[2]);
  let durRetour = calculDuree(retourAll[2], retourtArr[2]);
  let imgs = tabtransportimg(transport);

  let addvoyage =
    '<article class="conteneur-vol">' +
    '<article class="texte">' +
    "</article>" +
    '<article class="depart">' +
    '<article class="trajet-vol">' +
    imgs[0] +
    "<p>" +
    depart[0] +
    "</p>" +
    "</article>" +
    '<article class="compagnie-vol">' +
    imgs[1] +
    '<div class="compagnie">';
  let arrayDepart = depart[1].split("\n");
  arrayDepart.forEach((element) => {
    addvoyage = "<p>" + element + "</p>";
  });
  addvoyage =
    "</div>" +
    "</article>" +
    '<article class="detail-vol">' +
    '<div class="dte-dep">' +
    "<p>"+departAll[1]+"</p>" +
    "<p>"+departAll[0]+"</p>" +
    "</div>" +
    '<div class="heure-dep">' +
    "<p>"+departAll[2]+"</p>" +
    "<p>/p>" +
    "</div>" +
    '<p class="separateur">-</p>' +
    '<div class="heure-arr">' +
    "<p>"+departArr[2]+"</p>" +
    "<p></p>" +
    "</div>" +
    '<div class="info-vol">' +
    "<p>Direct</p>" +
    "<p>"+durDepart+"</p>" +
    "</div>" +
    "</article>" +
    "</article>" +
    '<article class="retour">' +
    '<article class="trajet-vol">' +
    imgs[2] +
    "<p>" +
    retour[0] +
    "</p>" +
    "</article>" +
    '<article class="compagnie-vol">' +
    imgs[3] +
    '<div class="compagnie">';
  let arrayRetour = retour[1].split("\n");
  arrayRetour.forEach((element) => {
    addvoyage = "<p>" + element + "</p>";
  });
  addvoyage =
    "</div>" +
    "</article>" +
    '<article class="detail-vol">' +
    '<div class="dte-dep">' +
    "<p>"+retourAll[1]+"</p>" +
    "<p>"+retourAll[0]+"</p>" +
    "</div>" +
    '<div class="heure-dep">' +
    "<p>"+retourAll[2]+"</p>" +
    "<p></p>" +
    "</div>" +
    '<p class="separateur">-</p>' +
    '<div class="heure-arr">' +
    "<p>"+retourtArr[2]+"</p>" +
    "<p></p>" +
    "</div>" +
    '<div class="info-vol">' +
    "<p>Direct</p>" +
    "<p>"+durRetour+"</p>" +
    "</div>" +
    "</article>" +
    "</article>" +
    '<article class="detail">' +
    "<p>Détail du "+type+"</p>" +
    "<p>Changer le "+type+"</p>" +
    "</article>" +
    '<article class="aeroport">';
  let arrayAerop = aeroport.split("\n");
  arrayAerop.forEach((element) => {
    addvoyage = "<p>" + element + "</p>";
  });
  addvoyage = "</article>" + "</article>";
  return addvoyage;
}

function allTransport(text, transport) {
    let all_transport = "";
    let arrayTransp = document
    .getElementById("transport")
    .querySelectorAll(".title_contenu");
    arrayTransp.forEach((element) => {
        let num = element.id.split("_")[3];
        let depart = [
            document.getElementById("title-depart_transport_"+num).value,
            document.getElementById("compagnie_depart_transport_"+num).value,
            document.getElementById("jour-depart_transport_"+num).value,
            document.getElementById("arrivee-depart_transport_"+num).value
        ];
        let retour = [
            document.getElementById("title-retour_transport_"+num).value,
            document.getElementById("compagnie_retour_transport_"+num).value,
            document.getElementById("jour-retour_transport_"+num).value,
            document.getElementById("arrivee-retou_transport_"+num).value
        ];
        let aeroport = document.getElementById("text_aeroport_transport_"+num).value;
        all_transport += addUnTransport(depart, retour, "", aeroport, transport);
        //title_contenu_transport_0
    });
    return text.replaceAll("#all_transport#", all_transport);
}

function tabtransportimg(transport) {
  let imgdep1 =
    '<svg stroke-width="0" fill="currentColor" id="plane-right_svg__filled" viewBox="0 0 52 52" height="35px" width="35px" xmlns="http://www.w3.org/2000/svg"><path d="M44.87354,31c-.49659-.0127-7.36377-.57422-12.08594-.96729L15.07129,13.27344A.99816.99816,0,0,0,14.38428,13h-4.918a.99991.99991,0,0,0-.856,1.5166l9.82129,16.272-7.97461.82862L5.13379,27.22852A.99934.99934,0,0,0,4.49756,27H2a1.00035,1.00035,0,0,0-.97412,1.22656L2.604,35.00244A5.11309,5.11309,0,0,0,7.19434,39H46.79443a4.69554,4.69554,0,0,0,3.33643-1.292,3.01322,3.01322,0,0,0,.86719-2.2417C50.94141,33.79785,47.10938,31.00439,44.87354,31Z"></path></svg>';
  let imgdep2 =
    '<svg stroke-width="0" fill="currentColor" id="no_airline_logo_svg__filled" viewBox="0 0 52 52" class="TransportCommon___StyledIconNoAirlineLogo-sc-1uxfi2g-1 hYDBxh" height="35px" width="35px" xmlns="http://www.w3.org/2000/svg"><path d="M44,5H8A3,3,0,0,0,5,8V44a3,3,0,0,0,3,3H44a3,3,0,0,0,3-3V8A3,3,0,0,0,44,5Zm1,39a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8A1,1,0,0,1,8,7H44a1,1,0,0,1,1,1V28c-24.14.08-34.81,2.91-35.26,3A1,1,0,0,0,9,32v3a1,1,0,0,0,.46.84C9.92,36.14,21,43,45,43ZM35,34a1,1,0,0,1-1,1H20a1,1,0,0,1,0-2H34A1,1,0,0,1,35,34Z"></path><path d="M13.26,28.27a144.26,144.26,0,0,1,15.25-1.72L16.63,9.43A1,1,0,0,0,15.81,9H10a1,1,0,0,0-.78.38,1,1,0,0,0-.19.85Z"></path></svg>';
  let imgret1 =
    '<svg stroke-width="0" fill="currentColor" id="plane-left_svg__filled" viewBox="0 0 52 52" height="35px" width="35px" xmlns="http://www.w3.org/2000/svg"><path d="M7.12643,31c.49658-.0127,7.36377-.57422,12.08594-.96729L36.92868,13.27344A.99814.99814,0,0,1,37.61569,13h4.918a.99991.99991,0,0,1,.856,1.5166l-9.82129,16.272,7.97461.82862,5.32325-4.38867A.99932.99932,0,0,1,47.50241,27H50a1.00035,1.00035,0,0,1,.97412,1.22656L49.396,35.00244A5.11308,5.11308,0,0,1,44.80563,39H5.20553a4.69553,4.69553,0,0,1-3.33642-1.292,3.01318,3.01318,0,0,1-.86719-2.2417C1.05856,33.79785,4.89059,31.00439,7.12643,31Z"></path></svg>';
  let imgret2 =
    '<svg stroke-width="0" fill="currentColor" id="no_airline_logo_svg__filled" viewBox="0 0 52 52" class="TransportCommon___StyledIconNoAirlineLogo-sc-1uxfi2g-1 hYDBxh" height="35px" width="35px" xmlns="http://www.w3.org/2000/svg"><path d="M44,5H8A3,3,0,0,0,5,8V44a3,3,0,0,0,3,3H44a3,3,0,0,0,3-3V8A3,3,0,0,0,44,5Zm1,39a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8A1,1,0,0,1,8,7H44a1,1,0,0,1,1,1V28c-24.14.08-34.81,2.91-35.26,3A1,1,0,0,0,9,32v3a1,1,0,0,0,.46.84C9.92,36.14,21,43,45,43ZM35,34a1,1,0,0,1-1,1H20a1,1,0,0,1,0-2H34A1,1,0,0,1,35,34Z"></path><path d="M13.26,28.27a144.26,144.26,0,0,1,15.25-1.72L16.63,9.43A1,1,0,0,0,15.81,9H10a1,1,0,0,0-.78.38,1,1,0,0,0-.19.85Z"></path></svg>';

  if (transport == "train") {
    imgdep1 =
      '<svg stroke-width="0" fill="currentColor" id="train_right_svg__filled" viewBox="0 0 52 52" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M46.65,28H34a2,2,0,0,1-2-2V24a2,2,0,0,1,2-2h6.56c-3.34-2.8-6.87-5-9.34-5H3a1,1,0,0,0-1,1v4h8a2,2,0,0,1,2,2v3a2,2,0,0,1-2,2H2v6a1,1,0,0,0,1,1H47.37a2.7,2.7,0,0,0,2.7-2.7C50.07,32.42,48.7,30.36,46.65,28ZM27,27a2,2,0,0,1-2,2H19a2,2,0,0,1-2-2V24a2,2,0,0,1,2-2h6a2,2,0,0,1,2,2Z"></path><path d="M29,15a1,1,0,0,1-.6-.2L25,12.25l-3.4,2.55a1,1,0,0,1-1.2-1.6l4-3a1,1,0,0,1,1.2,0l4,3A1,1,0,0,1,29,15Z"></path><path d="M49,42H3a1,1,0,0,1,0-2H49a1,1,0,0,1,0,2Z"></path></svg>';
    imgdep2 =
      '<img alt="logo" loading="lazy" src="https://res.cloudinary.com/lastminute-contenthub/image/upload/v1/DAM/Commercial%20Partners/Airlines/Icons/2H" class="TransportCommon___StyledImg-sc-1uxfi2g-2 GxjoU">';
    imgret1 =
      '<svg stroke-width="0" fill="currentColor" id="train_left_svg__filled" viewBox="0 0 52 52" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2,33.3A2.7,2.7,0,0,0,4.7,36H49.07a1,1,0,0,0,1-1V29h-8a2,2,0,0,1-2-2V24a2,2,0,0,1,2-2h8V18a1,1,0,0,0-1-1H20.85c-2.47,0-6,2.2-9.34,5h6.56a2,2,0,0,1,2,2v2a2,2,0,0,1-2,2H5.41C3.37,30.36,2,32.42,2,33.3ZM25.07,24a2,2,0,0,1,2-2h6a2,2,0,0,1,2,2v3a2,2,0,0,1-2,2h-6a2,2,0,0,1-2-2Z"></path><path d="M23.09,15a1,1,0,0,0,.59-.2l3.4-2.55,3.4,2.55a1,1,0,0,0,1.4-.2,1,1,0,0,0-.2-1.4l-4-3a1,1,0,0,0-1.2,0l-4,3a1,1,0,0,0-.2,1.4A1,1,0,0,0,23.09,15Z"></path><path d="M49,42H3a1,1,0,0,1,0-2H49a1,1,0,0,1,0,2Z"></path></svg>';
    imgret2 =
      '<img alt="logo" loading="lazy" src="https://res.cloudinary.com/lastminute-contenthub/image/upload/v1/DAM/Commercial%20Partners/Airlines/Icons/2H" class="TransportCommon___StyledImg-sc-1uxfi2g-2 GxjoU">';
  } else if (transport == "croisiere") {
    imgdep1 =
      '<svg stroke-width="0" fill="currentColor" id="plane-right_svg__filled" viewBox="0 0 52 52" height="35px" width="35px" xmlns="http://www.w3.org/2000/svg">\'; imgdep2 = \'<img src="../img/SVG_boat.svg" alt="icône de bateau">\'; imgret1 = \'<svg stroke-width="0" fill="currentColor" id="plane-left_svg__filled" viewBox="0 0 52 52" height="35px" width="35px" xmlns="http://www.w3.org/2000/svg">';
    imgdep2 = '<img src="../img/SVG_boat.svg" alt="icône de bateau">';
    imgret1 =
      '<svg stroke-width="0" fill="currentColor" id="plane-left_svg__filled" viewBox="0 0 52 52" height="35px" width="35px" xmlns="http://www.w3.org/2000/svg">';
    imgret2 = '<img src="../img/SVG_boat.svg" alt="icône de bateau">';
  }

  return [imgdep1, imgdep2, imgret1, imgret2];
}

function loadtext(doc) {
  let name_file = "new_file_" + Date.now() + ".html";
  let htmlPage = "<!DOCTYPE html>" + "\n";

  htmlPage += doc.documentElement.outerHTML;
  let transport = loadtransport();

  htmlPage = remplace_transport(htmlPage, transport);
  htmlPage = infoGeneral(htmlPage);
  htmlPage = remplace_title(htmlPage);
  htmlPage = remplace_pourcentage(htmlPage);
  htmlPage = remplace_image_general(htmlPage);
  htmlPage = allTransport(htmlPage, transport);
  htmlPage = create_all_chambre(htmlPage, ispourcentage());

  htmlPage = addServices(htmlPage);

  htmlPage = remplace_type_voyage(htmlPage);

  // On ajoute un type MIME pertinent
  var blob = new Blob([htmlPage], { type: "text/html" });
  const blobUrl = URL.createObjectURL(blob);

  // create <a> tag dinamically
  var fileLink = document.createElement("a");
  fileLink.href = blobUrl;

  // it forces the name of the downloaded file
  fileLink.download = name_file;

  // triggers the click event
  fileLink.click();
  return [
    "./" + name_file,
    document.getElementById("titre-page").value,
    document.getElementById("up_page").value == "on",
  ];
}

function saveData(tab) {
  // On ajoute un type MIME pertinent
  var blob = new Blob([JSON.stringify(tab)], { type: "text" });
  const blobUrl = URL.createObjectURL(blob);

  // create <a> tag dinamically
  var fileLink = document.createElement("a");
  fileLink.href = blobUrl;

  // it forces the name of the downloaded file
  fileLink.download = "data.json";

  // triggers the click event
  fileLink.click();
}

/* lecture de la page exterieur 
page (string) : le lien de la page a lire
*/
function loadHTMLDefault(page) {
  let load_Html = new LoadHTML(page);
  load_Html.loadDOM().then(function (doc) {
    // verifier que la valeur de celui-ci est valide
    if (doc.getElementById("photos-presentation") != undefined) {
      let value = loadtext(doc);
      let tab = loadTabDat(value);
      saveData(tab);
    } else {
      alert("impossible de lire le fichier");
    }
  });
}

function saveFile() {
  /*const formData = new FormData();
    const photos = document.querySelector('input[type="file"]');

    formData.append('title', 'My Vegas Vacation');
    for (let i = 0; i < photos.files.length; i++) {
        formData.append(`photos_${i}`, photos.files[i]);
    }
    console.log(formData);*/
  loadHTMLDefault("./page_default.html");
  loadTabDat();
}

let itemsValider = document.querySelectorAll(".valider");
itemsValider.forEach(function (item) {
  item.addEventListener("click", saveFile);
});
