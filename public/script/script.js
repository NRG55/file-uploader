const popup = document.getElementById('popup');
const newFileButton = document.getElementById('newFile');
const closePopupButton = document.getElementById('closePopup');

function addListenerNewFile() {
    if (newFileButton && popup) {    
        newFileButton.addEventListener("click", () => {
            popup.classList.remove('hidden');
            popup.classList.add('flex');
        });
    };    
};

function addListenerClosePopup() {
    if (closePopupButton && popup) {    
        closePopupButton.addEventListener("click", () => {
            popup.classList.remove('flex');
            popup.classList.add('hidden');
        });
    };    
};

document.addEventListener("DOMContentLoaded", () => {
	addListenerNewFile();
    addListenerClosePopup();
});