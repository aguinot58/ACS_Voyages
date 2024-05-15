/* verifier la validite du mot de passe */
function connexion() {
  let login = document.getElementById("login").value;
  let password = document.getElementById("password").value;

  if (
    (login.toLowerCase() == "pctronique" &&
      password.toLowerCase() == "secret") ||
    (login.toLowerCase() == "aguinot58" && password.toLowerCase() == "secret") ||
    (login.toLowerCase() == "root" && password.toLowerCase() == "secret")
  ) {
    document.location.href = "./back_office.html";
  } else {
    alert("Erreur de connexion");
  }
}

/* pour faire une validation de connexion avec la touche entree */
document.addEventListener(
  "keydown",
  (event) => {
    var name = new String(event.key);
    if(name.toLowerCase() ==  "enter") {
        connexion();
    }
  },
  false
);
