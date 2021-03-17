import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from "@ngrx/store";
import { SubSink } from "subsink";
import { CloseModalAction } from '../../store/actions/imagen.actions';
import { AppState } from '../../store/models/app.state';
import { AlbumContentResponse } from '../../store/models/imagen.model';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styles: []
})
export class ImageGalleryComponent implements
  OnInit,
  OnDestroy {
  currentImageLocation: number = 1;
  albumContents: AlbumContentResponse[];
  private subSink: SubSink = new SubSink();

  constructor(private readonly store: Store<AppState>) { }

  ngOnInit(): void {
    this.subSink.sink =
      this.store
        .select((store) => store.Imagen.PictureList)
        .subscribe((data: AlbumContentResponse[]) => this.albumContents = data);
  }

  closeModal(): void {
    this.store.dispatch(new CloseModalAction());
  }

  previousImage(): void {
    this.currentImageLocation -= 1;
  }

  nextImage(): void {
    this.currentImageLocation += 1;
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

}
