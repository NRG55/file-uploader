const foldersAndFilesContainer = document.getElementById('foldersAndFilesContainer');
const folderOptionMenuButtons = foldersAndFilesContainer.querySelectorAll('.folder-option-menu-button');
const folderOptionMenus = foldersAndFilesContainer.querySelectorAll('.folder-option-menu');

const openRenameFolderFormButtons = foldersAndFilesContainer.querySelectorAll('.open-rename-folder-form-button');
const renameFolderForms = foldersAndFilesContainer.querySelectorAll('.rename-folder-form');

function toggleFolderOptionMenu() {
    if (folderOptionMenuButtons) {
        for (const optionMenuButton of folderOptionMenuButtons) {
            optionMenuButton.addEventListener("click", () => {
                const optionMenu = foldersAndFilesContainer.querySelector(`[data-option-menu-id='${optionMenuButton.dataset.buttonId}']`);

                if (folderOptionMenus) {
                    for (const folderOptionMenu of folderOptionMenus) {
                        folderOptionMenu !== optionMenu ? folderOptionMenu.classList.add('hidden'): '';                      
                    };
                };               

                const isActive = optionMenu.classList.toggle("hidden");
            
                if (isActive) {
                    optionMenuButton.setAttribute("aria-expanded", "false");
                } else {
                    optionMenuButton.setAttribute("aria-expanded", "true");
                };
            });           
        };
    };   
};

function openRenameFolderForm() {
    if (openRenameFolderFormButtons) {
        for (const openRenameFolderFormButton of openRenameFolderFormButtons) {
            openRenameFolderFormButton.addEventListener("click", () => {
                const currentRenameFolderForm = foldersAndFilesContainer.querySelector(`[data-rename-folder-form-id='${openRenameFolderFormButton.dataset.buttonId}']`);
                const renameFolderInput = foldersAndFilesContainer.querySelector(`[data-rename-folder-input-id='${openRenameFolderFormButton.dataset.buttonId}']`);

                if (renameFolderForms) {
                    for (const renameFolderForm of renameFolderForms) {                       
                        renameFolderForm.classList.add('hidden');
                        renameFolderForm.classList.remove('flex');                                             
                    };
                };
                
                const currentFolderLink = foldersAndFilesContainer.querySelector(`[data-folder-link-id='${openRenameFolderFormButton.dataset.buttonId}']`);

                if (folderOptionMenus) {
                    for (const folderOptionMenu of folderOptionMenus) {
                        folderOptionMenu.classList.add('hidden');                      
                    };
                };
                
                currentFolderLink.classList.add("hidden");
                currentRenameFolderForm.classList.remove("hidden");
                currentRenameFolderForm.classList.add("flex");
                renameFolderInput.focus()              
            });           
        };
    };   
};

document.addEventListener("DOMContentLoaded", () => {
	toggleFolderOptionMenu();
    openRenameFolderForm();   
});