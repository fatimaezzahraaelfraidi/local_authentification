function password_show_hide() {
    var x = document.getElementById("password");
    var show_eye = document.getElementById("show_eye");
    var hide_eye = document.getElementById("hide_eye");
    hide_eye.classList.remove("d-none");
    if (x.type === "password") {
        x.type = "text";
        show_eye.style.display = "none";
        hide_eye.style.display = "block";
    } else {
        x.type = "password";
        show_eye.style.display = "block";
        hide_eye.style.display = "none";
    }
}

function sha512(str) {
    return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
        return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('');
    });
}

function signup(e) {
    event.preventDefault();
    var email = document.getElementById('email').value;
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    sha512(password).then((hashedPassword) => {
        var user = {
            email: email,
            name: name,
            password: hashedPassword,
        };

        var json = JSON.stringify(user);
        localStorage.setItem(email, json);
        window.location.href = "signin.html";
    });
}


function login(e) {
    event.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var user = localStorage.getItem(email);
    var data = JSON.parse(user);
    console.log(data);
    sha512(password).then((hashedPassword) => {
        if (user == null) {
            alert('wrong email');
        } else if (email == data.email && hashedPassword == data.password) {
            alert('Logged in');
        } else {
            alert('wrong password');
        }
    });

}


//})();