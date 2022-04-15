function remplace_title(text) {
    return text.replaceAll("#voyage_title#", document.getElementById("titre-page").value);
}

function remplace_pourcentage(text) {
    let value = document.getElementById("pourcentage-page").value;
    let display_pour = "";
    if(value < 0) {
        display_pour = '<figure class="pourcentage"><p>'+value+'%</p></figure>';
    }
    return text.replaceAll("#voyage_pourcentage#", display_pour);
}


async function loadtext(doc) {
    let htmlPage = "<!DOCTYPE html>"+"\n";
    htmlPage += doc.documentElement.outerHTML;

    htmlPage = remplace_title(htmlPage);
    htmlPage = remplace_pourcentage(htmlPage);
    //console.log(htmlPage);

    console.log(htmlPage);
    // On ajoute un type MIME pertinent
    var blob = new Blob([htmlPage], { type: "text/html" });
    blob.name = "testing";
    var file = new File([blob], "name");
    const blobUrl = URL.createObjectURL(blob);

    // create <a> tag dinamically
    var fileLink = document.createElement('a');
    fileLink.href = blobUrl;

    // it forces the name of the downloaded file
    fileLink.download = 'new_file_'+Date.now();

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