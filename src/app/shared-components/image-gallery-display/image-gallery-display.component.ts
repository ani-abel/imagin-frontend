import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from "@ngrx/store";
import { AlbumContentResponse } from '../../store/models/imagen.model';
import { SubSink } from 'subsink';
import { AppState } from '../../store/models/app.state';
import { CloseModalAction } from '../../store/actions/imagen.actions';

@Component({
  selector: 'app-image-gallery-display',
  templateUrl: './image-gallery-display.component.html',
  styles: []
})
export class ImageGalleryDisplayComponent implements
  OnInit,
  OnDestroy {
  albumContent: AlbumContentResponse;
  private subSink: SubSink = new SubSink();

  constructor(private readonly store: Store<AppState>) { }

  ngOnInit(): void {
    this.subSink.sink =
      this.store
        .select((store) => store.Imagen.SelectedPicture)
        .subscribe((data: AlbumContentResponse) => this.albumContent = data);
  }

  closeModal(): void {
    this.store.dispatch(new CloseModalAction());
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

}
