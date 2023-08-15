const loginTabButton = document.querySelector('#login-tab');
const registerTabButton = document.querySelector('#register-tab');
const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');

loginTabButton.addEventListener('click', function(e) {
    e.preventDefault();

    registerTabButton.classList.remove('tab-selected');
    loginTabButton.classList.add('tab-selected');

    loginForm.classList.remove('hide');
    registerForm.classList.add('hide');
});

registerTabButton.addEventListener('click', function(e) {
    e.preventDefault();

    loginTabButton.classList.remove('tab-selected');
    registerTabButton.classList.add('tab-selected');

    registerForm.classList.remove('hide');
    loginForm.classList.add('hide');
});


document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: form.get("username"),
            password: form.get("password")
        })
    }

    const response = await fetch("http://localhost:3000/users/login", options);
    const data = await response.json();

    if (response.status == 200) {
        localStorage.setItem("token", data.token);
        window.location.assign("board.html");
    } else {
        alert(data.error);
    }
})

document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: form.get("register-username"),
            password: form.get("register-password")
        })
    }

    const response = await fetch("http://localhost:3000/users/register", options);
    const data = await response.json();

    if (response.status == 201) {
        //window.location.assign("login.html");
        loginTabButton.click();
    } else {
        alert(data.error);
    }
})