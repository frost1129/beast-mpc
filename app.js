var savedName = new Array("admin");
var savedPass = new Array("12345");
localStorage.setItem("Username", JSON.stringify(savedName));
localStorage.setItem("Password", JSON.stringify(savedPass));


// ---- SIGN-IN
var signIn = document.querySelector(".btn-sign-in");
signIn.addEventListener("click", function() {
    var storedName = JSON.parse(localStorage.getItem("Username"));
    var storedPass = JSON.parse(localStorage.getItem("Password"));

    var usrName = document.querySelector(".usr-name");
    var usrPass = document.querySelector(".usr-pass");

    if (usrName.value.length === 0 || usrPass.value.length === 0) {
        message("Please enter all fields!");
    } else {
        var pos = -1;
        for (var i = 0; i < storedName.length; i++) {
            if (strcmp(usrName.value, storedName[i]) === 0) {
                pos = i;
                break;
            }
        }
        if (pos === -1) {
            message("Username not exists!")
        } else if (strcmp(usrPass.value, storedPass[pos]) != 0) {
            message("Password not match!");
        } else {
            // to the main page
        }

    }

})

// ---- SIGN-UP
var signUp = document.querySelector(".btn-sign-up");
signUp.addEventListener("click", function() {
    var storedName = JSON.parse(localStorage.getItem("Username"));
    var storedPass = JSON.parse(localStorage.getItem("Password"));

    var inpName = document.querySelector(".crt-name");
    var inpPass = document.querySelector(".crt-pass");
    var inpConf = document.querySelector(".crt-pass-conf");

    if (inpName.value.length === 0 || inpPass.value.length === 0 || inpConf.value.length === 0) {
        message("Please enter all fields!");
    } else {
        var actionCode = 0;
        for (var i = 0; i < storedName.length; i++) {
            if (strcmp(inpName.value, storedName[i]) === 0) {
                message("User name already exists!")
                actionCode = -1;
                break;
            }
        }

        if (actionCode != -1) {
            if (strcmp(inpPass.value, inpConf.value) != 0) {
                message("Confirm password not match!");
            } else {
                storedName.push(inpName.value);
                storedPass.push(inpPass.value);

                localStorage.setItem("Username", JSON.stringify(storedName));
                localStorage.setItem("Password", JSON.stringify(storedPass));
            }
        }
    }
})


function message(mess) {
    const main = document.querySelector(".message");
    if (main) {
        var duration = 3000;
        const message = document.createElement("div");
        message.className = "message-box";
        const delay = (duration / 1000).toFixed(2);

        //Auto remove message
        const autoRemove = setTimeout(function() {
            main.removeChild(message);
        }, duration + 1000);

        //Remove message when clicked
        message.onclick = function(e) {
            if (e.target.closest(".message-close")) {
                main.removeChild(message);
                clearTimeout(autoRemove);
            }
        };

        message.style.animation = `slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`;
        message.innerHTML = `
            <div class="message--icon">
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <div class="message--body">
                <h3 class="message-title">"Error!"</h3>
                <p class="message-mess">${mess}</p>
            </div>
            <div class="message--close">
                <i class="fas fa-times"></i>
            </div>
        `;
        main.appendChild(message);
    }
}

function showError(){
    message("Some kind of error");
}

// sign-in slide
var toCreate = document.querySelector(".to-create");
var toLogin = document.querySelector(".to-login");

toCreate.addEventListener("click", function() {
    document.querySelector(".black-box").classList.add("to-create");
    document.querySelector(".sign-in").classList.add("not-active");
    document.querySelector(".sign-up").classList.remove("not-active");
})

toLogin.addEventListener("click", function() {
    document.querySelector(".black-box").classList.remove("to-create");
    document.querySelector(".sign-up").classList.add("not-active");
    document.querySelector(".sign-in").classList.remove("not-active");
})


function strcmp(a, b) {
    a = a.toString(), b = b.toString();
    for (var i=0,n=Math.max(a.length, b.length); i<n && a.charAt(i) === b.charAt(i); ++i);
    if (i === n) return 0;
    return a.charAt(i) > b.charAt(i) ? -1 : 1;
}