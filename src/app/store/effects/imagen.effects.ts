import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { tap, mergeMap, map, catchError, switchMap } from "rxjs/operators";
import { ImagenRootService } from '../../imagen-root.service';
import {
  CustomAPIType,
  AuthorizeUserResponse
} from '../models/imagen.model';
import {
  GetUserDataFailedAction,
  GetUserDataInitiatedAction,
  GetUserDataSuccessfulAction
} from '../actions/imagen.actions';
import {
  GetAlbumListInitiatedAction,
  CreateAlbumInitiatedAction,
  ImagenActionType,
  GetAlbumListSuccessfulAction,
  GetAlbumListFailedAction,
  SearchInitiatedAction,
  SearchFailedAction,
  GetDriveSpaceInitiatedAction,
  GetDriveSpaceSuccessfulAction,
  GetDriveSpaceFailedAction,
  GetAlbumContentInitiatedAction,
  GetAlbumContentSuccessfulAction,
  UploadPictureFailedAction,
  GetAlbumContentFailedAction,
  SearchSuccessfulAction,
  CreateAlbumSuccessfulAction,
  EmptyTrashInitiated,
  EmptyTrashSuccessful,
  EmptyTrashFailed,
  DeletePictureInitiatedAction,
  DeletePictureSuccessfulAction,
  DeletePictureFailedAction,
  UploadPictureInitiatedAction,
  UploadPictureSuccessfulAction
} from '../actions/imagen.actions';
import {
  AlbumListResponse,
  AvailableStorageSpaceResponse,
  AlbumContentResponse
} from '../models/imagen.model';


@Injectable({
  providedIn: "root"
})
export class ImagenEffects {
  constructor(
    private readonly imagenRootSrv: ImagenRootService,
    private readonly actions$: Actions
  ) { }

  //? Get Album List
  @Effect() loadAlbumList$ = this.actions$
    .pipe(
      ofType<GetAlbumListInitiatedAction>(ImagenActionType.GET_ALBUM_LIST_INITIATED),
      mergeMap(() => this.imagenRootSrv.getAlbums())
    )
    .pipe(
      map((data: AlbumListResponse[]) => new GetAlbumListSuccessfulAction(data)),
      catchError((error: Error) => of(new GetAlbumListFailedAction(error)))
    );

  //? Get Drive Space
  @Effect() loadDriveSpace$ = this.actions$
    .pipe(
      ofType<GetDriveSpaceInitiatedAction>(ImagenActionType.GET_DRIVE_SPACE_INITIATED),
      mergeMap(() => this.imagenRootSrv.getAvailableDriveSpace())
    )
    .pipe(
      map((data: AvailableStorageSpaceResponse) => new GetDriveSpaceSuccessfulAction(data)),
      catchError((error: Error) => of(new GetDriveSpaceFailedAction(error)))
    )

  //? Get Album content
  /**
   * ? Use switchMap operator when access to the action's payload is needed
   */
  @Effect() loadAlbumContent$ = this.actions$
    .pipe(
      ofType<GetAlbumContentInitiatedAction>(ImagenActionType.GET_ALBUM_CONTENT_INITIATED),
      switchMap((action) => {
        return this.imagenRootSrv
          .getAlbumContents(action.payload)
          .pipe(
            map((data: AlbumContentResponse[]) => new GetAlbumContentSuccessfulAction(data)),
            catchError((error: Error) => of(new GetAlbumContentFailedAction(error))),
          )
      })
    )

  //? Search
  @Effect() loadSearchResults = this.actions$
    .pipe(
      ofType<SearchInitiatedAction>(ImagenActionType.SEARCH_INITIATED),
      switchMap((action) => {
        return this.imagenRootSrv
          .searchAlbums(action.payload)
          .pipe(
            map((data: AlbumContentResponse[]) => new SearchSuccessfulAction(data)),
            catchError((error: Error) => of(new SearchFailedAction(error)))
          )
      })
    )

  //? Create Album
  @Effect() createAlbum = this.actions$
    .pipe(
      ofType<CreateAlbumInitiatedAction>(ImagenActionType.CREATE_ALBUM_INITIATED),
      switchMap((action) => {
        return this.imagenRootSrv
          .createAlbum(action.payload)
          .pipe(
            map((data: AlbumListResponse) => new CreateAlbumSuccessfulAction(data)),
            catchError((error: Error) => of(new SearchFailedAction(error)))
          )
      })
    )

  //? Empty trash bin
  @Effect() emptyTrash$ = this.actions$
    .pipe(
      ofType<EmptyTrashInitiated>(ImagenActionType.EMPTY_TRASH_INITIATED),
      mergeMap(() => this.imagenRootSrv.emptyTrash()),
    )
    .pipe(
      map((data: CustomAPIType) => new EmptyTrashSuccessful(data)),
      catchError((error: Error) => of(new EmptyTrashFailed(error)))
    );

  //? Delete picture
  @Effect() deletePicture$ = this.actions$
    .pipe(
      ofType<DeletePictureInitiatedAction>(ImagenActionType.DELETE_PICTURE_INITIATED),
      switchMap((action) => {
        return this.imagenRootSrv
          .deletePicture(action.payload)
          .pipe(
            map((data: CustomAPIType) => new DeletePictureSuccessfulAction(data)),
            catchError((error: Error) => of(new DeletePictureFailedAction(error)))
          )
      })
    )

  //? Upload files
  @Effect() uploadPictures$ = this.actions$
    .pipe(
      ofType<UploadPictureInitiatedAction>(ImagenActionType.UPLOAD_PICTURE_INITIATED),
      switchMap((action) => {
        return this.imagenRootSrv
          .uploadPictures(action.payload)
          .pipe(
            map((data: AlbumContentResponse[]) => new UploadPictureSuccessfulAction(data)),
            catchError((error: Error) => of(new UploadPictureFailedAction(error)))
          )
      })
    )

  @Effect() loadUserDetails$ = this.actions$
    .pipe(
      ofType<GetUserDataInitiatedAction>(ImagenActionType.GET_USER_DATA_INITIATED),
      mergeMap(() => this.imagenRootSrv.getUserDetails())
    )
    .pipe(
      map((data: AuthorizeUserResponse) => new GetUserDataSuccessfulAction(data)),
      catchError((error: Error) => of(new GetUserDataFailedAction(error)))
    );
}
