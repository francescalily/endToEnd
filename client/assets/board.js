const listAllLimitTabButton = document.querySelector('#list-all-limit-tab');
const listAllLimitForm = document.querySelector('#list-all-limit-form');
const listByNameTabButton = document.querySelector('#list-by-name-tab');
const listByNameForm = document.querySelector('#list-by-name-form');
const listByIdTabButton = document.querySelector('#list-by-id-tab');
const listByIdForm = document.querySelector('#list-by-id-form');
const postList = document.querySelector('#post-list');

class Bug {
    constructor({ bug_id, name, continent, image_url, genus, ecology, description }) {
        this.bug_id = bug_id;
        this.name = name;
        this.continent = continent;
        this.image_url = image_url;
        this.genus = genus;
        this.ecology = ecology;
        this.description = description;
    }


}

let editBugSnapshot = null;
let isEditing = false;

async function updatePostByID(form, post) {
    const { id, name, continent, image_url, genus, ecology, description } = post;

    const options = {
        method: "UPDATE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            continent: continent,
            image_url: image_url,
            genus: genus,
            ecology: ecology,
            description: description
        })
    }
    try {
        const response = await fetch(`http://localhost:3000/bugs/${id}`, options);
        const data = await response.json();

        if (response.status == 200) {
            form.elements['post-input-name'].value = name;
            form.elements['post-input-genus'].value = genus;
            form.elements['post-input-continent'].value = continent;
            form.elements['post-text-area-ecology'].value = ecology;
            form.elements['post-text-area-description'].value = description;
            form.elements['post-image'].src = image_url;
            isEditing = false;
        } else {
            form.elements['post-input-name'].value = editBugSnapshot['name'];
            form.elements['post-input-genus'].value = editBugSnapshot['genus'];
            form.elements['post-input-continent'].value = editBugSnapshot['continent'];
            form.elements['post-text-area-ecology'].value = editBugSnapshot['ecology'];
            form.elements['post-text-area-description'].value = editBugSnapshot['description'];
            // form.elements['post-image'].src = image_url;
            alert(data.error);
            isEditing = false;
        }
    } catch (error) {
        form.elements['post-input-name'].value = editBugSnapshot['name'];
        form.elements['post-input-genus'].value = editBugSnapshot['genus'];
        form.elements['post-input-continent'].value = editBugSnapshot['continent'];
        form.elements['post-text-area-ecology'].value = editBugSnapshot['ecology'];
        form.elements['post-text-area-description'].value = editBugSnapshot['description'];
    }
    
}

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

function displayPost(post) {
    const { bug_id, name, continent, image_url, genus, ecology, description } = post;

    const postForm = document.createElement("form");
    postForm.classList.add('post');

    const postWrapper = document.createElement("div");
    postWrapper.classList.add('horizontal-wrapper');
    postWrapper.classList.add('post-wrapper');

    const postImage = document.createElement("img");
    postImage.classList.add('post-image');
    postImage.name = "post-image";
    postImage.src = image_url;

    const postImageTextArea = document.createElement("textarea");
    postImageTextArea.classList.add('post-image-text-area');
    postImageTextArea.classList.add('hide');
    postImageTextArea.value = image_url;

    const headerWrapper = document.createElement("div");
    headerWrapper.classList.add('post-header-wrapper');

    const postInputName = document.createElement("input");
    postInputName.classList.add('post-header');
    postInputName.name = "post-input-name";
    postInputName.type = "text";
    postInputName.disabled = true;
    postInputName.value = name;

    const postInputGenus = document.createElement("input");
    postInputGenus.classList.add('post-header');
    postInputGenus.name = "post-input-genus";
    postInputGenus.type = "text";
    postInputGenus.disabled = true;
    postInputGenus.value = genus;

    const postInputContinent = document.createElement("input");
    postInputContinent.classList.add('post-header');
    postInputContinent.name = "post-input-continent";
    postInputContinent.type = "text";
    postInputContinent.disabled = true;
    postInputContinent.value = continent;

    const postEcologyTextArea = document.createElement("textarea");
    postEcologyTextArea.classList.add('post-ecology');
    postEcologyTextArea.classList.add('post-text-area');
    postEcologyTextArea.name = "post-text-area-ecology";
    postEcologyTextArea.disabled = true;
    postEcologyTextArea.value = ecology;

    const postDescriptionTextArea = document.createElement("textarea");
    postDescriptionTextArea.classList.add('post-description');
    postDescriptionTextArea.classList.add('post-text-area');
    postDescriptionTextArea.name = "post-text-area-description";
    postDescriptionTextArea.disabled = true;
    postDescriptionTextArea.value = description;

    const postFooter = document.createElement("div");
    postFooter.classList.add('post-footer-bar');

    const postUpdateButtons = document.createElement("div");
    postUpdateButtons.classList.add('post-update-buttons');
    postUpdateButtons.classList.add('hide');

    const postSaveButton = document.createElement("a");
    postSaveButton.classList.add('post-save-button');
    postSaveButton.classList.add('post-footer-button');
    postSaveButton.href = "#";
    postSaveButton.text = "Save";

    
    const postCancelButton = document.createElement("a");
    postCancelButton.classList.add('post-save-button');
    postCancelButton.classList.add('post-footer-button');
    postCancelButton.href = "#";
    postCancelButton.text = "Cancel";
    
    const postEditButton = document.createElement("a");
    postEditButton.classList.add('post-edit-button');
    postEditButton.classList.add('post-footer-button');
    postEditButton.href = "#";
    postEditButton.text = "Edit";
    
    const postDeleteButton = document.createElement("a");
    postDeleteButton.classList.add('post-delete-button');
    postDeleteButton.classList.add('post-footer-button');
    postDeleteButton.href = "#";
    postDeleteButton.text = "Delete";

    postForm.appendChild(postWrapper);

    postWrapper.appendChild(postImage);
    postWrapper.appendChild(postImageTextArea);
    postWrapper.appendChild(headerWrapper);

    headerWrapper.appendChild(postInputName);
    headerWrapper.appendChild(postInputGenus);
    headerWrapper.appendChild(postInputContinent);

    postForm.appendChild(postEcologyTextArea);
    postForm.appendChild(postDescriptionTextArea);
    postForm.appendChild(postFooter);

    postFooter.appendChild(postUpdateButtons);

    postUpdateButtons.appendChild(postSaveButton);
    postUpdateButtons.appendChild(postCancelButton);

    postFooter.appendChild(postEditButton);
    postFooter.appendChild(postDeleteButton);

    postEditButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (!isEditing) {
            editBugSnapshot = new Bug(post);
            console.log(editBugSnapshot);
            isEditing = true;

            postImageTextArea.classList.remove('hide');
            postInputName.disabled = false;
            postInputGenus.disabled = false;
            postInputContinent.disabled = false;
            postEcologyTextArea.disabled = false;
            postDescriptionTextArea.disabled = false;
            postUpdateButtons.classList.remove('hide');
            postEditButton.classList.add('hide');
            postDeleteButton.classList.add('hide');
        }
    });

    postCancelButton.addEventListener('click', (e) => {
        e.preventDefault();
        isEditing = false;
        postForm.elements['post-input-name'].value = editBugSnapshot['name'];
        postForm.elements['post-input-genus'].value = editBugSnapshot['genus'];
        postForm.elements['post-input-continent'].value = editBugSnapshot['continent'];
        postForm.elements['post-text-area-ecology'].value = editBugSnapshot['ecology'];
        postForm.elements['post-text-area-description'].value = editBugSnapshot['description'];

        postImageTextArea.classList.add('hide');
        postInputName.disabled = true;
        postInputGenus.disabled = true;
        postInputContinent.disabled = true;
        postEcologyTextArea.disabled = true;
        postDescriptionTextArea.disabled = true;
        postUpdateButtons.classList.add('hide');
        postEditButton.classList.remove('hide');
        postDeleteButton.classList.remove('hide');
    });
    
    postSaveButton.addEventListener('click', (e) => {
        e.preventDefault();
        let inputName = postInputName.value;
        let inputContinent = postInputContinent.value;
        let inputImageURL = postImageTextArea.value;
        let inputGenus = postInputGenus.value;
        let inputEcology = postEcologyTextArea.value;
        let inputDescription = postDescriptionTextArea.value;
        updatePostByID(postForm, {bug_id, inputName, inputContinent, inputImageURL, inputGenus, inputEcology, inputDescription});
        postImageTextArea.classList.add('hide');
        postInputName.disabled = true;
        postInputGenus.disabled = true;
        postInputContinent.disabled = true;
        postEcologyTextArea.disabled = true;
        postDescriptionTextArea.disabled = true;
        postUpdateButtons.classList.add('hide');
        postEditButton.classList.remove('hide');
        postDeleteButton.classList.remove('hide');
    });

    postList.appendChild(postForm);
}


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

displayPost({bug_id: 1, name: "Bug", continent: "Africa", image_url: "#", genus: "Of Bug Genus", ecology: "A paragraph on Ecology", description: "A paragraph about the description"});
displayPost({bug_id: 2, name: "Bug", continent: "Africa", image_url: "#", genus: "Of Bug Genus", ecology: "A paragraph on Ecology", description: "A paragraph about the description"});

