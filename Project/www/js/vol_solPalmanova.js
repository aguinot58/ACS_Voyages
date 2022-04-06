/* les fonctions afficher() et masquer() servent à afficher/masquer les informations générales de l'hôtel */
function afficher(){

    document.getElementById('info-gener-petit').style.display = "none";
    document.getElementById('info-gener-grand').style.display = "block";

}

function masquer(){

    document.getElementById('info-gener-petit').style.display = "block";
    document.getElementById('info-gener-grand').style.display = "none";

}


/* Système pour afficher et masquer les sections des services avec plus d'une ligne */

/* Services mesures Covid-19 */
let flecheUpCovid = true;

document.getElementById('arrow_up_svg__stroke-cov').addEventListener('click', afficherCovidUp); 

function afficherCovidUp(){

    if (flecheUpCovid == true){

        document.getElementById('arrow_up_svg__stroke-cov').style.transform = 'rotate(360deg)';
        document.getElementById('service-covid').style.maxHeight = '850px';
        document.getElementById('service-covid').style.overflow = 'visible';
        flecheUpCovid = false;

    } else {

        document.getElementById('arrow_up_svg__stroke-cov').style.transform = 'rotate(180deg)';
        document.getElementById('service-covid').style.maxHeight = '160px';
        document.getElementById('service-covid').style.overflow = 'hidden';
        flecheUpCovid = true;

    }
}

/* Services internet */
let flecheUpNet = true;

document.getElementById('arrow_up_svg__stroke-net').addEventListener('click', afficherNetUp); 

function afficherNetUp(){

    if (flecheUpNet == true){

        document.getElementById('arrow_up_svg__stroke-net').style.transform = 'rotate(360deg)';
        document.getElementById('service-internet').style.maxHeight = '150px';
        document.getElementById('service-internet').style.overflow = 'visible';
        flecheUpNet = false;

    } else {

        document.getElementById('arrow_up_svg__stroke-net').style.transform = 'rotate(180deg)';
        document.getElementById('service-internet').style.maxHeight = '45px';
        document.getElementById('service-internet').style.overflow = 'hidden';
        flecheUpNet = true;

    }
}

/* Services restauration */
let flecheUpResto = true;

document.getElementById('arrow_up_svg__stroke-rest').addEventListener('click', afficherRestoUp); 

function afficherRestoUp(){

    if (flecheUpResto == true){

        document.getElementById('arrow_up_svg__stroke-rest').style.transform = 'rotate(360deg)';
        document.getElementById('service-resto').style.maxHeight = '150px';
        document.getElementById('service-resto').style.overflow = 'visible';
        flecheUpResto = false;

    } else {

        document.getElementById('arrow_up_svg__stroke-rest').style.transform = 'rotate(180deg)';
        document.getElementById('service-resto').style.maxHeight = '60px';
        document.getElementById('service-resto').style.overflow = 'hidden';
        flecheUpResto = true;

    }
}

/* Services activités */
let flecheUpActiv = true;

document.getElementById('arrow_up_svg__stroke-act').addEventListener('click', afficherActivUp); 

function afficherActivUp(){

    if (flecheUpActiv == true){

        document.getElementById('arrow_up_svg__stroke-act').style.transform = 'rotate(360deg)';
        document.getElementById('service-activite').style.maxHeight = '250px';
        document.getElementById('service-activite').style.overflow = 'visible';
        flecheUpActiv = false;

    } else {

        document.getElementById('arrow_up_svg__stroke-act').style.transform = 'rotate(180deg)';
        document.getElementById('service-activite').style.maxHeight = '60px';
        document.getElementById('service-activite').style.overflow = 'hidden';
        flecheUpActiv = true;

    }
}

/* Services généraux */
let flecheGenNet = true;

document.getElementById('arrow_up_svg__stroke-gen').addEventListener('click', afficherGenUp); 

function afficherGenUp(){

    if (flecheGenNet == true){

        document.getElementById('arrow_up_svg__stroke-gen').style.transform = 'rotate(360deg)';
        document.getElementById('service-general').style.maxHeight = '250px';
        document.getElementById('service-general').style.overflow = 'visible';
        flecheGenNet = false;

    } else {

        document.getElementById('arrow_up_svg__stroke-gen').style.transform = 'rotate(180deg)';
        document.getElementById('service-general').style.maxHeight = '45px';
        document.getElementById('service-general').style.overflow = 'hidden';
        flecheGenNet = true;

    }
}