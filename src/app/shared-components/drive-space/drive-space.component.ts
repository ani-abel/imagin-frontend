import { Component, Input, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AvailableStorageSpaceResponse } from '../../store/models/imagen.model';
import { AppState } from '../../store/models/app.state';
import { ClearDriveSpaceAction } from '../../store/actions/imagen.actions';

@Component({
  selector: 'app-drive-space',
  templateUrl: './drive-space.component.html',
  styles: []
})
export class DriveSpaceComponent implements OnInit {
  @Input() driveSpace: AvailableStorageSpaceResponse;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.store.dispatch(new ClearDriveSpaceAction());
  }

}
