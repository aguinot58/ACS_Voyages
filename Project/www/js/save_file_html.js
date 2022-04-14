async function loadtext(doc) {
    // create a new handle
    const newHandle = await window.showSaveFilePicker();
    
    // create a FileSystemWritableFileStream to write to
    const writableStream = await newHandle.createWritable();

    // ecrire le doctype de la page html
    await writableStream.write("<!DOCTYPE html>");

    // ecrire le contenu de la page html lu sur le serveur
    await writableStream.write(doc.documentElement.outerHTML);

    // enregistrer sur le disque dur.
    await writableStream.close();
}

async function saveFile() {

        /*const formData = new FormData();
    const photos = document.querySelector('input[type="file"]');

    formData.append('title', 'My Vegas Vacation');
    for (let i = 0; i < photos.files.length; i++) {
        formData.append(`photos_${i}`, photos.files[i]);
    }
    console.log(formData);*/
    loadHTMLDefault("./vol_solPalmanova_test.html");
    
}


let itemsValider = document.querySelectorAll('.valider');
itemsValider.forEach(function(item) {
    item.addEventListener('click', saveFile);
});