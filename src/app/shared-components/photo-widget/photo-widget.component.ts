import { Component, OnInit, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import { AlbumContentResponse } from '../../store/models/imagen.model';
import { AppState } from '../../store/models/app.state';
import {
  DeletePictureInitiatedAction,
  SelectPictureAction,
  OpenModalAction,
  ModalType
} from '../../store/actions/imagen.actions';

@Component({
  selector: 'app-photo-widget',
  templateUrl: './photo-widget.component.html',
  styles: []
})
export class PhotoWidgetComponent implements OnInit {
  @Input() albumContent: AlbumContentResponse;

  constructor(private readonly store: Store<AppState>) { }

  ngOnInit(): void { }

  deletePicture(): void {
    if (this.albumContent?.FileId) {
      this.store.dispatch(new DeletePictureInitiatedAction(this.albumContent.FileId));
    }
  }

  openPicture(): void {
    this.store.dispatch(new SelectPictureAction(this.albumContent));
    this.store.dispatch(new OpenModalAction(ModalType.PHOTO_GALLERY_DISPLAY_SINGLE_PICTURE));
  }
}
