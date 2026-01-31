const foldersTree = document.getElementById("foldersTree");
const arrowButtons = foldersTree.querySelectorAll('.arrow-button');

for (const button of arrowButtons) {
    const mainContainer = document.querySelector(`[data-container-id='${button.dataset.id}']`);
    const containers = mainContainer.children;    

    button.addEventListener('click', () => {
        button.classList.toggle('rotate-90');

        for (const container of containers) {
            const folderContainer = container.children; // folder container has parent folder and its child folders and files
           
            for (const child of folderContainer) {
                if (child !== folderContainer[0]) { // excluding the first child because it is the parent folder
                    child.classList.toggle('hidden');
                };    
            };       
        };
    });    
};

// sidebar openFileDetailsModalButtons listeners added in foldersAndFilesDisplay.js
