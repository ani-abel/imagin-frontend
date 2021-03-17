import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from "@ngrx/store";
import { interval } from "rxjs";
import { timeInterval, map } from "rxjs/operators";
import { SubSink } from "subsink";
import { AppState } from '../../store/models/app.state';
import { CloseModalAction } from '../../store/actions/imagen.actions';
import { AlbumContentResponse } from '../../store/models/imagen.model';

@Component({
  selector: 'app-image-gallery-slideshow',
  templateUrl: './image-gallery-slideshow.component.html',
  styles: []
})
export class ImageGallerySlideshowComponent implements
  OnInit,
  OnDestroy {
  albumContents: AlbumContentResponse[];
  private subSink: SubSink = new SubSink();
  currentImageLocation: number = 1;

  constructor(private readonly store: Store<AppState>) { }

  ngOnInit(): void {
    this.subSink.sink =
      this.store
        .select((store) => store.Imagen.PictureList)
        .subscribe((data: AlbumContentResponse[]) => this.albumContents = data);

    //? set the time to change the image
    //? Slideshow begins every 10 seconds
    this.subSink.sink =
      interval(10000).pipe(
        timeInterval(),
        map(res => res.value)
      ).subscribe((data: number) => {
        if (this.currentImageLocation < (this.albumContents?.length - 1)) {
          this.currentImageLocation += 1;
        }
        else {
          //? Restart the slideshow
          this.currentImageLocation = 1;
        }
      })
  }

  closeModal(): void {
    this.store.dispatch(new CloseModalAction());
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
