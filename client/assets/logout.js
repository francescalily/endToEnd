document.getElementById("logout-button").addEventListener("click", async (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("token");
    // console.log(storedToken);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: storedToken
        })
    }

    const response = await fetch("http://localhost:3000/users/logout", options);
    const data = await response.json();

    if (response.status == 200) {
        // alert('Logging out');
        // localStorage.setItem("token", data.token);
        window.location.assign("./login.html");
    } else {
        alert(data.error);
    }
})