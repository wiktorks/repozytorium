function extend(){
    let nav = document.getElementById("menu");
    let article = document.getElementById("content");
    nav.classList.toggle("extended");
    article.classList.toggle("extended");
}

$(document).ready(function(){
    $("#drop").click(function(){
        menu = document.getElementById("menu");
        if(menu.classList.contains("extended")) {
            $("#menu-sub").slideToggle();
        }
    });
  });

function toTrash(idFile){
    alert("idFile do śmieci: " + idFile);
}

function toDownload(idFile) {
    alert("idFile do pobrania: " + idFile);
}

function toFavourite(idFile) {
    alert("idFile do ulubionych: " + idFile);
}
