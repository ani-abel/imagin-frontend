import { Action } from "@ngrx/store";
import {
  UploadPicturePayload,
  AlbumContentResponse,
  AlbumListResponse,
  AuthorizeUserResponse,
  AvailableStorageSpaceResponse,
  CustomAPIType
} from '../models/imagen.model';

export enum ModalType {
  CREATE_NEW_ALBUM = "CREATE_NEW_ALBUM",
  CREATE_NEW_FILE = "CREATE_NEW_FILE",
  SEARCH_FILES = "SEARCH_FILES",
  PHOTO_GALLERY_SLIDESHOW = "PHOTO_GALLERY_SLIDESHOW",
  PHOTO_GALLERY_WITHOUT_SLIDESHOW = "PHOTO_GALLERY_WITHOUT_SLIDESHOW",
  PHOTO_GALLERY_DISPLAY_SINGLE_PICTURE = "PHOTO_GALLERY_DISPLAY_SINGLE_PICTURE"
}

export enum ImagenActionType {
  AUTHORIZE_USER = "[AUTH] AUTHORIZE_USER",

  ADD_NEW_ALBUM = "[ALBUM] ADD_NEW_ALBUM",
  CLEAR_API_MESSAGE = "[API_MESSAGE] CLEAR_API_MESSAGE",
  OPEN_MODAL = "[MODAL] OPEN_MODAL",
  CLOSE_MODAL = "[MODAL] CLOSE_MODAL",
  SET_FILE_PATH = "[PATH] SET_FILE_PATH",
  WRITE_API_MESSAGE = "[API_MESSAGE] WRITE_API_MESSAGE",
  /**
   * !!!Triggered when a user double clicks on a album
   */
  OPEN_ALBUM = "[ALBUM] OPEN_ALBUM",
  GET_ALBUM_LIST_INITIATED = "[ALBUM] GET_ALBUM_LIST_INITIATED",
  GET_ALBUM_LIST_SUCCESSFUL = "[ALBUM] GET_ALBUM_LIST_SUCCESSFUL",
  GET_ALBUM_LIST_FAILED = "[ALBUM] GET_ALBUM_LIST_FAILED",
  SELECT_PICTURE = "[PICTURES] SELECT_PICTURE",

  GET_DRIVE_SPACE_INITIATED = "[DRIVE_SPACE] GET_DRIVE_SPACE_INITIATED",
  GET_DRIVE_SPACE_SUCCESSFUL = "[DRIVE_SPACE] GET_DRIVE_SPACE_SUCCESSFUL",
  GET_DRIVE_SPACE_FAILED = "[DRIVE_SPACE] GET_DRIVE_SPACE_FAILED",
  CLEAR_DRIVE_SPACE = "[DRIVE_SPACE] CLEAR_DRIVE_SPACE",

  GET_ALBUM_CONTENT_INITIATED = "[PICTURES] GET_ALBUM_CONTENT_INITIATED",
  GET_ALBUM_CONTENT_SUCCESSFUL = "[PICTURES] GET_ALBUM_CONTENT_SUCCESSFUL",
  GET_ALBUM_CONTENT_FAILED = "[PICTURES] GET_ALBUM_CONTENT_FAILED",

  SEARCH_INITIATED = "[SEARCH] SEARCH_INITIATED",
  SEARCH_SUCCESSFUL = "[SEARCH] SEARCH_SUCCESSFUL",
  SEARCH_FAILED = "[SEARCH] SEARCH_FAILED",
  CLEAR_SEARCH_RESULTS = "[SEARCH] CLEAR_SEARCH_RESULTS",

  CREATE_ALBUM_INITIATED = "[ALBUM_CREATION] CREATE_ALBUM_INITIATED",
  CREATE_ALBUM_SUCCESSFUL = "[ALBUM_CREATION] CREATE_ALBUM_SUCCESSFUL",
  CREATE_ALBUM_FAILED = "[ALBUM_CREATION] CREATE_ALBUM_FAILED",

  DELETE_PICTURE_INITIATED = "[PICTURE_DELETION] DELETE_PICTURE_INITIATED",
  DELETE_PICTURE_SUCCESSFUL = "[PICTURE_DELETION] DELETE_PICTURE_SUCCESSFUL",
  DELETE_PICTURE_FAILED = "[PICTURE_DELETION] DELETE_PICTURE_FAILED",

  DOWNLOAD_INITIATED = "[PCITURE_DOWNLOAD] DOWNLOAD_INITIATED",
  DOWNLOAD_SUCCESSFUL = "[PICTURE_DOWNLOAD] DOWNLOAD_SUCCESSFUL",
  DOWNLOAD_FAILED = "[PICTURE_DOWNLOAD] DOWNLOAD_FAILED",

  EMPTY_TRASH_INITIATED = "[EMPTY_TRASH] EMPTY_TRASH_INITIATED",
  EMPTY_TRASH_FAILED = "[EMPTY_TRASH] EMPTY_TRASH_FAILED",
  EMPTY_TRASH_SUCCESSFUL = "[EMPTY_TRASH] EMPTY_TRASH_SUCCESSFUL",

  UPLOAD_PICTURE_INITIATED = "[UPLOAD_PICTURE] UPLOAD_PICTURE_INITIATED",
  UPLOAD_PICTURE_SUCCESSFUL = "[UPLOAD_PICTURE] UPLOAD_PICTURE_SUCCESSFUL",
  UPLOAD_PICTURE_FAILED = "[UPLOAD_PICTURE] UPLOAD_PICTURE_FAILED",

  GET_USER_DATA_INITIATED = "[GET_USER_DATA] GET_USER_DATA_INITIATED",
  GET_USER_DATA_SUCCESSFUL = "[GET_USER_DATA] GET_USER_DATA_SUCCESSFUL",
  GET_USER_DATA_FAILED = "[GET_USER_DATA] GET_USER_DATA_FAILED"
}


export class AuthorizeUserAction implements Action {
  readonly type = ImagenActionType.AUTHORIZE_USER;

  constructor(public payload: AuthorizeUserResponse) { }
}

export class AddNewAlbumAction implements Action {
  readonly type = ImagenActionType.ADD_NEW_ALBUM;

  constructor(public payload: AlbumListResponse) { }
}


export class OpenAlbumAction implements Action {
  readonly type = ImagenActionType.OPEN_ALBUM;

  //Takes the "folderId" of the album to be opened
  constructor(public payload: AlbumListResponse) { }
}

export class GetAlbumListInitiatedAction implements Action {
  readonly type = ImagenActionType.GET_ALBUM_LIST_INITIATED;
}

export class GetAlbumListSuccessfulAction implements Action {
  readonly type = ImagenActionType.GET_ALBUM_LIST_SUCCESSFUL;

  constructor(public payload: AlbumListResponse[]) { }
}

export class GetAlbumListFailedAction implements Action {
  readonly type = ImagenActionType.GET_ALBUM_LIST_FAILED;

  constructor(public payload: Error) { }
}

export class GetDriveSpaceInitiatedAction implements Action {
  readonly type = ImagenActionType.GET_DRIVE_SPACE_INITIATED;
}

export class GetDriveSpaceSuccessfulAction implements Action {
  readonly type = ImagenActionType.GET_DRIVE_SPACE_SUCCESSFUL;

  constructor(public payload: AvailableStorageSpaceResponse) { }
}

export class GetDriveSpaceFailedAction implements Action {
  readonly type = ImagenActionType.GET_DRIVE_SPACE_FAILED;

  constructor(public payload: Error) { }
}

export class GetAlbumContentInitiatedAction implements Action {
  readonly type = ImagenActionType.GET_ALBUM_CONTENT_INITIATED;

  constructor(public payload: any) { }
}

export class GetAlbumContentSuccessfulAction implements Action {
  readonly type = ImagenActionType.GET_ALBUM_CONTENT_SUCCESSFUL;

  constructor(public payload: AlbumContentResponse[]) { }
}

export class GetAlbumContentFailedAction implements Action {
  readonly type = ImagenActionType.GET_ALBUM_CONTENT_FAILED;

  constructor(public payload: Error) { }
}

export class SearchInitiatedAction implements Action {
  readonly type = ImagenActionType.SEARCH_INITIATED;

  //search parameter
  constructor(public payload: { searchQuery: string, folderId: string }) { }
}

export class SearchSuccessfulAction implements Action {
  readonly type = ImagenActionType.SEARCH_SUCCESSFUL;

  //Returs a list of Pictures in a given folder
  constructor(public payload: AlbumContentResponse[]) { }
}

export class SearchFailedAction implements Action {
  readonly type = ImagenActionType.SEARCH_FAILED;
  constructor(public payload: Error) { }
}

export class ClearSearchResultsAction implements Action {
  readonly type = ImagenActionType.CLEAR_SEARCH_RESULTS;
}

export class CreateAlbumInitiatedAction implements Action {
  readonly type = ImagenActionType.CREATE_ALBUM_INITIATED;

  constructor(public payload: string) { }
}

export class CreateAlbumSuccessfulAction implements Action {
  readonly type = ImagenActionType.CREATE_ALBUM_SUCCESSFUL;

  //TODO: Return the "Folder" object from the backend after creating an Album
  constructor(public payload: AlbumListResponse) { }
}

export class CreateAlbumFailedAction implements Action {
  readonly type = ImagenActionType.CREATE_ALBUM_FAILED;

  constructor(public payload: Error) { }
}

export class DeletePictureInitiatedAction implements Action {
  readonly type = ImagenActionType.DELETE_PICTURE_INITIATED;

  //? Refers to the "fileId" to be deleted
  constructor(public payload: string) { }
}

export class DeletePictureSuccessfulAction implements Action {
  readonly type = ImagenActionType.DELETE_PICTURE_SUCCESSFUL;

  //? After a file is deleted a message object is sent back and stored to state
  constructor(public payload: CustomAPIType) { }
}

export class DeletePictureFailedAction implements Action {
  readonly type = ImagenActionType.DELETE_PICTURE_FAILED;

  constructor(public payload: Error) { }
}

export class DownloadInitiatedAction implements Action {
  readonly type = ImagenActionType.DOWNLOAD_INITIATED;

  constructor(public payload: any) { }
}

export class DownloadSuccessfulAction implements Action {
  readonly type = ImagenActionType.DOWNLOAD_SUCCESSFUL;

  constructor(public payload: any) { }
}

export class DownloadFailedAction implements Action {
  readonly type = ImagenActionType.DOWNLOAD_FAILED;

  constructor(public payload: Error) { }
}

export class EmptyTrashInitiated implements Action {
  readonly type = ImagenActionType.EMPTY_TRASH_INITIATED;
}

export class EmptyTrashSuccessful implements Action {
  readonly type = ImagenActionType.EMPTY_TRASH_SUCCESSFUL;

  constructor(public payload: CustomAPIType) { }
}

export class EmptyTrashFailed implements Action {
  readonly type = ImagenActionType.EMPTY_TRASH_FAILED;

  constructor(public payload: Error) { }
}

export class UploadPictureInitiatedAction implements Action {
  readonly type = ImagenActionType.UPLOAD_PICTURE_INITIATED;

  constructor(public payload: UploadPicturePayload) { }
}

export class UploadPictureSuccessfulAction implements Action {
  readonly type = ImagenActionType.UPLOAD_PICTURE_SUCCESSFUL;

  constructor(public payload: AlbumContentResponse[]) { }
}

export class UploadPictureFailedAction implements Action {
  readonly type = ImagenActionType.UPLOAD_PICTURE_FAILED;

  constructor(public payload: Error) { }
}

export class GetUserDataInitiatedAction implements Action {
  readonly type = ImagenActionType.GET_USER_DATA_INITIATED;
}

export class GetUserDataSuccessfulAction implements Action {
  readonly type = ImagenActionType.GET_USER_DATA_SUCCESSFUL;

  constructor(public payload: AuthorizeUserResponse) { }
}

export class GetUserDataFailedAction implements Action {
  readonly type = ImagenActionType.GET_USER_DATA_FAILED;

  constructor(public payload: Error) { }
}

export class ClearAPIMessageAction implements Action {
  readonly type = ImagenActionType.CLEAR_API_MESSAGE;
}

export class ClearDriveSpaceAction implements Action {
  readonly type = ImagenActionType.CLEAR_DRIVE_SPACE;
}

export class OpenModalAction implements Action {
  readonly type = ImagenActionType.OPEN_MODAL;

  constructor(public payload: ModalType) { }
}

export class CloseModalAction implements Action {
  readonly type = ImagenActionType.CLOSE_MODAL;
}

export class SetFilePathAction implements Action {
  readonly type = ImagenActionType.SET_FILE_PATH;

  constructor(public payload: string) { }
}

export class WriteAPIMessageAction implements Action {
  readonly type = ImagenActionType.WRITE_API_MESSAGE;

  constructor(public payload: CustomAPIType) { }
}

export class SelectPictureAction implements Action {
  readonly type = ImagenActionType.SELECT_PICTURE;

  constructor(public payload: AlbumContentResponse) { }
}

export type ImagenAction =
  | AuthorizeUserAction
  | AddNewAlbumAction
  | OpenAlbumAction
  | GetAlbumListInitiatedAction
  | GetAlbumListSuccessfulAction
  | GetAlbumListFailedAction
  | GetDriveSpaceInitiatedAction
  | GetDriveSpaceSuccessfulAction
  | GetDriveSpaceFailedAction
  | GetAlbumContentInitiatedAction
  | GetAlbumContentSuccessfulAction
  | GetAlbumContentFailedAction
  | SearchInitiatedAction
  | SearchSuccessfulAction
  | SearchFailedAction
  | ClearSearchResultsAction
  | CreateAlbumInitiatedAction
  | CreateAlbumSuccessfulAction
  | CreateAlbumFailedAction
  | DeletePictureInitiatedAction
  | DeletePictureSuccessfulAction
  | DeletePictureFailedAction
  | DownloadInitiatedAction
  | DownloadSuccessfulAction
  | DownloadFailedAction
  | EmptyTrashFailed
  | EmptyTrashInitiated
  | EmptyTrashSuccessful
  | UploadPictureFailedAction
  | UploadPictureSuccessfulAction
  | UploadPictureInitiatedAction
  | GetUserDataSuccessfulAction
  | GetUserDataFailedAction
  | GetUserDataInitiatedAction
  | ClearAPIMessageAction
  | ClearDriveSpaceAction
  | OpenModalAction
  | CloseModalAction
  | SetFilePathAction
  | WriteAPIMessageAction
  | SelectPictureAction;
