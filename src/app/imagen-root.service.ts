import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { tap, throttleTime } from "rxjs/operators";
import {
  AuthorizeURLResponse,
  AlbumListResponse,
  AlbumContentResponse,
  CustomAPIType,
  AvailableStorageSpaceResponse,
  AuthorizeUserResponse,
  UploadPicturePayload
} from './store/models/imagen.model';
import { environment } from "../environments/environment";
import { Endpoint } from './utils/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ImagenRootService {
  controllerRoot: string = `${environment.httpRoot}${Endpoint.CONTROLLER_BASE}`;

  constructor(private readonly httpClient: HttpClient) { }

  getAuthorizationLink(): Observable<AuthorizeURLResponse> {
    return this.httpClient
      .get<AuthorizeURLResponse>(`${this.controllerRoot}${Endpoint.AUTHORIZE_DRIVE}`)
      .pipe(
        throttleTime(500)
      );
  }

  getAlbums(): Observable<AlbumListResponse[]> {
    return this.httpClient
      .get<AlbumListResponse[]>(`${this.controllerRoot}${Endpoint.GET_ALBUMS}`)
      .pipe(
        throttleTime(500)
      )
  }

  getAlbumContents(folderId: string): Observable<AlbumContentResponse[]> {
    return this.httpClient
      .get<AlbumContentResponse[]>(`${this.controllerRoot}${Endpoint.GET_ABLUM_CONTENT}?folderId=${folderId}`)
      .pipe(
        throttleTime(500)
      )
  }

  emptyTrash(): Observable<CustomAPIType> {
    return this.httpClient
      .delete<CustomAPIType>(`${this.controllerRoot}${Endpoint.EMPTY_TRASH}`)
      .pipe(
        throttleTime(500)
      )
  }

  getAvailableDriveSpace(): Observable<AvailableStorageSpaceResponse> {
    return this.httpClient
      .get<AvailableStorageSpaceResponse>(`${this.controllerRoot}${Endpoint.AVAIABLE_DRIVE_SPACE}`)
      .pipe(
        throttleTime(500)
      )
  }

  searchAlbums(payload: { searchQuery: string, folderId: string }): Observable<AlbumContentResponse[]> {
    const { searchQuery, folderId } = payload;
    return this.httpClient
      .get<AlbumContentResponse[]>(`${this.controllerRoot}${Endpoint.SEARCH_ALBUM}?searchQuery=${searchQuery}&folderId=${folderId}`)
      .pipe(
        throttleTime(500)
      )
  }

  deletePicture(fileId: string): Observable<CustomAPIType> {
    return this.httpClient
      .delete<CustomAPIType>(`${this.controllerRoot}${Endpoint.DELETE_PICTURE}?fileId=${fileId}`)
      .pipe(
        throttleTime(500)
      )
  }

  createAlbum(albumName: string): Observable<AlbumListResponse> {
    return this.httpClient
      .get<AlbumListResponse>(`${this.controllerRoot}${Endpoint.CREATE_ALBUM}?folderName=${albumName}`)
      .pipe(
        throttleTime(500)
      )
  }

  uploadPictures(payload: UploadPicturePayload): Observable<AlbumContentResponse[]> {
    const { Files, FolderId } = payload;
    const formdata: FormData = new FormData();
    if (Files?.length > 0) {
      for (const file of Files) {
        formdata.append("files[]", file);
      }
    }
    return this.httpClient
      .post<AlbumContentResponse[]>(`${this.controllerRoot}${Endpoint.UPLOAD_PICTURE}?folderId=${FolderId}`, formdata)
      .pipe(
        throttleTime(500)
      );
  }

  getUserDetails(): Observable<AuthorizeUserResponse> {
    return this.httpClient.get<AuthorizeUserResponse>(`${this.controllerRoot}${Endpoint.GET_USER_INFO}`)
      .pipe(
        throttleTime(500),
      );
  }
}
