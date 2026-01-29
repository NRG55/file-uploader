const container = document.getElementById('foldersAndFilesContainer');

const optionMenus = container.querySelectorAll('.option-menu'); // folders and files option menus
const optionMenuButtons = container.querySelectorAll('.option-menu-button');

const forms = container.querySelectorAll('.form'); // rename folder or file forms
const openRenameFormButtons = container.querySelectorAll('.open-rename-form-button');
const closeFormButtons = container.querySelectorAll('.close-rename-folder-form-button');

const folderLinks = container.querySelectorAll('.folder-link');
const fileButtons = container.querySelectorAll('.file-button');

const hideRenameForms = () => {
    if (forms) {
        for (const form of forms) {                       
            form.classList.add('hidden');
            form.classList.remove('flex');                                             
        };
    };
    
    if (folderLinks) {
        for (const link of folderLinks) {                       
            link.classList.add('flex');
            link.classList.remove('hidden');                                             
        };
    };

    if (fileButtons) {
        for (const button of fileButtons) {                       
            button.classList.add('flex');
            button.classList.remove('hidden');                                             
        };
    };
};

function toggleOptionMenu() {
    if (optionMenuButtons) {
        for (const button of optionMenuButtons) {
            button.addEventListener("click", () => {
                const clickedOptionMenu = container.querySelector(`.option-menu[data-type='${button.dataset.type}'][data-id='${button.dataset.id}']`);

                hideRenameForms();

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
    if (openRenameFormButtons) {
        for (const button of openRenameFormButtons) {
            button.addEventListener("click", () => {
                const form = container.querySelector(`.form[data-type='${button.dataset.type}'][data-id='${button.dataset.id}']`);
                const input = container.querySelector(`.input[data-type='${button.dataset.type}'][data-id='${button.dataset.id}']`);
                const folderLink = container.querySelector(`.folder-link[data-type='${button.dataset.type}'][data-id='${button.dataset.id}']`);
                const fileButton = container.querySelector(`.file-button[data-type='${button.dataset.type}'][data-id='${button.dataset.id}']`);

                if (optionMenus) {
                    for (const optionMenu of optionMenus) {
                        optionMenu.classList.add('hidden');                      
                    };
                };

                if (fileButton) {
                    fileButton.classList.add("hidden");
                };

                if (folderLink) {
                    folderLink.classList.add("hidden");
                };               
                
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
            const folderLink = container.querySelector(`.folder-link[data-type='${button.dataset.type}'][data-id='${button.dataset.id}']`);
            const fileButton = container.querySelector(`.file-button[data-type='${button.dataset.type}'][data-id='${button.dataset.id}']`);
            const input = container.querySelector(`.input[data-type='${button.dataset.type}'][data-id='${button.dataset.id}']`);
            let folderName = '';

            if (input) {
                folderName = input.value;
            };           

            button.addEventListener("click", () => {
                const form = container.querySelector(`.form[data-type='${button.dataset.type}'][data-id='${button.dataset.id}']`);                       
          
                 if (fileButton) {
                    fileButton.classList.remove("hidden");
                };

                if (folderLink) {
                    folderLink.classList.remove("hidden");
                };

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
const downloadFileButton = document.getElementById('downloadFileButton');

function openModalFileDetails() {
    if (openFileDetailsModalButtons && fileDetailsModal) {
        for (const button of openFileDetailsModalButtons) {
            button.addEventListener("click", () => {
                hideRenameForms();

                if (optionMenus) {
                    for (const optionMenu of optionMenus) {
                        optionMenu.classList.add('hidden');                      
                    };
                };
                
                fileDetailsModal.classList.remove('hidden');
                fileDetailsModal.classList.add('flex');              
                fileDetailsForm.action = `/storage/${button.dataset.folderId}/download-${button.dataset.type}/${button.dataset.id}`;

                fileName.textContent = `Name: ${button.dataset.name}`;
                fileType.textContent = `Type: ${button.dataset.mimetype}`;
                fileSize.textContent = `Size: ${button.dataset.size}`;
                fileSize.textContent = `Created: ${button.dataset.created}`;

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

// --------------- SHARE FOLDER MODAL -----------------

const shareFolderModal = document.getElementById('shareFolderModal');
const shareFolderForm = shareFolderModal.querySelector('.share-folder-form');
const openShareModalButtons = container.querySelectorAll('.open-share-modal-button');
const generateLinkButton = document.getElementById('generateLinkButton');
const closeShareFolderModalButtons = shareFolderModal.querySelectorAll('.close-share-folder-modal-button');

function openShareFolderModal() {
    if (openShareModalButtons && shareFolderModal) {
        for (const button of openShareModalButtons) {
            const folderId = Number(button.dataset.id);

            button.addEventListener("click", () => {               

                if (optionMenus) {
                    for (const optionMenu of optionMenus) {
                        optionMenu.classList.add('hidden');                      
                    };
                };                           
                
                shareFolderModal.classList.remove('hidden');
                shareFolderModal.classList.add('flex');           

                setTimeout(() => {
                    shareFolderModal.classList.add('opacity-100');
                });

                generateLinkButton.addEventListener('click', (event) => {
                    showGeneratedLinkInModal(event, folderId, shareFolderModal);
                })
            });
        };       
    };    
};

const showGeneratedLinkInModal = (event, folderId, modal) => {
    const button = event.target; 
    const duration = modal.querySelector('input[type="radio"]:checked').value;
    const sharedLinkContainer = modal.querySelector('.shared-link-container');

    button.disabled = true;

    fetch('/storage/share', {
            method: 'POST',           
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ folderId, duration })
        })
    .then(response => {
            if(!response.ok) {
                throw new Error('POST /storge/share: response is not ok');
            };

            return response.json();
        })
    .then(data => {            
            sharedLinkContainer.innerHTML = sharedLinkContent(data.url);
            button.disabled = false;            
        });
};

const copyToClipboard = () => {
    const input = document.getElementById("sharedLinkInput");
    const button = document.getElementById("copyLinkButton");

    input.select();    
    navigator.clipboard.writeText(input.value);
    button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M9.993 19.421 3.286 12.58l1.428-1.401 5.293 5.4 9.286-9.286 1.414 1.414L9.993 19.421z"/>
            </svg>
        `;
};

const sharedLinkContent = (url) => {
    return `                    
            <div class="w-full flex justify-between items-center my-2 border rounded-xs border-gray-400 bg-gray-700 gap-1 overflow-hidden">
                <input
                    id="sharedLinkInput" 
                    class="w-full pl-2 py-1 bg-gray-700 border-transparent text-sm text-cyan-500 type="text" value="${url}" disabled
                >                
                <button
                    id="copyLinkButton" 
                    type="button" 
                    class="cursor-pointer bg-gray-400 flex size-8 justify-center items-center border border-gray-400 transition
                           hover:bg-gray-500
                           hover:border-gray-500"
                    onclick="copyToClipboard()"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                    </svg>
                </button>
            </div>           
        
            `
};

const hideModalShareFolder = (modal) => {
    const sharedLinkContainer = modal.querySelector('.shared-link-container');

    sharedLinkContainer.innerHTML = '';
    modal.classList.remove('flex');
    modal.classList.remove('opacity-100');
    modal.classList.add('hidden');
};

function closeModalShareFolder() {
    if (closeShareFolderModalButtons && shareFolderModal) {
        for (const button of closeShareFolderModalButtons) {
            button.addEventListener("click", () => hideModalShareFolder(shareFolderModal));
        };
       
        shareFolderModal.addEventListener("click", () => hideModalShareFolder(shareFolderModal));
        shareFolderForm.addEventListener("click", (e) => {
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
    openShareFolderModal();
    closeModalShareFolder();   
});