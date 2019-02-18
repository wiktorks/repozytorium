function submitLogin() {
    let logData = document.getElementById("logger").elements;
    let login = logData[0].value;
    let passwd = logData[1].value;

    if(login && passwd) {
        let logDataJSON = {
            login: login,
            passwd: passwd
        }
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if(xhttp.readyState === 4){
                if(xhttp.status === 402) {
                    alert(xhttp.response);
                } else if(xhttp.status === 200) {
                    let json = JSON.parse(xhttp.response)
                    alert(json.url);
                    window.location.replace(json.url);
                }
            }
        }
        xhttp.open('POST', '/', true);
        xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        xhttp.send(JSON.stringify(logDataJSON));
    }
}

function registerUser() {
    let logData = document.getElementById("register").elements;
    let login = logData[0].value;
    let passwd = logData[1].value;
    let confirm = logData[2].value;
    if(login && passwd && confirm &&(passwd.localeCompare(confirm) === 0)) {
        let logDataJSON = {
            login: login,
            passwd: passwd
        }
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if(xhttp.readyState === 4){
                if(xhttp.status === 402) {
                    alert(xhttp.response);
                } else if(xhttp.status === 200) {
                    let json = JSON.parse(xhttp.response)
                    window.location.replace(json.url);
                    alert(json.resp);
                }
            }
        }
        xhttp.open('POST', '/register', true);
        xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        xhttp.send(JSON.stringify(logDataJSON));
    }
}