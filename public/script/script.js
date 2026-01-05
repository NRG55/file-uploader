const popupNewFolder = document.getElementById('popupNewFolder');
const popupNewFile = document.getElementById('popupNewFile');
const addNewFolderButton = document.getElementById('addNewFolderButton');
const addNewFileButton = document.getElementById('addNewFileButton');
const closePopupNewFolderButton = document.getElementById('closePopupNewFolderButton');
const closePopupNewFileButton = document.getElementById('closePopupNewFileButton');

function addListenerToAddNewFolderButton() {
    if (addNewFolderButton && popupNewFolder) {    
        addNewFolderButton.addEventListener("click", () => {
            popupNewFolder.classList.remove('hidden');
            popupNewFolder.classList.add('flex');
        });
    };    
};

function addListenerToAddNewFileButton() {
    if (addNewFileButton && popupNewFile) {    
        addNewFileButton.addEventListener("click", () => {
            popupNewFile.classList.remove('hidden');
            popupNewFile.classList.add('flex');
        });
    };    
};

function addListenerClosePopupNewFolder() {
    if (closePopupNewFolderButton && popupNewFolder) {    
        closePopupNewFolderButton.addEventListener("click", () => {
            popupNewFolder.classList.remove('flex');
            popupNewFolder.classList.add('hidden');
        });
    };    
};

function addListenerClosePopupNewFile() {
    if (closePopupNewFileButton && popupNewFile) {    
        closePopupNewFileButton.addEventListener("click", () => {
            popupNewFile.classList.remove('flex');
            popupNewFile.classList.add('hidden');
        });
    };    
};

document.addEventListener("DOMContentLoaded", () => {
	addListenerToAddNewFolderButton();
    addListenerToAddNewFileButton();
    addListenerClosePopupNewFolder();
    addListenerClosePopupNewFile();
});