import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AlbumListResponse } from '../../store/models/imagen.model';
import { AppState } from '../../store/models/app.state';
import { OpenAlbumAction } from '../../store/actions/imagen.actions';

@Component({
  selector: 'app-album-widget',
  templateUrl: './album-widget.component.html',
  styles: []
})
export class AlbumWidgetComponent implements OnInit {
  @Input() album: AlbumListResponse;

  constructor(
    private readonly store: Store<AppState>,
    private readonly router: Router
  ) { }

  ngOnInit(): void { }

  openAlbum(): void {
    //?- Deplay for 3seconds and try to simulate "long-press"
    // setTimeout(() => {
    //   this.store.dispatch(new OpenAlbumAction(this.album));
    //   this.router.navigate(["/auth", "photo-list", this.album.FolderId]);
    // }, 3000)
    this.store.dispatch(new OpenAlbumAction(this.album));
    this.router.navigate(["/auth", "photo-list", this.album.FolderId]);
  }

  //TODO Delete folder

}
