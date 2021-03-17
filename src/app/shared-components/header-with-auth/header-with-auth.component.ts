import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { SubSink } from "subsink";
import {
  AuthorizeUserResponse,
  CustomAPIType,
  OperationStatus
} from '../../store/models/imagen.model';
import { AppState } from '../../store/models/app.state';
import {
  SearchInitiatedAction,
  OpenModalAction,
  ModalType,
  WriteAPIMessageAction
} from '../../store/actions/imagen.actions';
import { clearLocalStorage } from '../../utils/shared.functions';

@Component({
  selector: 'app-header-with-auth',
  template: `
  <button
    (click)="logout()"
    type="button"
    title="LOG OUT"
    class="btn btn-danger toggle-button toggle-button-left"
    id="toggle-button"
    title="Menu">
      <i class="fa fa-power-off"></i>
    </button>

    <div class="profile-image" *ngIf="userData?.ProfileImage">
        <img [src]="userData?.ProfileImage" [alt]="userData?.Username" [title]="userData?.Username">
    </div>
     <header class="baseline-section text-center">
            <h1 class="app-title no-margin pt-20">IMAGEN</h1>
            <nav class="text-center" *ngIf="folderId && currentFilePath !== '/'">
                <form
                  class="no-margin no-padding"
                  id="open-search-modal"
                  [formGroup]="searchForm"
                  (ngSubmit)="onSubmit()">
                    <input
                      [formControlName]="'search'"
                      type="search"
                      [placeholder]="'Search '+currentFilePath"
                      spellcheck="false"
                      id="search-value" />
                </form>
             </nav>
        </header>
  `,
  styles: [`
  .baseline-section {
    height: 40vh;
  }
  nav {
    margin-top: 30px;
  }
  `]
})
export class HeaderWithAuthComponent implements
  OnInit,
  OnDestroy {
  @Input() userData: AuthorizeUserResponse;
  @Input() currentFilePath: string;
  searchForm: FormGroup;
  private subSink: SubSink = new SubSink();
  folderId: string;

  constructor(
    private readonly store: Store<AppState>,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.subSink.sink =
      this.store.select((store) => store.Imagen.CurrentFolderId).subscribe((data: string) => this.folderId = data);
  }

  initForm(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(null, Validators.required)
    });
  }

  logout(): void {
    clearLocalStorage();
    this.router.navigate(["/"]);
  }

  onSubmit(): void {
    if (this.searchForm.invalid) {
      return;
    }
    const { search } = this.searchForm.value;
    if (typeof this.folderId !== undefined) {
      this.store.dispatch(new SearchInitiatedAction({ searchQuery: search, folderId: this.folderId }));
      this.store.dispatch(new OpenModalAction(ModalType.SEARCH_FILES));
    }
    else {
      const message: CustomAPIType = {
        Message: "Select album before searching",
        OperationType: OperationStatus.FAILED
      };
      this.store.dispatch(new WriteAPIMessageAction(message));
    }
    return;
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
