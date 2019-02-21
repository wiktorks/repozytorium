function extend() {
    let nav = document.getElementById("menu");
    let article = document.getElementById("content");
    nav.classList.toggle("extended");
    article.classList.toggle("extended");
}

$(document).ready(function () {
    $("#menu-sub").hide();
    $("#drop").click(function () {
        menu = document.getElementById("menu");
        if (menu.classList.contains("extended")) {
            $("#menu-sub").slideToggle();
        }
    });
});

function getProperName(name) {
    if (name === 'Repozytorium') {
        return '';
    } else {
        return 'favourites';
    }
}

function toTrash(data) {
    data.title = getProperName(data.title);
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {
            if (xhttp.status === 402) {
                alert(xhttp.response);
            } else if (xhttp.status === 200) {
                let json = JSON.parse(xhttp.response)
                window.location.replace(json.url);
            }
        }
    }
    var url = '/users/' + data.userId + '/trash';
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhttp.send(JSON.stringify(data));
}

function toDownload(idFile, idUser) {
    alert("idFile do pobrania: " + idFile + ", user: " + idUser);
}

function toFavourite(data) {
    data.title = getProperName(data.title);
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {
            if (xhttp.status === 402) {
                alert(xhttp.response);
            } else if (xhttp.status === 200) {
                let json = JSON.parse(xhttp.response)
                window.location.replace(json.url);
            }
        }
    }
    var url = '/users/' + data.userId + '/favourites';
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhttp.send(JSON.stringify(data));
}

function toRecover(data) {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {
            if (xhttp.status === 402) {
                alert(xhttp.response);
            } else if (xhttp.status === 200) {
                let json = JSON.parse(xhttp.response)
                window.location.replace(json.url);
            }
        }
    }
    var url = '/users/' + data.userId + '/trash/recover';
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhttp.send(JSON.stringify(data));
}

function toDelete(data) {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {
            if (xhttp.status === 402) {
                alert(xhttp.response);
            } else if (xhttp.status === 200) {
                let json = JSON.parse(xhttp.response)
                window.location.replace(json.url);
            }
        }
    }
    var url = '/users/' + data.userId + '/trash/delete';
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhttp.send(JSON.stringify(data));
}