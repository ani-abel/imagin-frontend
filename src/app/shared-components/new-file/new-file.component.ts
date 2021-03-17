import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { SubSink } from 'subsink';
import { AppState } from '../../store/models/app.state';
import { UploadPictureInitiatedAction } from '../../store/actions/imagen.actions';
import {
  CloseModalAction,
  WriteAPIMessageAction
} from '../../store/actions/imagen.actions';
import {
  CustomAPIType,
  DEFAULT_FILE_SIZE,
  OperationStatus,
  TOTAL_FILE_ALLOWED_PER_UPLOAD
} from '../../store/models/imagen.model';

@Component({
  selector: 'app-new-file',
  templateUrl: './new-file.component.html',
  styles: []
})
export class NewFileComponent implements
  OnInit,
  AfterViewInit,
  OnDestroy {
  @ViewChild("fileSelector", { read: ElementRef }) fileSelector: ElementRef;
  selectedFiles: File[];
  currentFilePath$: Observable<string>;
  currentFolderId: string;
  private subSink: SubSink = new SubSink();

  constructor(
    private readonly store: Store<AppState>,
    private readonly changeDetectionRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.changeDetectionRef.detectChanges();
  }

  ngOnInit(): void {
    this.currentFilePath$ = this.store.select((store) => store.Imagen.CurrentFilePath);
    this.subSink.sink =
      this.store
        .select((store) => store.Imagen.CurrentFolderId)
        .subscribe((data: string) => this.currentFolderId = data);
  }

  closeModal(): void {
    this.store.dispatch(new CloseModalAction());
  }

  handleFiles(): void {
    const files: File[] = this.fileSelector.nativeElement.files;
    if (files?.length > TOTAL_FILE_ALLOWED_PER_UPLOAD) {
      //? Error Message
      const message: CustomAPIType = {
        Message: `Cannot upload more that ${TOTAL_FILE_ALLOWED_PER_UPLOAD} images at a time`,
        OperationType: OperationStatus.FAILED
      };
      this.store.dispatch(new WriteAPIMessageAction(message));
      return;
    }
    if (!this.checkFileType(files)) {
      //? Error message
      const message: CustomAPIType = {
        Message: "Only images can be uploaded",
        OperationType: OperationStatus.FAILED
      };
      this.store.dispatch(new WriteAPIMessageAction(message));
      return;
    }
    if (!this.checkFileSize(files)) {
      const message: CustomAPIType = {
        Message: "A file exceeds the limit of 5MB",
        OperationType: OperationStatus.FAILED
      };
      this.store.dispatch(new WriteAPIMessageAction(message));
      return;
    }
    this.selectedFiles = [...files];
  }

  uploadFiles(): void {
    if (typeof this.currentFolderId !== undefined) {
      this.store.dispatch(new UploadPictureInitiatedAction({ Files: this.selectedFiles, FolderId: this.currentFolderId }));
      this.selectedFiles = null;
    } else {
      const message: CustomAPIType = {
        Message: "No album was selected",
        OperationType: OperationStatus.FAILED
      };
      this.store.dispatch(new WriteAPIMessageAction(message));
    }
    return;
  }

  private checkFileSize(files: File[]): boolean {
    let areFilesValid: boolean = true;
    if (files?.length > 0) {
      for (const file of files) {
        if (file.size > DEFAULT_FILE_SIZE) {
          areFilesValid = false;
          break;
        }
      }
    }
    return areFilesValid;
  }

  private checkFileType(files: File[]): boolean {
    let areFilesValid: boolean = true;
    if (files?.length > 0) {
      for (const file of files) {
        if (!/image/.test(file.type as string)) {
          areFilesValid = false;
          break;
        }
      }
    }
    return areFilesValid;
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
