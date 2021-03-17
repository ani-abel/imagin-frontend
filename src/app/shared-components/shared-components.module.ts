import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { HeaderWithAuthComponent } from './header-with-auth/header-with-auth.component';
import { HeaderWithoutAuthComponent } from './header-without-auth/header-without-auth.component';
import { FooterComponent } from './footer/footer.component';
import { ImageGallerySlideshowComponent } from './image-gallery-slideshow/image-gallery-slideshow.component';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { AlbumWidgetComponent } from './album-widget/album-widget.component';
import { PhotoWidgetComponent } from './photo-widget/photo-widget.component';
import { NewAlbumComponent } from './new-album/new-album.component';
import { DriveSpaceComponent } from './drive-space/drive-space.component';
import { OpenOptionTabDirective } from './open-option-tab.directive';
import { SearchComponent } from './search/search.component';
import { NewFileComponent } from './new-file/new-file.component';
import { PhotoWidgetWithoutControlsComponent } from './photo-widget-without-controls/photo-widget-without-controls.component';
import { ShortenTextPipe } from './shorten-text.pipe';
import { LoaderComponent } from './loader/loader.component';
import { NoContentComponent } from './no-content/no-content.component';
import { SuccessMessageModalComponent } from './success-message-modal/success-message-modal.component';
import { ErrorMessageModalComponent } from './error-message-modal/error-message-modal.component';
import { ConvertToGigabytePipe } from './convert-to-gigabyte.pipe';
import { StripFilenamePrefixPipe } from './strip-filename-prefix.pipe';
import { ImageGalleryDisplayComponent } from './image-gallery-display/image-gallery-display.component';


@NgModule({
  declarations: [
    HeaderWithAuthComponent,
    HeaderWithoutAuthComponent,
    FooterComponent,
    ImageGallerySlideshowComponent,
    ImageGalleryComponent,
    AlbumWidgetComponent,
    PhotoWidgetComponent,
    NewAlbumComponent,
    DriveSpaceComponent,
    OpenOptionTabDirective,
    SearchComponent,
    NewFileComponent,
    PhotoWidgetWithoutControlsComponent,
    ShortenTextPipe,
    LoaderComponent,
    NoContentComponent,
    SuccessMessageModalComponent,
    ErrorMessageModalComponent,
    ConvertToGigabytePipe,
    StripFilenamePrefixPipe,
    ImageGalleryDisplayComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    HeaderWithAuthComponent,
    HeaderWithoutAuthComponent,
    FooterComponent,
    ImageGallerySlideshowComponent,
    ImageGalleryComponent,
    AlbumWidgetComponent,
    PhotoWidgetComponent,
    NewAlbumComponent,
    NewFileComponent,
    DriveSpaceComponent,
    PhotoWidgetWithoutControlsComponent,
    LoaderComponent,
    NoContentComponent,
    SuccessMessageModalComponent,
    ErrorMessageModalComponent,
    SearchComponent,
    ImageGalleryDisplayComponent,
    OpenOptionTabDirective,
    ShortenTextPipe,
    ConvertToGigabytePipe,
    StripFilenamePrefixPipe
  ],
})
export class SharedComponentsModule { }
