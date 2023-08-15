const listAllLimitTabButton = document.querySelector('#list-all-limit-tab');
const listAllLimitForm = document.querySelector('#list-all-limit-form');
const listByNameTabButton = document.querySelector('#list-by-name-tab');
const listByNameForm = document.querySelector('#list-by-name-form');
const listByIdTabButton = document.querySelector('#list-by-id-tab');
const listByIdForm = document.querySelector('#list-by-id-form');


listAllLimitTabButton.addEventListener('click', function(e) {
    e.preventDefault();

    listAllLimitTabButton.classList.add('tab-selected');
    listByIdTabButton.classList.remove('tab-selected');
    listByNameTabButton.classList.remove('tab-selected');

    listAllLimitForm.classList.remove('hide');
    listByIdForm.classList.add('hide');
    listByNameForm.classList.add('hide');

});

listByNameTabButton.addEventListener('click', function(e) {
    e.preventDefault();

    listAllLimitTabButton.classList.remove('tab-selected');
    listByIdTabButton.classList.remove('tab-selected');
    listByNameTabButton.classList.add('tab-selected');

    listAllLimitForm.classList.add('hide');
    listByIdForm.classList.add('hide');
    listByNameForm.classList.remove('hide');
    
});

listByIdTabButton.addEventListener('click', function(e) {
    e.preventDefault();

    listAllLimitTabButton.classList.remove('tab-selected');
    listByIdTabButton.classList.add('tab-selected');
    listByNameTabButton.classList.remove('tab-selected');

    listAllLimitForm.classList.add('hide');
    listByIdForm.classList.remove('hide');
    listByNameForm.classList.add('hide');
    
});


listAllLimitForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: form.get("list-all-limit-id"),
            limit: form.get("list-all-limit-limit")
        })
    }

    const response = await fetch("http://localhost:3000/bugs/", options);
    const data = await response.json();

    if (response.status == 200) {
        
    } else {
        alert(data.error);
    }
});