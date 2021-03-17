import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ModalType, SetFilePathAction } from '../store/actions/imagen.actions';
import { AppState } from '../store/models/app.state';
import {
  AuthorizeUserResponse,
  CustomAPIType,
  AvailableStorageSpaceResponse
} from '../store/models/imagen.model';

@Component({
  selector: 'app-auth-routes',
  templateUrl: './auth-routes.component.html',
  styles: []
})
export class AuthRoutesComponent implements OnInit, AfterViewInit {
  loading$: Observable<boolean>;
  currentFilePath$: Observable<string>;
  userDetails$: Observable<AuthorizeUserResponse>;
  apiMessage$: Observable<CustomAPIType>;
  driveSpace$: Observable<AvailableStorageSpaceResponse>;
  currentModal$: Observable<ModalType>;

  constructor(
    private readonly store: Store<AppState>,
    private readonly changeDetectionRef: ChangeDetectorRef,
    private readonly router: Router
  ) { }

  ngAfterViewInit() {
    //?- This make it possible for components to be loaded dynamically based on values stored in state
    this.changeDetectionRef.detectChanges();
  }

  ngOnInit(): void {
    this.userDetails$ = this.store.select((store) => store.Imagen.UserDetails);
    this.loading$ = this.store.select((store) => store.Imagen.IsLoading);
    this.currentFilePath$ = this.store.select((store) => store.Imagen.CurrentFilePath);
    this.apiMessage$ = this.store.select((store) => store.Imagen.ApiMessage);
    this.driveSpace$ = this.store.select((store) => store.Imagen.DriveSpace);
    this.currentModal$ = this.store.select((store) => store.Imagen.CurrentModal);
  }

  resetPath(): void {
    this.store.dispatch(new SetFilePathAction("/"));
    this.router.navigate(["/auth"]);
  }

}
