import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { AuthRoutesComponent } from './auth-routes/auth-routes.component';
import { DefaultRoutesComponent } from './default-routes/default-routes.component';
import { GoogleGuard } from './auth/google-auth.guard';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  {
    path: "home", component: DefaultRoutesComponent, children: [
      { path: "", component: HomeComponent, pathMatch: "full" }
    ]
  },
  {
    path: "auth", component: AuthRoutesComponent, canActivateChild: [GoogleGuard], children: [
      { path: "", redirectTo: "album-list", pathMatch: "full" },
      { path: "album-list", component: AlbumListComponent },
      { path: "photo-list/:album", component: PhotoListComponent },
    ]
  },
  { path: "**", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
