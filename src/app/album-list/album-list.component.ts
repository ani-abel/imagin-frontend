import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  GetUserDataInitiatedAction,
  GetAlbumListInitiatedAction
} from '../store/actions/imagen.actions';
import { AppState } from '../store/models/app.state';
import { AlbumListResponse } from '../store/models/imagen.model';
import { SetFilePathAction } from '../store/actions/imagen.actions';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styles: []
})
export class AlbumListComponent implements OnInit {
  albums$: Observable<AlbumListResponse[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new SetFilePathAction("/"));
    this.store.dispatch(new GetAlbumListInitiatedAction());
    this.store.dispatch(new GetUserDataInitiatedAction());
    this.albums$ = this.store.select((store) => store.Imagen.AlbumList);
  }

}
