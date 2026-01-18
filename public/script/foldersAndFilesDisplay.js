const container = document.getElementById('foldersAndFilesContainer');

const optionMenuButtons = container.querySelectorAll('.option-menu-button');
const optionMenus = container.querySelectorAll('.option-menu');

const openFormButtons = container.querySelectorAll('.open-rename-folder-form-button');
const closeFormButtons = container.querySelectorAll('.close-rename-folder-form-button');
const forms = container.querySelectorAll('.rename-folder-form');

const folderLinks = container.querySelectorAll('.folder-link');

function toggleOptionMenu() {
    if (optionMenuButtons) {
        for (const button of optionMenuButtons) {
            button.addEventListener("click", () => {
                const optionMenu = container.querySelector(`.option-menu[data-type='${button.dataset.type}'][data-id='${button.dataset.id}']`);

                if (forms) {
                    for (const form of forms) {                       
                        form.classList.add('hidden');
                        form.classList.remove('flex');                                             
                    };
                };
                
                if (folderLinks) {
                    for (const folderLink of folderLinks) {                       
                        folderLink.classList.add('flex');
                        folderLink.classList.remove('hidden');                                             
                    };
                };

                if (optionMenus) {
                    for (const folderOptionMenu of optionMenus) {
                        folderOptionMenu !== optionMenu ? folderOptionMenu.classList.add('hidden'): '';                      
                    };
                };                               

                const isActive = optionMenu.classList.toggle("hidden");
            
                if (isActive) {
                    button.setAttribute("aria-expanded", "false");
                } else {
                    button.setAttribute("aria-expanded", "true");
                };                 
            });           
        };
    };   
};

function openRenameFolderForm() {
    if (openFormButtons) {
        for (const button of openFormButtons) {
            button.addEventListener("click", () => {
                const currentRenameFolderForm = container.querySelector(`[data-rename-folder-form-id='${button.dataset.id}']`);
                const renameFolderInput = container.querySelector(`[data-input-id='${button.dataset.id}']`);
                const currentFolderLink = container.querySelector(`[data-folder-link-id='${button.dataset.id}']`);

                if (optionMenus) {
                    for (const folderOptionMenu of optionMenus) {
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

function closeRenameFolderForm() {
    if (closeFormButtons) {
        for (const button of closeFormButtons) {
            const currentFolderLink = document.getElementById(`folderLink-${button.dataset.id}`);
            const renameFolderInput = container.querySelector(`[data-input-id='${button.dataset.id}']`);
            let folderName = '';

            if (renameFolderInput) {
                folderName = renameFolderInput.value;
            }           

            button.addEventListener("click", () => {
                const currentRenameFolderForm = container.querySelector(`[data-rename-folder-form-id='${button.dataset.id}']`);                       
          
                currentFolderLink.classList.remove("hidden");
                currentRenameFolderForm.classList.add("hidden");
                currentRenameFolderForm.classList.remove("flex");
                renameFolderInput.value = folderName;                           
            });           
        };
    };   
};

document.addEventListener("DOMContentLoaded", () => {
	toggleOptionMenu();
    openRenameFolderForm();
    closeRenameFolderForm();   
});