const container = document.getElementById('foldersAndFilesContainer');
const fileDetailsModal = document.getElementById('fileDetailsModal');
const fileDetailsForm = fileDetailsModal.querySelector('form');
const openFileDetailsModalButtons = document.querySelectorAll('.open-file-details-modal-button');
const closeFileDetailsModalButtons = fileDetailsForm.querySelectorAll('.close-file-details-modal-button');
const fileName = fileDetailsForm.querySelector('p.name');
const fileType = fileDetailsForm.querySelector('p.type');
const fileSize = fileDetailsForm.querySelector('p.size');
const fileCreated = fileDetailsForm.querySelector('p.created');
const downloadFileButton = document.getElementById('downloadFileButton');

function openModalFileDetails() {
    if (openFileDetailsModalButtons && fileDetailsModal) {        
        for (const button of openFileDetailsModalButtons) {
            button.addEventListener("click", () => {                
                fileDetailsModal.classList.remove('hidden');
                fileDetailsModal.classList.add('flex');              
                fileDetailsForm.action = `/share/${button.dataset.shareId}/download-${button.dataset.type}/${button.dataset.id}`;

                fileName.textContent = `Name: ${button.dataset.name}`;
                fileType.textContent = `Type: ${button.dataset.mimetype}`;
                fileSize.textContent = `Size: ${button.dataset.size}`;
                fileCreated.textContent = `Created: ${button.dataset.created}`;

                setTimeout(() => {
                    fileDetailsModal.classList.add('opacity-100');
                });
            });
        };
        
        if (downloadFileButton) {
            downloadFileButton.addEventListener('click', () => hideModalFileDetails(fileDetailsModal));
        };
    };    
};

const hideModalFileDetails = (modal) => {
    modal.classList.remove('flex');
    modal.classList.remove('opacity-100');
    modal.classList.add('hidden');
};

function closeModalFileDetails() {
    if (closeFileDetailsModalButtons && fileDetailsModal) {
        for (const button of closeFileDetailsModalButtons) {
            button.addEventListener("click", () => hideModalFileDetails(fileDetailsModal));
        };
       
        fileDetailsModal.addEventListener("click", () => hideModalFileDetails(fileDetailsModal));
        fileDetailsForm.addEventListener("click", (e) => {
            e.stopImmediatePropagation();
        });      
    };    
};

document.addEventListener("DOMContentLoaded", () => {
    openModalFileDetails();
    closeModalFileDetails();      
});