/* les fonctions afficher() et masquer() servent à afficher/masquer les informations générales de l'hôtel */
function afficher(){

    document.getElementById('info-gener-petit').style.display = "none";
    document.getElementById('info-gener-grand').style.display = "block";

}

function masquer(){

    document.getElementById('info-gener-petit').style.display = "block";
    document.getElementById('info-gener-grand').style.display = "none";

}



/* système pour afficher / masquer les détails de la chambre 1 */
let afficheDetailsCh1 = false;

document.getElementById('parag-aff-masq-details').addEventListener('click', afficherDetCh1);

function afficherDetCh1(){

    if (afficheDetailsCh1 == false){

        document.getElementById('lstDetCh1').style.display = "flex";
        document.getElementById('parag-aff-masq-details').innerText = "Masquer les détails"
        afficheDetailsCh1 = true;

    } else {

        document.getElementById('lstDetCh1').style.display = "none";
        document.getElementById('parag-aff-masq-details').innerText = "Voir plus de détails"
        afficheDetailsCh1 = false;

    }
}

/* système pour afficher / masquer les détails de la chambre 1 */
let afficheDetailsCh2 = false;

document.getElementById('parag-aff-masq-details2').addEventListener('click', afficherDetCh2);

function afficherDetCh2(){

    if (afficheDetailsCh2 == false){

        document.getElementById('lstDetCh2').style.display = "flex";
        document.getElementById('parag-aff-masq-details2').innerText = "Masquer les détails"
        afficheDetailsCh2 = true;

    } else {

        document.getElementById('lstDetCh2').style.display = "none";
        document.getElementById('parag-aff-masq-details2').innerText = "Voir plus de détails"
        afficheDetailsCh2 = false;

    }
}


/* Système pour afficher et masquer les sections des services avec plus d'une ligne */
/* Services mesures Covid-19 */
let flecheUpCovid = false;

document.getElementById('arrow_up_svg__stroke-cov').addEventListener('click', afficherCovidUp); 

function afficherCovidUp(){

    if (flecheUpCovid == false){

        document.getElementById('arrow_up_svg__stroke-cov').style.transform = 'rotate(360deg)';
        document.getElementById('service-covid').style.maxHeight = '850px';
        document.getElementById('service-covid').style.overflow = 'visible';
        flecheUpCovid = true;

    } else {

        let hauteur = document.getElementById('hauteur-covid').offsetHeight

        document.getElementById('arrow_up_svg__stroke-cov').style.transform = 'rotate(180deg)';
        document.getElementById('service-covid').style.maxHeight = (hauteur+15)+'px';
        document.getElementById('service-covid').style.overflow = 'hidden';
        flecheUpCovid = false;

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

        let hauteur = document.getElementById('hauteur-internet').offsetHeight

        document.getElementById('arrow_up_svg__stroke-net').style.transform = 'rotate(180deg)';
        document.getElementById('service-internet').style.maxHeight = (hauteur+15)+'px';
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

        let hauteur = document.getElementById('hauteur-resto').offsetHeight
        /*let largeurSection = screen.width;

        if (largeurSection <= 732) {

            hauteur = 50;

        }*/

        document.getElementById('arrow_up_svg__stroke-rest').style.transform = 'rotate(180deg)';
        document.getElementById('service-resto').style.maxHeight = (hauteur+15)+'px';
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

        let hauteur = document.getElementById('hauteur-activite').offsetHeight

        let largeurSection = screen.width;

        if (largeurSection <= 612) {

            hauteur = 20;

        }

        document.getElementById('arrow_up_svg__stroke-act').style.transform = 'rotate(180deg)';
        document.getElementById('service-activite').style.maxHeight = (hauteur+15)+'px';
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

        let hauteur = document.getElementById('hauteur-general').offsetHeight;
        let largeurSection = screen.width;

        if (largeurSection <= 612) {

            hauteur = 35;

        } else if (largeurSection <= 732){

            hauteur = 50;

        }

        document.getElementById('arrow_up_svg__stroke-gen').style.transform = 'rotate(180deg)';
        document.getElementById('service-general').style.maxHeight = (hauteur+15)+'px';
        document.getElementById('service-general').style.overflow = 'hidden';
        flecheGenNet = true;

    }
}



/* Slider petites photos section présentation */
let numero = 0;
const elements = document.querySelectorAll(".img-slide-presentation");

function ChangeSlide(sens) {

    numero = numero + sens;
    if (numero < 0)
        numero = elements.length - 1;
    if (numero > elements.length - 1)
        numero = 0;
    
    elements.forEach((item, index) => {

        let imgId = item.id;

        if (index == numero){

            document.getElementById(imgId).style.opacity = 1;

        } else {

            document.getElementById(imgId).style.opacity = 0;

        }
    });
}



/* Slider photos chambre 1 */
let numeroChambre1 = 0;
const elementsChambre1 = document.querySelectorAll(".img-slide-chambre1");

function ChangeSlideChambre1(sens) {

    numeroChambre1 = numeroChambre1 + sens;
    if (numeroChambre1 < 0)
        numeroChambre1 = elementsChambre1.length - 1;
    if (numeroChambre1 > elementsChambre1.length - 1)
        numeroChambre1 = 0;
    
        elementsChambre1.forEach((item, index) => {

        let imgIdChambre1 = item.id;

        if (index == numeroChambre1){

            document.getElementById(imgIdChambre1).style.opacity = 1;

        } else {

            document.getElementById(imgIdChambre1).style.opacity = 0;

        }
    });
}



/* Slider photos chambre 2 */
let numeroChambre2 = 0;
const elementsChambre2 = document.querySelectorAll(".img-slide-chambre2");

function ChangeSlideChambre2(sens) {

    numeroChambre2 = numeroChambre2 + sens;
    if (numeroChambre2 < 0)
        numeroChambre2 = elementsChambre2.length - 1;
    if (numeroChambre2 > elementsChambre2.length - 1)
        numeroChambre2 = 0;
    
        elementsChambre2.forEach((item, index) => {

        let imgIdChambre2 = item.id;

        if (index == numeroChambre2){

            document.getElementById(imgIdChambre2).style.opacity = 1;

        } else {

            document.getElementById(imgIdChambre2).style.opacity = 0;

        }
    });
}


/* Remise de l'opacité à 1 sur les photos des chambres si taille écran >= 657px */
function resize_window() {

    let tailleEcran = screen.width;
    const elements = document.querySelectorAll(".img-slide-presentation");
    const elementsChambre1 = document.querySelectorAll(".img-slide-chambre1");
    const elementsChambre2 = document.querySelectorAll(".img-slide-chambre2");

    if (tailleEcran >= 657) {

        elements.forEach(item => {

            document.getElementById(item.id).style.opacity = 1;
    
        });

        elementsChambre1.forEach(item => {

            document.getElementById(item.id).style.opacity = 1;
    
        });
    
        elementsChambre2.forEach(item => {
    
            document.getElementById(item.id).style.opacity = 1;
    
        });

    }

}

window.addEventListener('resize', resize_window);