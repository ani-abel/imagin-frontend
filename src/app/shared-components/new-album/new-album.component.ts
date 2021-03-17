import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from 'rxjs';
import { AppState } from '../../store/models/app.state';
import { CloseModalAction, CreateAlbumInitiatedAction } from '../../store/actions/imagen.actions';

@Component({
  selector: 'app-new-album',
  templateUrl: './new-album.component.html',
  styles: []
})
export class NewAlbumComponent implements OnInit {
  currentFilePath$: Observable<string>;
  newAlbumForm: FormGroup;

  constructor(private readonly store: Store<AppState>) { }

  ngOnInit(): void {
    this.currentFilePath$ = this.store.select((store) => store.Imagen.CurrentFilePath);
    this.initForm();
  }

  closeModal(): void {
    this.store.dispatch(new CloseModalAction());
  }

  onSubmit(): void {
    if (this.newAlbumForm.invalid) {
      return;
    }
    const { albumName } = this.newAlbumForm.value;
    this.store.dispatch(new CreateAlbumInitiatedAction(albumName));
    //!!! Clear the form
    this.newAlbumForm.reset();
  }

  initForm(): void {
    this.newAlbumForm = new FormGroup({
      albumName: new FormControl(null, Validators.required)
    });
  }
}
