import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import {
  EmptyTrashInitiated,
  GetDriveSpaceInitiatedAction,
  ModalType,
  OpenModalAction
} from '../../store/actions/imagen.actions';
import { AppState } from '../../store/models/app.state';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="toolbar-section text-center">
        <ul class="no-margin">
            <li>
                <a class="cursor-pointer" id="empty-trash" title="EMPTY TRASH" (click)="emptyTrash()">
                    <i class="fa fa-trash-o"></i>
                </a>
            </li>
            <li>
                <a class="cursor-pointer" id="open-new-folder-modal" title="CREATE FOLDER" (click)="openCreateFolderModal()">
                    <i class="fa fa-folder-o"></i>
                </a>
            </li>
            <li>
                <a class="cursor-pointer" id="open-cloud-disk-drive-modal" title="DRIVE SPACE" (click)="openDriveSpaceModel()">
                    <i class="fa fa-server"></i>
                </a>
            </li>
        </ul>
    </footer>
  `,
  styles: []
})
export class FooterComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  emptyTrash(): void {
    this.store.dispatch(new EmptyTrashInitiated());
  }

  openDriveSpaceModel(): void {
    this.store.dispatch(new GetDriveSpaceInitiatedAction());
  }

  openCreateFolderModal(): void {
    this.store.dispatch(new OpenModalAction(ModalType.CREATE_NEW_ALBUM));
  }

}
