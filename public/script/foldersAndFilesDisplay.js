const container = document.getElementById('foldersAndFilesContainer');

const optionMenus = container.querySelectorAll('.option-menu'); // folders and files option menus
const optionMenuButtons = container.querySelectorAll('.option-menu-button');

const forms = container.querySelectorAll('.form'); // rename folder or file forms
const openFormButtons = container.querySelectorAll('.open-form-button');
const closeFormButtons = container.querySelectorAll('.close-rename-folder-form-button');

const links = container.querySelectorAll('.link'); // folders and files links

function toggleOptionMenu() {
    if (optionMenuButtons) {
        for (const button of optionMenuButtons) {
            button.addEventListener("click", () => {
                const clickedOptionMenu = container.querySelector(`.option-menu[data-type='${button.dataset.type}'][data-id='${button.dataset.id}']`);

                if (forms) {
                    for (const form of forms) {                       
                        form.classList.add('hidden');
                        form.classList.remove('flex');                                             
                    };
                };
                
                if (links) {
                    for (const folderLink of links) {                       
                        folderLink.classList.add('flex');
                        folderLink.classList.remove('hidden');                                             
                    };
                };

                if (optionMenus) {
                    for (const optionMenu of optionMenus) {
                        clickedOptionMenu !== optionMenu ? optionMenu.classList.add('hidden'): '';                      
                    };
                };                               

                const isActive = clickedOptionMenu.classList.toggle("hidden");
            
                if (isActive) {
                    button.setAttribute("aria-expanded", "false");
                } else {
                    button.setAttribute("aria-expanded", "true");
                };                 
            });           
        };
    };   
};

function openRenameForm() {
    if (openFormButtons) {
        for (const button of openFormButtons) {
            button.addEventListener("click", () => {
                const form = container.querySelector(`.form[data-type='${button.dataset.type}'][data-id='${button.dataset.id}']`);
                const input = container.querySelector(`.input[data-type='${button.dataset.type}'][data-id='${button.dataset.id}']`);
                const link = container.querySelector(`.link[data-type='${button.dataset.type}'][data-id='${button.dataset.id}']`);

                if (optionMenus) {
                    for (const optionMenu of optionMenus) {
                        optionMenu.classList.add('hidden');                      
                    };
                };
                
                link.classList.add("hidden");
                form.classList.remove("hidden");
                form.classList.add("flex");
                input.focus()              
            });           
        };
    };   
};

function closeRenameForm() {
    if (closeFormButtons) {
        for (const button of closeFormButtons) {
            const link = container.querySelector(`.link[data-type='${button.dataset.type}'][data-id='${button.dataset.id}']`);
            const input = container.querySelector(`.input[data-type='${button.dataset.type}'][data-id='${button.dataset.id}']`);
            let folderName = '';

            if (input) {
                folderName = input.value;
            }           

            button.addEventListener("click", () => {
                const form = container.querySelector(`.form[data-type='${button.dataset.type}'][data-id='${button.dataset.id}']`);                       
          
                link.classList.remove("hidden");
                form.classList.add("hidden");
                form.classList.remove("flex");
                input.value = folderName;                           
            });           
        };
    };   
};

// ---------------- COFIRM DELETE FOLDER OR FILE MODAL -----------------

const modal = document.getElementById('confirmDeleteModal');
const form = modal.querySelector('form');
const noticeMessage = form.querySelector('.notice-message');
const openModalButtons = container.querySelectorAll('button.open-modal');
const closeModalButtons = form.querySelectorAll('button.close-modal');

function openModalDeleteFileOrFolder() {
    if (openModalButtons && modal) {
        for (const button of openModalButtons) {
            button.addEventListener("click", () => {
                if (optionMenus) {
                    for (const optionMenu of optionMenus) {
                        optionMenu.classList.add('hidden');                      
                    };
                };

                modal.classList.remove('hidden');
                modal.classList.add('flex');              
                form.action += `/delete-${button.dataset.type}/${button.dataset.id}`;

                if (button.dataset.type === 'folder') {
                    noticeMessage.textContent = `Are you sure you want to permanently delete the folder '${button.dataset.name}' and all of its contents?`
                } else {
                    noticeMessage.textContent = `Are you sure you want to permanently delete the file '${button.dataset.name}'?`
                };

                setTimeout(() => {
                    modal.classList.add('opacity-100');
                });
            });
        } ;       
    };    
};

const hideModalDeleteFileOrFolder = (modal) => {
    modal.classList.remove('flex');
    modal.classList.remove('opacity-100');
    modal.classList.add('hidden');
};

function closeModalDeleteFileOrFolder() {
    if (closeModalButtons && modal) {
        for (const button of closeModalButtons) {
            button.addEventListener("click", () => hideModalDeleteFileOrFolder(modal));
        };
       
        modal.addEventListener("click", () => hideModalDeleteFileOrFolder(modal));
        form.addEventListener("click", (e) => {
            e.stopImmediatePropagation();
        });      
    };    
};

// --------------- FILE DETAILS MODAL -----------------

const fileDetailsModal = document.getElementById('fileDetailsModal');
const fileDetailsForm = fileDetailsModal.querySelector('form');
const openFileDetailsModalButtons = container.querySelectorAll('.open-file-details-modal-button');
const closeFileDetailsModalButtons = fileDetailsForm.querySelectorAll('.close-file-details-modal-button');
const fileName = fileDetailsForm.querySelector('p.name');
const fileType = fileDetailsForm.querySelector('p.type');
const fileSize = fileDetailsForm.querySelector('p.size');
const fileCreated = fileDetailsForm.querySelector('p.created');

function openModalFileDetails() {
    if (openFileDetailsModalButtons && fileDetailsModal) {
        for (const button of openFileDetailsModalButtons) {
            button.addEventListener("click", () => {
                if (optionMenus) {
                    for (const optionMenu of optionMenus) {
                        optionMenu.classList.add('hidden');                      
                    };
                };

                fileDetailsModal.classList.remove('hidden');
                fileDetailsModal.classList.add('flex');              
                fileDetailsForm.action += `/${button.dataset.type}-details/${button.dataset.id}`;

                fileName.textContent = `Name: ${button.dataset.name}`;
                fileType.textContent = `Type: ${button.dataset.mimetype}`;
                fileSize.textContent = `Size: ${button.dataset.size}`;
                fileSize.textContent = `Created: ${button.dataset.created}`;

                setTimeout(() => {
                    fileDetailsModal.classList.add('opacity-100');
                });
            });
        } ;       
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
	toggleOptionMenu();
    openRenameForm();
    closeRenameForm();
    openModalDeleteFileOrFolder();
    closeModalDeleteFileOrFolder();
    openModalFileDetails();
    closeModalFileDetails();   
});