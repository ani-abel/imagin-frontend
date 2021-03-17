import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SubSink } from 'subsink';
import { AppState } from '../store/models/app.state';
import {
  GetAlbumContentInitiatedAction,
  ModalType,
  OpenModalAction
} from '../store/actions/imagen.actions';
import { AlbumContentResponse } from '../store/models/imagen.model';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styles: []
})
export class PhotoListComponent implements
  OnInit,
  OnDestroy,
  AfterViewInit {
  private subSink: SubSink = new SubSink();
  albumContents$: Observable<AlbumContentResponse[]>;
  currentModal$: Observable<ModalType>;

  constructor(
    private readonly store: Store<AppState>,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    //? If App is refreshed, force users to select folder
    this.subSink.sink =
      this.store
        .select((store) => store.Imagen.CurrentFilePath)
        .subscribe((data: string) => {
          if (data === "/") {
            this.router.navigate(["/auth"]);
          }
        });

    this.currentModal$ = this.store.select((store) => store.Imagen.CurrentModal);
    //? Get the Current folderId from URL
    this.subSink.sink =
      this.activatedRoute
        .params
        .pipe(
          map((data: any) => data.album)
        ).subscribe((album: string) => {
          //? Trigger the effect to get album content
          this.store.dispatch(new GetAlbumContentInitiatedAction(album));
          //? Pull album content from store
          this.albumContents$ = this.store.select((data) => data.Imagen.PictureList);
        });
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  openNewPictureModal(): void {
    this.store.dispatch(new OpenModalAction(ModalType.CREATE_NEW_FILE));
  }

  openGalleryWithoutSlideshowModal(): void {
    this.store.dispatch(new OpenModalAction(ModalType.PHOTO_GALLERY_WITHOUT_SLIDESHOW));
  }

  openGalleryWithSlideshowModal(): void {
    this.store.dispatch(new OpenModalAction(ModalType.PHOTO_GALLERY_SLIDESHOW));
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

}
