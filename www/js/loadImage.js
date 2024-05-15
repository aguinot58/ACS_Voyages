
function load_cookie_photos_voyage() {
    let listImg = [];
    let allValues = ["", []];
    if (document.cookie.length > 0){
        allValues = [];
        let tablecookie = document.cookie.split(';');
        let valeurcookie = "";
        let photoselect = "";
        tablecookie.forEach(function(item0) {
            let nomcookie = "name=photos_acs_voyage";
            if(item0.indexOf(nomcookie) != -1){
                let valuescookie = item0.split('=>');
                valuescookie.forEach(function(item1) {
                    let data = item1.split('=', 2);
                    if(data[0] == "photos") {
                        valeurcookie = item1.split('=', 2)[1];
                    } else if(data[0] == "photo_select") {
                        photoselect = item1.split('=', 2)[1];
                    }
                });
            }
        });

        const obj = JSON.parse(valeurcookie.split(";")[0]);
        obj.forEach(function(item0) {
            listImg.push(item0);
        });

        allValues.push(photoselect);
        allValues.push(listImg);
    }
    return allValues;
}

function create_click_img() {
    let all_imgs = document.getElementById('all_imgs').querySelectorAll('img');
    all_imgs.forEach(function(item) {
        item.addEventListener('click', function(e) {
            document.getElementById('img_display').src = e.target.src;
        });
    });
}

function create_page() {
    document.getElementById('img_main').innerHTML = "";
    document.getElementById('all_imgs').innerHTML = "";

    let listImg = load_cookie_photos_voyage();
    document.getElementById('img_main').innerHTML = '<img id="img_display" src="'+listImg[0]+'" alt="" />';
    listImg[1].forEach(element => {
        document.getElementById('all_imgs').innerHTML += '<img src="'+element+'" alt="" />';
    });

    create_click_img();
}

create_page();
