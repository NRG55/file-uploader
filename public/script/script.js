const newFolderFormOverlay = document.getElementById('newFolderFormOverlay');
const newFileFormOverlay = document.getElementById('newFileFormOverlay');
const newFolderForm = document.getElementById('newFolderForm');
const newFileForm = document.getElementById('newFileForm');
const addNewFolderButton = document.getElementById('addNewFolderButton');
const addNewFileButton = document.getElementById('addNewFileButton');
const closeNewFolderFormButton = document.getElementById('closeNewFolderFormButton');
const closeNewFileFormButton = document.getElementById('closeNewFileFormButton');

function addListenerToAddNewFolderButton() {
    if (addNewFolderButton && newFolderFormOverlay) {    
        addNewFolderButton.addEventListener("click", () => {
            newFolderFormOverlay.classList.remove('hidden');
            newFolderFormOverlay.classList.add('flex');

            setTimeout(() => {
                newFolderFormOverlay.classList.add('opacity-100');
            });
        });
    };    
};

function addListenerToAddNewFileButton() {
    if (addNewFileButton && newFileFormOverlay) {    
        addNewFileButton.addEventListener("click", () => {
            newFileFormOverlay.classList.remove('hidden');           
            newFileFormOverlay.classList.add('flex');
            
            setTimeout(() => {
                newFileFormOverlay.classList.add('opacity-100');
            });
        });
    };    
};

const hideForm = (form) => {
    form.classList.remove('flex');
    form.classList.remove('opacity-100');
    form.classList.add('hidden');
};

function addListenersCloseNewFolderForm() {
    if (closeNewFolderFormButton && newFolderFormOverlay) {    
        closeNewFolderFormButton.addEventListener("click", () => hideForm(newFolderFormOverlay));
        newFolderFormOverlay.addEventListener("click", () => hideForm(newFolderFormOverlay));
        newFolderForm.addEventListener("click", (e) => {
            e.stopImmediatePropagation();
        });      
    };    
};

function addListenersCloseNewFileForm() {
    if (closeNewFileFormButton && newFileFormOverlay) {    
        closeNewFileFormButton.addEventListener("click", () => hideForm(newFileFormOverlay));
        newFileFormOverlay.addEventListener("click", () => hideForm(newFileFormOverlay));
        newFileForm.addEventListener("click", (e) => {
            e.stopImmediatePropagation();
        });       
    };    
};

document.addEventListener("DOMContentLoaded", () => {
	addListenerToAddNewFolderButton();
    addListenerToAddNewFileButton();
    addListenersCloseNewFolderForm();
    addListenersCloseNewFileForm();
});