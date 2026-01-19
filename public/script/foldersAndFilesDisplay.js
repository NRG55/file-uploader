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
                const optionMenu = container.querySelector(`.option-menu[data-type='${button.dataset.type}'][data-id='${button.dataset.id}']`);

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

function openForm() {
    if (openFormButtons) {
        for (const button of openFormButtons) {
            button.addEventListener("click", () => {
                const form = container.querySelector(`.form[data-type='${button.dataset.type}'][data-id='${button.dataset.id}']`);
                const input = container.querySelector(`.input[data-type='${button.dataset.type}'][data-id='${button.dataset.id}']`);
                const link = container.querySelector(`.link[data-type='${button.dataset.type}'][data-id='${button.dataset.id}']`);

                if (optionMenus) {
                    for (const folderOptionMenu of optionMenus) {
                        folderOptionMenu.classList.add('hidden');                      
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

function closeForm() {
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

document.addEventListener("DOMContentLoaded", () => {
	toggleOptionMenu();
    openForm();
    closeForm();   
});