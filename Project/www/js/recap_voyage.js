/* on vérifie si les cookies existent déjà :
    - si oui, on les effaces
    - si non, on les créés  */
function checkCookie(event) {

    let nom_voyage = getCookie("nom_voyage");

    if (nom_voyage != "") {

        document.cookie = "nom_voyage=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        document.cookie = "type_chambre=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        document.cookie = "dte_depart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        document.cookie = "dte_retour=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        document.cookie = "prix_chambre=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        document.cookie = "info_offre=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        document.cookie = "page_prec=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

    }

    /* on récupère les infos dans la page */
    let nom_bouton = event.target.id;
    const tb_bouton = nom_bouton.split("-");
    let suffixe_bouton = tb_bouton[1];
    let id_prix = suffixe_bouton;
    let prix = document.getElementById(id_prix).innerText;
    let voyage = document.getElementById("voyage").innerText;
    let id_type_chambre = "type_chambre";

    if(suffixe_bouton=="prix_1"|suffixe_bouton=="prix_2") {

      id_type_chambre = "chambre1";

    } else if(suffixe_bouton=="prix_3"|suffixe_bouton=="prix_4") {

      id_type_chambre = "chambre2";

    } else {
        
      alert("un problème est survenu sur le type de chambre");
        
    }

    type_chambre = document.getElementById(id_type_chambre).innerText;
    let date_aller = document.getElementById("jour-depart").innerText + " " + document.getElementById("dte-depart").innerText;
    let date_retour = document.getElementById("jour-retour").innerText + " " + document.getElementById("dte-retour").innerText;
    let info_offre = document.getElementById("info_offre-" + suffixe_bouton).innerText;
    let page = document.location.href;

    /* on créé nos cookies */
    setCookie("nom_voyage", voyage);
    setCookie("type_chambre", type_chambre);
    setCookie("dte_depart", date_aller);
    setCookie("dte_retour", date_retour);
    setCookie("prix_chambre", prix);
    setCookie("info_offre", info_offre);
    setCookie("page_prec", page);

    /* on passe sur la page de récapitulatif du voyage */
    window.location.href="../pages/recap_voyage.html";

}


/* fonction de création du cookie */ 
function setCookie(cname, cvalue) {

    document.cookie = cname + "=" + cvalue + ";path=/";

}


/* fonction de récupération du contenu d'un cookie */
function getCookie(cname) {

    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for(let i = 0; i <ca.length; i++) {

      let c = ca[i];

      while (c.charAt(0) == ' ') {

        c = c.substring(1);

      }

      if (c.indexOf(name) == 0) {

        return c.substring(name.length, c.length);

      }

    }

    return "";
}


/* Fonction de récupération des informations des cookies au chargement de la page */
function recup_info(){

  let nom_voyage = getCookie("nom_voyage");

    if (nom_voyage != "") {

      let annee = (new Date()).getFullYear();

      document.getElementById("destination").innerText = nom_voyage;
      document.getElementById("type-chambre").innerText = getCookie("type_chambre");
      document.getElementById("date-depart").innerText = getCookie("dte_depart") + " " + annee;
      document.getElementById("date-retour").innerText = getCookie("dte_retour") + " " + annee;
      document.getElementById("info-offre").innerText = getCookie("info_offre");
      document.getElementById("prix").innerText = getCookie("prix_chambre");
      document.getElementById("nbr-pers").innerText = document.getElementById("qte").value;
      document.getElementById("prix-tot").innerText = getCookie("prix_chambre");

    }

}





let prix_assurance = 0;
let prix_transport = 0;
let quantite_passager = 1;
let prix_chambre_base = getCookie("prix_chambre").split("€")[0];
let pourc_reduction = 0;
let montant_reduction = 0;

/* fonction de mise à jour du nombre de passagers et du prix total en fonction du choix de l'utilisateur */
function changementQte(){

  quantite_passager = document.getElementById("qte").value;

  document.getElementById("nbr-pers").innerText = quantite_passager;

  montant_reduction = Math.round(((Number.parseFloat(prix_chambre_base)+Number.parseFloat(prix_assurance)
                        +Number.parseFloat(prix_transport))*pourc_reduction/100)*100)/100

  document.getElementById("prix-tot").innerText = Math.round((Number.parseFloat(prix_chambre_base)+Number.parseFloat(prix_assurance)
                                                  +Number.parseFloat(prix_transport)-Number.parseFloat(montant_reduction))*quantite_passager*100)/100 + " €";

}


/* fonction de gestion du choix de l'assurance avec mise à jour de l'information + mise à jour des prix unitaire et tot. */
function choixAssurance(event){

  let id_radio = event.target.id;

  if (id_radio=="chk-assurance-totale"){

    document.getElementById("opt-assur-1").style.display = "flex";
    document.getElementById("opt-assur-2").style.display = "none";
    document.getElementById("opt-assur-3").style.display = "none";

    prix_assurance = document.getElementById("prix-assurance-totale").innerText.split("€")[0];

    montant_reduction = Math.round(((Number.parseFloat(prix_chambre_base)+Number.parseFloat(prix_assurance)
                        +Number.parseFloat(prix_transport))*pourc_reduction/100)*100)/100

    document.getElementById("prix").innerText = Math.round((Number.parseFloat(prix_chambre_base)+Number.parseFloat(prix_assurance)
                                                +Number.parseFloat(prix_transport)-Number.parseFloat(montant_reduction))*100)/100 + " €";

    document.getElementById("prix-tot").innerText = Math.round((Number.parseFloat(prix_chambre_base)+Number.parseFloat(prix_assurance)
                                                    +Number.parseFloat(prix_transport)-Number.parseFloat(montant_reduction))*quantite_passager*100)/100 + " €";

  } else if(id_radio=="chk-assurance-annul"){

    document.getElementById("opt-assur-1").style.display = "none";
    document.getElementById("opt-assur-2").style.display = "flex";
    document.getElementById("opt-assur-3").style.display = "none";

    prix_assurance = document.getElementById("prix-assurance-annul").innerText.split("€")[0];

    montant_reduction = Math.round(((Number.parseFloat(prix_chambre_base)+Number.parseFloat(prix_assurance)
                        +Number.parseFloat(prix_transport))*pourc_reduction/100)*100)/100

    document.getElementById("prix").innerText = Math.round((Number.parseFloat(prix_chambre_base)+Number.parseFloat(prix_assurance)
                                                +Number.parseFloat(prix_transport)-Number.parseFloat(montant_reduction))*100)/100 + " €";

    document.getElementById("prix-tot").innerText = Math.round((Number.parseFloat(prix_chambre_base)+Number.parseFloat(prix_assurance)
                                                    +Number.parseFloat(prix_transport)-Number.parseFloat(montant_reduction))*quantite_passager*100)/100 + " €";

  } else if(id_radio=="chk-assurance-none"){

    document.getElementById("opt-assur-1").style.display = "none";
    document.getElementById("opt-assur-2").style.display = "none";
    document.getElementById("opt-assur-3").style.display = "flex";

    prix_assurance = 0;

    montant_reduction = Math.round(((Number.parseFloat(prix_chambre_base)+Number.parseFloat(prix_assurance)
                        +Number.parseFloat(prix_transport))*pourc_reduction/100)*100)/100

    document.getElementById("prix").innerText = Math.round((Number.parseFloat(prix_chambre_base)+Number.parseFloat(prix_assurance)
                                                +Number.parseFloat(prix_transport)-Number.parseFloat(montant_reduction))*100)/100 + " €";

    document.getElementById("prix-tot").innerText = Math.round((Number.parseFloat(prix_chambre_base)+Number.parseFloat(prix_assurance)
                                                    +Number.parseFloat(prix_transport)-Number.parseFloat(montant_reduction))*quantite_passager*100)/100 + " €";

  }

}


/* fonction de gestion du choix du transport de transfert depuis l'aéroport avec mise à jour de l'information + mise à jour des prix unitaire et tot. */
function choixTransport(event){

  let id_check = event.target.id;

  if (document.getElementById(id_check).checked === true){

    if (id_check == "chk-trsp-commun"){

      document.getElementById("opt-transport").style.display = "block";
      document.getElementById("opt-trsp-1").style.display = "flex";
      document.getElementById("opt-trsp-2").style.display = "none";
      document.getElementById("opt-trsp-3").style.display = "none";

      document.getElementById("chk-trsp-standard").checked = false;
      document.getElementById("chk-trsp-premium").checked = false;

      prix_transport = Number.parseFloat(document.getElementById("prix-trsp-commun").innerText.split("€")[0]);

      montant_reduction = Math.round(((Number.parseFloat(prix_chambre_base)+Number.parseFloat(prix_assurance)
                          +Number.parseFloat(prix_transport))*pourc_reduction/100)*100)/100

      document.getElementById("prix").innerText = Math.round((Number.parseFloat(prix_chambre_base)+Number.parseFloat(prix_assurance)
                                                  +Number.parseFloat(prix_transport)-Number.parseFloat(montant_reduction))*100)/100 + " €";

      document.getElementById("prix-tot").innerText = Math.round((Number.parseFloat(prix_chambre_base)+Number.parseFloat(prix_assurance)
                                                      +Number.parseFloat(prix_transport)-Number.parseFloat(montant_reduction))*quantite_passager*100)/100 + " €";


    } else if (id_check == "chk-trsp-standard"){

      document.getElementById("opt-transport").style.display = "block";
      document.getElementById("opt-trsp-1").style.display = "none";
      document.getElementById("opt-trsp-2").style.display = "flex";
      document.getElementById("opt-trsp-3").style.display = "none";

      document.getElementById("chk-trsp-commun").checked = false;
      document.getElementById("chk-trsp-premium").checked = false;

      prix_transport = Number.parseFloat(document.getElementById("prix-trsp-standard").innerText.split("€")[0]);

      montant_reduction = Math.round(((Number.parseFloat(prix_chambre_base)+Number.parseFloat(prix_assurance)
                          +Number.parseFloat(prix_transport))*pourc_reduction/100)*100)/100

      document.getElementById("prix").innerText = Math.round((Number.parseFloat(prix_chambre_base)+Number.parseFloat(prix_assurance)
                                                  +Number.parseFloat(prix_transport)-Number.parseFloat(montant_reduction))*100)/100 + " €";

      document.getElementById("prix-tot").innerText = Math.round((Number.parseFloat(prix_chambre_base)+Number.parseFloat(prix_assurance)
                                                      +Number.parseFloat(prix_transport)-Number.parseFloat(montant_reduction))*quantite_passager*100)/100 + " €";

    } else if (id_check == "chk-trsp-premium"){

      document.getElementById("opt-transport").style.display = "block";
      document.getElementById("opt-trsp-1").style.display = "none";
      document.getElementById("opt-trsp-2").style.display = "none";
      document.getElementById("opt-trsp-3").style.display = "flex";

      document.getElementById("chk-trsp-commun").checked = false;
      document.getElementById("chk-trsp-standard").checked = false;

      prix_transport = document.getElementById("prix-trsp-premium").innerText.split("€")[0];

      montant_reduction = Math.round(((Number.parseFloat(prix_chambre_base)+Number.parseFloat(prix_assurance)
                          +Number.parseFloat(prix_transport))*pourc_reduction/100)*100)/100

      document.getElementById("prix").innerText = Math.round((Number.parseFloat(prix_chambre_base)+Number.parseFloat(prix_assurance)
                                                  +Number.parseFloat(prix_transport)-Number.parseFloat(montant_reduction))*100)/100 + " €";

      document.getElementById("prix-tot").innerText = Math.round((Number.parseFloat(prix_chambre_base)+Number.parseFloat(prix_assurance)
                                                      +Number.parseFloat(prix_transport)-Number.parseFloat(montant_reduction))*quantite_passager*100)/100 + " €";

    }

  } else {

    prix_transport = 0;
    document.getElementById("opt-transport").style.display = "none";
    document.getElementById("opt-trsp-1").style.display = "none";
    document.getElementById("opt-trsp-2").style.display = "none";
    document.getElementById("opt-trsp-3").style.display = "none";

    montant_reduction = Math.round(((Number.parseFloat(prix_chambre_base)+Number.parseFloat(prix_assurance)
                        +Number.parseFloat(prix_transport))*pourc_reduction/100)*100)/100

    document.getElementById("prix").innerText = Math.round((Number.parseFloat(prix_chambre_base)+Number.parseFloat(prix_assurance)
                                                +Number.parseFloat(prix_transport)-Number.parseFloat(montant_reduction))*100)/100 + " €";

    document.getElementById("prix-tot").innerText = Math.round((Number.parseFloat(prix_chambre_base)+Number.parseFloat(prix_assurance)
                                                    +Number.parseFloat(prix_transport)-Number.parseFloat(montant_reduction))*quantite_passager*100)/100 + " €";

  }

}


/* Fonction de calcul et d'application d'un éventuel code de réduction */
function changementReduc(){

  let code = document.getElementById("code-reduction").value;
  let code_reduc = code.toUpperCase();

  if (code_reduc == "ACS2022"){

    pourc_reduction = 15;
    montant_reduction = Math.round(((Number.parseFloat(prix_chambre_base)+Number.parseFloat(prix_assurance)
                        +Number.parseFloat(prix_transport))*pourc_reduction/100)*100)/100

    document.getElementById("prix").innerText = Math.round((Number.parseFloat(prix_chambre_base)+Number.parseFloat(prix_assurance)
                        +Number.parseFloat(prix_transport)-Number.parseFloat(montant_reduction))*100)/100 + " €";

    document.getElementById("prix-tot").innerText = Math.round((Number.parseFloat(prix_chambre_base)+Number.parseFloat(prix_assurance)
                            +Number.parseFloat(prix_transport)-Number.parseFloat(montant_reduction))*quantite_passager*100)/100 + " €";

    document.getElementById("opt-reduction").style.display = "block";
    document.getElementById("pourcentage-reduc").innerText = "15%";
    document.getElementById("opt-code-reduction").innerText = code_reduc;

  } else {

    pourc_reduction = 0;
    montant_reduction = 0;
    document.getElementById("opt-reduction").style.display = "none";
    document.getElementById("pourcentage-reduc").innerText = "";
    document.getElementById("opt-code-reduction").innerText = "";

  }

}


/* Retour page précédente */
function changementPageArr(){

  window.location.href = getCookie("page_prec");

}