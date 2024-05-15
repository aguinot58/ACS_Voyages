/* start drag drop pour le contenue */
var dragSrcEl = null;

function handleDragStart(e) {
  this.style.opacity = "0.4";

  dragSrcEl = this;

  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }

  e.dataTransfer.dropEffect = "move";

  return false;
}

function handleDragEnter(e) {
  this.classList.add("over");
}

function handleDragLeave(e) {
  this.classList.remove("over");
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
  }

  form_down_up_contenu_click();

  return false;
}

function handleDragEnd(e) {
  this.style.opacity = "1";

  let items = document.querySelectorAll(".drag_contenu");
  items.forEach(function (item) {
    item.classList.remove("over");
  });
}
/* end drag drop pour le contenue */

/* start drag drop pour l'image' */
var dragSrcElImg = null;

function handleDragImgStart(e) {
  this.style.opacity = "0.4";

  dragSrcElImg = e.target;

  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text", e.target.id);
}

function handleDragImgOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }

  e.dataTransfer.dropEffect = "move";

  return false;
}

function handleDragImgEnter(e) {
  this.classList.add("over");
}

function handleDragImgLeave(e) {
  this.classList.remove("over");
}

function handleDropImg(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (dragSrcElImg != this) {
    let src = document.getElementById(e.dataTransfer.getData("text")).src;
    let file = document.getElementById(e.dataTransfer.getData("text")).file;
    dragSrcElImg.src = e.target.src;
    dragSrcElImg.file = e.target.file;
    e.target.src = src;
    e.target.file = file;
  }

  return false;
}

function handleDragImgEnd(e) {
  this.style.opacity = "1";

  let items = document.querySelectorAll(".drag_contenu");
  items.forEach(function (item) {
    item.classList.remove("over");
  });
}
/* end drag drop pour l'image */

/* activation du drag drop pour le contenus */
function allDragDropContenu() {
  let items = document.querySelectorAll(".drop_contenu .drag_contenu");
  items.forEach(function (item) {
    item.addEventListener("dragstart", handleDragStart, false);
    item.addEventListener("dragenter", handleDragEnter, false);
    item.addEventListener("dragover", handleDragOver, false);
    item.addEventListener("dragleave", handleDragLeave, false);
    item.addEventListener("drop", handleDrop, false);
    item.addEventListener("dragend", handleDragEnd, false);
  });
}

/* activation du drag drop pour les images */
function allDragDropImg() {
  let items = document.querySelectorAll(".drop_img .drag_img");
  items.forEach(function (item) {
    item.addEventListener("dragstart", handleDragImgStart, false);
    item.addEventListener("dragenter", handleDragImgEnter, false);
    item.addEventListener("dragover", handleDragImgOver, false);
    item.addEventListener("dragleave", handleDragImgLeave, false);
    item.addEventListener("drop", handleDropImg, false);
    item.addEventListener("dragend", handleDragImgEnd, false);
  });
}
