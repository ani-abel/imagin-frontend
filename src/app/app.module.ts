import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { AuthRoutesComponent } from './auth-routes/auth-routes.component';
import { SharedComponentsModule } from './shared-components/shared-components.module';
import { DefaultRoutesComponent } from './default-routes/default-routes.component';
import { environment } from '../environments/environment';
import { ImagenReducer } from './store/reducers/imagen.reducer';
import { ImagenEffects } from './store/effects/imagen.effects';
import { AppendGoogleCodeInterceptor } from './interceptors/google-auth.interceptor';
import { RequestTimeoutInterceptor } from './interceptors/request-timeout.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlbumListComponent,
    PhotoListComponent,
    AuthRoutesComponent,
    DefaultRoutesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedComponentsModule,
    StoreModule.forRoot({
      Imagen: ImagenReducer
    }),
    EffectsModule.forRoot([ImagenEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestTimeoutInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppendGoogleCodeInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
