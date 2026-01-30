import { Router } from "express";
import { indexPageGet, sharedFolderGet } from "../controllers/indexController.js";
import { downloadFileGet } from "../controllers/storageController.js";

const indexRouter = Router();

indexRouter.get('/', indexPageGet);

indexRouter.get('/share/:sharedLinkId', sharedFolderGet);
indexRouter.get('/share/:sharedLinkId/:folderId', sharedFolderGet);
indexRouter.get('/share/:sharedLinkId/download-file/:fileId', downloadFileGet);

export default indexRouter;