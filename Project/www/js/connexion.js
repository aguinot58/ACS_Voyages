function connexion() {
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;

    if((login.toLowerCase() == "pctronique" && password.toLowerCase() == "secret") || 
    (login.toLowerCase() == "aguinot58" && password.toLowerCase() == "secret")) {
        document.location.href="./back_office.html";
    } else {
        alert("Erreur de connexion");
    }
}