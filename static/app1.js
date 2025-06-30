function sendMessage(){ 
    let message = document.getElementById('message-input').value;
    if(message){
        let innerMessage = document.createElement('p');
        let messagesBox = document.querySelector('.chat-messages');
        innerMessage.innerText = message;
        messagesBox.insertBefore(innerMessage, messagesBox.firstChild);
        messagesBox.scrollTop = messagesBox.scrollHeight;
        document.querySelector('.message-typing').value = '';
        
    }

}
function showProfile(){
    
    let div = document.createElement('div');

    let img = document.createElement('img');
    let imgContainer = document.getElementById('image-container');
    let url = imgContainer.dataset.imgUrl;
    img.src = url;
    img.classList.add('profile-photo')
    let penSymbol3 = document.createElement('i');
    penSymbol3.classList.add('fas', 'fa-pen', 'edit-icon');

    let buttonEditPhoto = document.createElement('button');
    buttonEditPhoto.appendChild(penSymbol3);
    buttonEditPhoto.onclick = editPhoto;
    buttonEditPhoto.classList.add('button-edit-photo');

    let wrapper = document.createElement('div');
    wrapper.classList.add('profile-wrapper');
    wrapper.appendChild(img);
    wrapper.appendChild(buttonEditPhoto);
    

    let hrefContainer = document.getElementById('href-container')
    let href = hrefContainer.dataset.pageUrl;
    let a = document.createElement('a');
    a.href = href;

    let buttonLogout = document.createElement('button');
    buttonLogout.classList.add('button-logout');
    buttonLogout.innerText = 'Log out'
    a.appendChild(buttonLogout);
    
    let username = document.getElementById('username').dataset.user;
    
    let paragraph = document.createElement('p');
    let divParagraphs = document.createElement('div');
    divParagraphs.classList.add('info-user');

    paragraph.innerHTML = username;
    paragraph.classList.add('username');
    let divAbout = document.createElement('div');
    divAbout.classList.add('about-div');

    let paragraph2 = document.createElement('p');
    paragraph2.classList.add('about-title');
    paragraph2.innerText = 'About';
    
    let aboutContent = document.getElementById('profile').dataset.about;
    let paragraph3 = document.createElement('p');
    paragraph3.classList.add('about-content');
    paragraph3.innerText = aboutContent;
    
    let penSymbol2 = document.createElement('i');
    penSymbol2.classList.add('fas');
    penSymbol2.classList.add('fa-pen');
    penSymbol2.classList.add('fa-sm');

    let editButtonAbout = document.createElement('button');
    editButtonAbout.classList.add('edit-button-about');
    editButtonAbout.onclick = editAbout;
    editButtonAbout.appendChild(penSymbol2);

    divAbout.appendChild(editButtonAbout);

    let divEditName = document.createElement('div');
    divEditName.classList.add('group-name');

    let penSymbol = document.createElement('i');
    penSymbol.classList.add('fas');
    penSymbol.classList.add('fa-pen');
    penSymbol.classList.add('fa-sm');

    let editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.onclick = edit;
    editButton.appendChild(penSymbol)

    divEditName.appendChild(paragraph);
    divEditName.appendChild(editButton);

    divAbout.appendChild(paragraph2);
    divAbout.appendChild(paragraph3);

    
    divParagraphs.appendChild(divAbout);
    
    
    let buttonClose = document.createElement('button');
    buttonClose.innerText = 'X';
    buttonClose.classList.add('button-close');
    buttonClose.onclick = close;

    div.appendChild(img);
    div.appendChild(a);
    div.appendChild(divEditName);
    div.appendChild(divParagraphs);
    div.appendChild(buttonClose);
    div.appendChild(wrapper);

    let classContainer = document.getElementsByClassName('container')[0];

    div.classList.add('edit-profile');
    classContainer.appendChild(div);
    
}
function close(){
    let div = document.querySelector('.edit-profile');
    div.remove();
}
function edit(){
    
    if (document.querySelector('form')){
        document.querySelector('form').remove();
        let paragraph2 = document.getElementsByClassName('about-title')[0];
        let paragraph3 = document.getElementsByClassName('about-content')[0];
        let aboutContent = document.getElementById('profile').dataset.about;
        paragraph3.innerText = aboutContent;

        let penSymbol = document.createElement('i');
        penSymbol.classList.add('fas');
        penSymbol.classList.add('fa-pen');
        penSymbol.classList.add('fa-sm');

        let editButton = document.createElement('button');
        editButton.classList.add('edit-button-about');
        editButton.onclick = editAbout;
        editButton.appendChild(penSymbol);

        let divAbout = document.querySelector('.about-div');
        divAbout.insertBefore(editButton, paragraph2);
    }
    let paragraph = document.getElementsByClassName('username')[0];
    let editButton = document.getElementsByClassName('edit-button')[0];
    editButton.remove()
    paragraph.innerText = '';

    let form = document.createElement('form');
    form.method = 'POST';
    form.action = "edit_username";
    
    let csrfToken = document.getElementById('csrf-token').value;
    
    let csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = 'csrfmiddlewaretoken';
    csrfInput.value = csrfToken;
    
    let input = document.createElement('input');
    input.classList.add('change-name');
    input.name = 'new_username'; 
    input.type = 'text';
    input.placeholder = 'New username';
    
    let submit = document.createElement('button');
    submit.classList.add('done-button');
    
    submit.type = 'submit';
    submit.innerText = 'Done';

    form.appendChild(csrfInput);
    form.appendChild(input);
    form.appendChild(submit);

    paragraph.appendChild(form)
}
function editAbout(){
    if (document.querySelector('form')){
        document.querySelector('form').remove();
        let paragraph = document.getElementsByClassName('username')[0];
        let username = document.getElementById('username').dataset.user;
        paragraph.innerHTML = username;
        let divEditName = document.querySelector('.group-name');
        divEditName.appendChild(paragraph);

        let penSymbol = document.createElement('i');
        penSymbol.classList.add('fas');
        penSymbol.classList.add('fa-pen');
        penSymbol.classList.add('fa-sm');

        let editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.onclick = edit;
        editButton.appendChild(penSymbol);

        divEditName.appendChild(editButton);
    }
    let paragraph = document.getElementsByClassName('about-content')[0];
    let editButton = document.getElementsByClassName('edit-button-about')[0];
    editButton.remove()
    paragraph.innerText = '';

    let form = document.createElement('form');
    form.method = 'POST';
    form.action = "edit_about";
    
    let csrfToken = document.getElementById('csrf-token').value;
    
    let csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = 'csrfmiddlewaretoken';
    csrfInput.value = csrfToken;
    
    let input = document.createElement('input');
    input.classList.add('change-about');
    input.name = 'new_about'; 
    input.type = 'text';
    
    let submit = document.createElement('button');
    submit.classList.add('done-button');
    
    submit.type = 'submit';
    submit.innerText = 'Done';

    let aboutWrapper = document.createElement('div');
    aboutWrapper.classList.add('about-adit-div');
    aboutWrapper.appendChild(input);
    aboutWrapper.appendChild(submit);

    form.appendChild(csrfInput);
    form.appendChild(aboutWrapper);

    paragraph.appendChild(form)
}
function editPhoto(){
    
    let form = document.createElement('form');
    form.method = 'POST';
    form.action = "edit_photo";
    form.setAttribute('enctype', 'multipart/form-data');
    
    let csrfToken = document.getElementById('csrf-token').value;
    
    let csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = 'csrfmiddlewaretoken';
    csrfInput.value = csrfToken;

    let fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.name = 'new_photo';
    fileInput.accept = 'image/*';

    let submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.innerText = 'Upload';

    form.appendChild(csrfInput);
    form.appendChild(fileInput);
    form.appendChild(submitButton);

    document.body.appendChild(form);
}