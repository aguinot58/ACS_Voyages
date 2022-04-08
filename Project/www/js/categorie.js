let valueOption = 0;
let option_mobile = false;

function option_selected() {
    option_mobile = true;
    let items = document.querySelectorAll('.block_option');
    items.forEach(function(item) {
        item.style.display = "none";
        if(Number.parseInt(item.id.split("_")[1]) == valueOption) {
            item.style.display = "block";
        }
    });
}

function option_next() {
    valueOption++;
    if(valueOption > 3) {
        valueOption = 0;
    }
    option_selected();
}

function option_previous() {
    valueOption--;
    if(valueOption < 0) {
        valueOption = 3;
    }
    option_selected();
}

function resize_window() {
    let items = document.querySelectorAll('.block_option');
    if(window.innerWidth >= 655 && option_mobile) {
        option_mobile = false;
        items.forEach(function(item) {
            item.style.display = "block";
        });
    } else if(window.innerWidth < 655 && !option_mobile) {
        option_mobile = false;
        option_selected();
    }
}

document.getElementById('option_next').addEventListener('click', option_next);
document.getElementById('option_previous').addEventListener('click', option_previous);

window.addEventListener('resize', resize_window);