function popupWindow(url, windowName, win, w, h) {
    const y = win.top.outerHeight / 2 + win.top.screenY - ( h / 2);
    const x = win.top.outerWidth / 2 + win.top.screenX - ( w / 2);
    return win.open(url, windowName, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
}

function openImg(e) {
    if(screen.width > 1024) {
        let listImg = [];
        if(e.target.id.startsWith("chambre")) {
            let id_img_chambre = e.target.id.split("-")[0];
            let conteneur_imgs = document.querySelectorAll('.conteneur-photos-chambre');
            conteneur_imgs.forEach(function(item0) {
                let all_imgs = item0.querySelectorAll('img');
                all_imgs.forEach(function(item) {
                    if(id_img_chambre == item.id.split("-")[0]) {
                        listImg.push(item.src);
                    }
                });
            });
        } else {
            let all_imgs = document.getElementById('photos-presentation').querySelectorAll('img');
            all_imgs.forEach(function(item) {
                listImg.push(item.src);
            });
        }
        let myJsonString = JSON.stringify(listImg);
        document.cookie = 'name=photos_acs_voyage; expires=Mon, 02 Oct 2000 01:00:00 GMT; path=/';
        document.cookie = 'name=photos_acs_voyage=>photo_select='+e.target.src+'=>photos='+myJsonString;

        popupWindow("./loadImage.html", "NomDeFenetreDescriptif", window, 1024, 900);
    }
}

let conteneur_imgs = document.querySelectorAll('.conteneur-photos-chambre');
conteneur_imgs.forEach(function(item0) {
    let all_imgs = item0.querySelectorAll('img');
    all_imgs.forEach(function(item) {
        item.addEventListener('click', openImg);
    });
});

let all_imgs = document.getElementById('photos-presentation').querySelectorAll('img');
all_imgs.forEach(function(item) {
    item.addEventListener('click', openImg);
});