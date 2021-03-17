import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CloseModalAction, ClearSearchResultsAction } from '../../store/actions/imagen.actions';
import { AppState } from '../../store/models/app.state';
import { AlbumContentResponse } from '../../store/models/imagen.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {
  searchResults$: Observable<AlbumContentResponse[]>;
  currentFilePath$: Observable<string>;

  constructor(private readonly store: Store<AppState>) { }

  ngOnInit(): void {
    this.searchResults$ = this.store.select((store) => store.Imagen.SearchResults);
    this.currentFilePath$ = this.store.select((store) => store.Imagen.CurrentFilePath);
  }

  closeModal(): void {
    //?. Clear out search results from store
    this.store.dispatch(new ClearSearchResultsAction());
    this.store.dispatch(new CloseModalAction());
  }

}
