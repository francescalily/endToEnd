const addBugPostTabButton = document.querySelector('#add-bug-post-tab');
const addBugPostForm = document.querySelector('#add-bug-post-form');
const listByNameTabButton = document.querySelector('#list-by-name-tab');
const listByNameForm = document.querySelector('#list-by-name-form');
const listByIdTabButton = document.querySelector('#list-by-id-tab');
const listByIdForm = document.querySelector('#list-by-id-form');
const postList = document.querySelector('#post-list');

class Bug {

    constructor({bug_id, name, continent, image_url, genus, ecology, description}) {
        console.log(name);
        this.bug_id = bug_id;
        this.name = name;
        this.continent = continent;
        this.image_url = image_url;
        this.genus = genus;
        this.ecology = ecology;
        this.description = description;
    }

    get getBugID() { return this.bug_id; }
    get getName() { return this.name; }
    get getContinent() { return this.continent; }
    get getImageURL() { return this.image_url; }
    get getGenus() { return this.genus; }
    get getEcology() { return this.ecology; }
    get getDescription() { return this.description; }
}

let editBugSnapshot = null;
let isEditing = false;

async function updatePostByID(form, bug) {
    // const { bug_id, name, continent, image_url, genus, ecology, description } = bug;
    // console.log(bug);
    // console.log(editBugSnapshot['name']);
    // console.log({
    //     name: bug.getName,
    //     continent: bug.getContinent,
    //     image_url: bug.getImageURL,
    //     genus: bug.getGenus,
    //     ecology: bug.getEcology,
    //     description: bug.getDescription
    // });

    // console.log({
    //     name: bug['name'],
    //     continent: bug.getContinent,
    //     image_url: bug.getImageURL,
    //     genus: bug.getGenus,
    //     ecology: bug.getEcology,
    //     description: bug.getDescription
    // });
    
    // console.log(form.elements);

    const options = {
        method: "PATCH",
        headers: {
            'Authorization': localStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: bug.getName,
            continent: bug.getContinent,
            image_url: bug.getImageURL,
            genus: bug.getGenus,
            ecology: bug.getEcology,
            description: bug.getDescription
        })
    }
    try {
        const response = await fetch(`http://localhost:3000/bugs/${bug.getBugID}`, options);
        // const data = await response.json();

        if (response.status == 204) {
            // form.elements['post-input-name'].value = name;
            // form.elements['post-input-genus'].value = genus;
            // form.elements['post-input-continent'].value = continent;
            // form.elements['post-text-area-ecology'].value = ecology;
            // form.elements['post-text-area-description'].value = description;
            form.querySelector('.post-image').src = bug.getImageURL;
            // console.log('Saved Successfully');
            isEditing = false;
        } else {
            form.elements['post-input-name'].value = editBugSnapshot['name'];
            form.elements['post-input-genus'].value = editBugSnapshot['genus'];
            form.elements['post-input-continent'].value = editBugSnapshot['continent'];
            form.elements['post-text-area-ecology'].value = editBugSnapshot['ecology'];
            form.elements['post-text-area-description'].value = editBugSnapshot['description'];
            // form.elements['post-image'].src = image_url;
            // console.log('Failed to save');
            isEditing = false;
        }
    } catch (error) {
        form.elements['post-input-name'].value = editBugSnapshot['name'];
        form.elements['post-input-genus'].value = editBugSnapshot['genus'];
        form.elements['post-input-continent'].value = editBugSnapshot['continent'];
        form.elements['post-text-area-ecology'].value = editBugSnapshot['ecology'];
        form.elements['post-text-area-description'].value = editBugSnapshot['description'];
        // console.log('Error has occurred');
        // console.log(error);
        isEditing = false;
    }
    
}

addBugPostTabButton.addEventListener('click', function(e) {
    e.preventDefault();

    addBugPostTabButton.classList.add('tab-selected');
    listByIdTabButton.classList.remove('tab-selected');
    listByNameTabButton.classList.remove('tab-selected');

    addBugPostForm.classList.remove('hide');
    listByIdForm.classList.add('hide');
    listByNameForm.classList.add('hide');

});

listByNameTabButton.addEventListener('click', function(e) {
    e.preventDefault();

    addBugPostTabButton.classList.remove('tab-selected');
    listByIdTabButton.classList.remove('tab-selected');
    listByNameTabButton.classList.add('tab-selected');

    addBugPostForm.classList.add('hide');
    listByIdForm.classList.add('hide');
    listByNameForm.classList.remove('hide');
    
});

listByIdTabButton.addEventListener('click', function(e) {
    e.preventDefault();

    addBugPostTabButton.classList.remove('tab-selected');
    listByIdTabButton.classList.add('tab-selected');
    listByNameTabButton.classList.remove('tab-selected');

    addBugPostForm.classList.add('hide');
    listByIdForm.classList.remove('hide');
    listByNameForm.classList.add('hide');
    
});

function createPost(post) {
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
    postImageTextArea.classList.add('post-input');
    postImageTextArea.classList.add('hide');
    postImageTextArea.name = "post-image-text-area";
    postImageTextArea.autocomplete = "off";
    postImageTextArea.value = image_url;
    

    const headerWrapper = document.createElement("div");
    headerWrapper.classList.add('post-header-wrapper');

    const postInputName = document.createElement("input");
    postInputName.classList.add('post-header');
    postInputName.classList.add('post-input');
    postInputName.name = "post-input-name";
    postInputName.type = "text";
    postInputName.disabled = true;
    postInputName.autocomplete = "off";
    postInputName.value = name;

    const postInputGenus = document.createElement("input");
    postInputGenus.classList.add('post-header');
    postInputGenus.classList.add('post-input');
    postInputGenus.name = "post-input-genus";
    postInputGenus.type = "text";
    postInputGenus.disabled = true;
    postInputGenus.autocomplete = "off";
    postInputGenus.value = genus;

    const postInputContinent = document.createElement("input");
    postInputContinent.classList.add('post-header');
    postInputContinent.classList.add('post-input');
    postInputContinent.name = "post-input-continent";
    postInputContinent.type = "text";
    postInputContinent.disabled = true;
    postInputContinent.autocomplete = "off";
    postInputContinent.value = continent;

    const postEcologyTextArea = document.createElement("textarea");
    postEcologyTextArea.classList.add('post-ecology');
    postEcologyTextArea.classList.add('post-text-area');
    postEcologyTextArea.classList.add('post-input');
    postEcologyTextArea.name = "post-text-area-ecology";
    postEcologyTextArea.disabled = true;
    postEcologyTextArea.autocomplete = "off";
    postEcologyTextArea.value = ecology;

    const postDescriptionTextArea = document.createElement("textarea");
    postDescriptionTextArea.classList.add('post-description');
    postDescriptionTextArea.classList.add('post-text-area');
    postDescriptionTextArea.classList.add('post-input');
    postDescriptionTextArea.name = "post-text-area-description";
    postDescriptionTextArea.disabled = true;
    postDescriptionTextArea.autocomplete = "off";
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
            // console.log(post);
            editBugSnapshot = new Bug(post);
            // console.log(editBugSnapshot);
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
       
        // postForm.elements['post-input-name'].removeAllRanges();
        // postForm.elements['post-input-genus'].removeAllRanges();
        // postForm.elements['post-input-continent'].removeAllRanges();
        // postForm.elements['post-text-area-ecology'].removeAllRanges();
        // postForm.elements['post-text-area-description'].removeAllRanges();

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
        // console.log(inputName);
        // console.log(inputContinent);
        // console.log(inputImageURL);
        // console.log(inputGenus);
        // console.log(inputEcology);
        const tempBug = new Bug ({bug_id : bug_id, name: inputName, continent: inputContinent, image_url: inputImageURL, genus: inputGenus, ecology: inputEcology, description: inputDescription});
        
        updatePostByID(postForm, tempBug);

        
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

    postDeleteButton.addEventListener('click', (e) => {
        e.preventDefault();

        deletePost(postForm, bug_id);
    });

    return postForm;
    // postList.appendChild(postForm);
}

async function loadPosts () {

    const options = {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    }
    const response = await fetch("http://localhost:3000/bugs", options);

    if (response.status == 200) {
        const posts = await response.json();
        postList.textContent = "";
        posts.forEach(p => {
            const elem = createPost(p);
            
            postList.appendChild(elem);
        })
    } else {
        //window.location.assign("./index.html");
    }

}

async function deletePost(form, bug_id) {
    // console.log(bug_id);
    
    const options = {
        method: "DELETE",
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    }
    
    
    const response = await fetch(`http://localhost:3000/bugs/${bug_id}`, options);
    const data = await response;

    if (response.status == 200) {
        form.remove();
         
        // localStorage.setItem("token", data.token);
        // window.location.assign("index.html");
    } else {
        alert(response.status);
    }

}


addBugPostForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Authorization': localStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: form.get("add-bug-posts-name"),
            continent: form.get("add-bug-posts-continent"),
            image_url: form.get("add-bug-posts-image-url"),
            genus: form.get("add-bug-posts-genus"),
            ecology: form.get("add-bug-posts-ecology"),
            description: form.get("add-bug-posts-description")
        })
    }
    console.log();
    const response = await fetch("http://localhost:3000/bugs/", options);
    const data = await response.json();

    if (response.status == 201) {
        e.target.elements['add-bug-posts-name'].value = "";
        e.target.elements['add-bug-posts-continent'].value = "";
        e.target.elements['add-bug-posts-image-url'].value = "";
        e.target.elements['add-bug-posts-genus'].value = "";
        e.target.elements['add-bug-posts-ecology'].value = "";
        e.target.elements['add-bug-posts-description'].value = "";
        loadPosts();

    } else {
        alert(data.error);
    }
});

// console.log(addBugPostForm);
loadPosts();
// displayPost({bug_id: 1, name: "Bug", continent: "Africa", image_url: "#", genus: "Of Bug Genus", ecology: "A paragraph on Ecology", description: "A paragraph about the description"});
// displayPost({bug_id: 2, name: "Bug", continent: "Africa", image_url: "#", genus: "Of Bug Genus", ecology: "A paragraph on Ecology", description: "A paragraph about the description"});
