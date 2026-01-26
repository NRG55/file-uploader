import cloudinary from "../config/cloudinary.js";
import { getChildFoldersIds } from "./storageService.js";

export const deleteFolderFromCloudinary = async (userId, folderId) => {
    const childFolderIds = await getChildFoldersIds(userId, folderId);
    childFolderIds.push(folderId);

    for (const folderId of childFolderIds) {
        const folderName = `folder-${folderId}`;
        const rootFolderPath = `file-uploader/user-${userId}/`;
        const folderPath = `file-uploader/user-${userId}/folder-${folderId}`;
        
        const subfoldersResult = await cloudinary.api.sub_folders(rootFolderPath);       
        const cloudinarySubfolders = subfoldersResult.folders;       

        for (const folder of cloudinarySubfolders) {
            if (folder.name === folderName) {                
                const assets = await cloudinary.api.resources_by_asset_folder(folderPath);
                const assetsIds = [];

                if (assets && assets.resources.length > 0) {
                    for (const asset of assets.resources) {
                        assetsIds.push(asset.asset_id)
                    };                   
                };

                await cloudinary.api.delete_resources_by_asset_ids(assetsIds);
                await cloudinary.api.delete_folder(folderPath);                
            };
        };     
    };    
};