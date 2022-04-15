/*
Entrer le texte sous format html et remplacer "#voyage_title#" par le titre
text (String) : texte sous format html
return (string) : texte modifier
*/
function remplace_title(text) {
    return text.replaceAll("#voyage_title#", document.getElementById("titre-page").value);
}

/*
Entrer le texte sous format html et remplacer "#voyage_pourcentage#" par le pourcentage
text (String) : texte sous format html
return (string) : texte modifier
*/
function remplace_pourcentage(text) {
    let value = document.getElementById("pourcentage-page").value;
    let display_pour = "";
    if(value < 0) {
        display_pour = '<figure class="pourcentage"><p>'+value+'%</p></figure>';
    }
    return text.replaceAll("#voyage_pourcentage#", display_pour);
}

/*
Entrer le texte sous format html et remplacer "#voyage_pourcentage#" par le pourcentage
id (String) : qui contient les images
return (array) : les "src" des images
*/
function loadImgFile(id) {
    let arrayImg = [];
    console.log("001");
    let imgs = document.getElementById(id).querySelectorAll('img');
    imgs.forEach(function(imgLoad) {
        console.log("002");
        if(!imgLoad.id.startsWith("delete_img_")) {
            let srcImg = imgLoad.src;
            if(imgLoad.file != undefined) {
                console.log("../data/images/" + imgLoad.file.name);
                srcImg = "../data/images/" + imgLoad.file.name;
            }
            console.log(srcImg);
            arrayImg.push(srcImg);
        }
    });
    return arrayImg;
}

function remplace_image_general(text) {
    let arrayImgs = loadImgFile('add_img');

    let i = 0;
    arrayImgs.forEach(function(imgSrc) {
        if(i == 0) {
            text = text.replaceAll("#voyage_gde-photo#", '<img src="'+imgSrc+'" alt="" />');
        } else {
            text = text.replaceAll("#voyage_voyage-slide"+i+"#", '<img src="'+imgSrc+'" id="voyage-slide'+i+'" class="img-slide-presentation" alt="" />');
        }
        i++;
    });
    text = text.replaceAll("#voyage_gde-photo#", '');
    text = text.replaceAll("#voyage_voyage-slide1#", '');
    text = text.replaceAll("#voyage_voyage-slide2#", '');
    text = text.replaceAll("#voyage_voyage-slide3#", '');
    text = text.replaceAll("#voyage_voyage-slide4#", '');
    return text;
}

/*
Entrer le texte sous format html et remplacer "#voyage_type#" par le type du voyage
text (String) : texte sous format html
return (string) : texte modifier
*/
function remplace_type_voyage(text) {
    let value_type = document.getElementById('type-transport').value;
    let add_type = "Vols";
    if(value_type == "train") {
        add_type = "Trains";
    } else if(value_type == "croisiere") {
        add_type = "Transports";
    }
    return text.replaceAll("#voyage_type#", add_type);
}


async function loadtext(doc) {
    let htmlPage = "<!DOCTYPE html>"+"\n";

    htmlPage += doc.documentElement.outerHTML;

    htmlPage = remplace_title(htmlPage);
    htmlPage = remplace_pourcentage(htmlPage);
    htmlPage = remplace_image_general(htmlPage);


    
    htmlPage = remplace_type_voyage(htmlPage);

    // On ajoute un type MIME pertinent
    var blob = new Blob([htmlPage], { type: "text/html" });
    const blobUrl = URL.createObjectURL(blob);

    // create <a> tag dinamically
    var fileLink = document.createElement('a');
    fileLink.href = blobUrl;

    // it forces the name of the downloaded file
    fileLink.download = 'new_file_'+Date.now()+".html";

    // triggers the click event
    fileLink.click();
}

async function saveFile() {

        /*const formData = new FormData();
    const photos = document.querySelector('input[type="file"]');

    formData.append('title', 'My Vegas Vacation');
    for (let i = 0; i < photos.files.length; i++) {
        formData.append(`photos_${i}`, photos.files[i]);
    }
    console.log(formData);*/
    loadHTMLDefault("./page_default.html");
    
}


let itemsValider = document.querySelectorAll('.valider');
itemsValider.forEach(function(item) {
    item.addEventListener('click', saveFile);
});