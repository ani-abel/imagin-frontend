export enum Endpoint {
  CONTROLLER_BASE = "/google-drive-endpoints",
  CREATE_ALBUM = "/create-folder",
  UPLOAD_PICTURE = "/upload-files",
  AUTHORIZE_DRIVE = "/authorize-drive",
  AVAIABLE_DRIVE_SPACE = "/get-available-drive-space",
  SEARCH_ALBUM = "/search-folder",
  DOWNLOAD_FILE = "/download-file",
  GET_ABLUM_CONTENT = "/get-folder-content",
  GET_ALBUMS = "/get-folders",
  DELETE_PICTURE = "/delete-file",
  EMPTY_TRASH = "/empty-trash",
  GET_USER_INFO = "/get-user-details"
}

export enum LocalStorageKey {
  IMAGEN = "Imagen",
  USERNAME = "Username",
  IMAGE_PATH = "ImagePath",
  TOKEN = "Token"
}

export enum CloudProvider {
  GOOGLE = "GOOGLE",
  DROPBOX = "DROPBOX"
}