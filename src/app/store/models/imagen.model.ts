import { ModalType } from '../actions/imagen.actions';

export const TOTAL_FILE_ALLOWED_PER_UPLOAD = 20;

export const DEFAULT_FILE_SIZE = 5 * 1048576;

export enum OperationStatus {
  SUCCESSFULL = "SUCCESSFUL",
  FAILED = "FAILED"
}

export class AuthorizeUserResponse {
  Token: string;

  Username: string;

  ProfileImage: string;

  FirstName: string;

  LastName: string;
}

export class AlbumListResponse {
  FolderId: string;

  FolderName: string;

  ParentId: string;
}

export class AlbumContentResponse {
  FileId: string;

  FileName: string;

  ParentId: string;

  ViewLink: string;//Same as Download link
}

export class AvailableStorageSpaceResponse {
  TotalSpaceInMB: number;

  UsedSpaceInMB: number
}

export class CustomAPIType {
  Message: string;

  OperationType: OperationStatus;
}

export class AuthorizeURLResponse {
  AuthURL: string;
}

export class UploadPicturePayload {
  Files: File[];
  FolderId: string;
}


export interface ImagenAppState {
  CurrentFilePath: string;
  IsLoading: boolean;
  IsAuthorized: boolean;
  UserDetails: AuthorizeUserResponse;
  SearchResults: AlbumContentResponse[];
  SearchQuery: string;
  CurrentFolderId: string;
  PictureList: AlbumContentResponse[];
  SelectedPicture: AlbumContentResponse;
  AlbumList: AlbumListResponse[];
  ApiMessage: CustomAPIType;
  DriveSpace: AvailableStorageSpaceResponse;
  Error: Error;
  CurrentModal: ModalType;
}
