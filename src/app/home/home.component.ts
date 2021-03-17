import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { SubSink } from "subsink";
import { ImagenRootService } from '../imagen-root.service';
import { AuthorizeURLResponse } from '../store/models/imagen.model';
import { setToLocalStorage } from '../utils/shared.functions';
import { CloudProvider, LocalStorageKey } from '../utils/app.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit, OnDestroy {
  private subSink: SubSink = new SubSink();

  constructor(
    private readonly imagenRootSrv: ImagenRootService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    try {
      this.subSink.sink = this.activatedRoute.queryParams
        .pipe(
          map((res) => {
            return {
              Provider: res.provider,
              Code: res.code,
            };
          })
        )
        .subscribe((res: any) => {
          //?- Save the token to localStorage
          setToLocalStorage(LocalStorageKey.TOKEN, res.Code);
          if ((res.Provider as string)?.toUpperCase() === CloudProvider.GOOGLE) {
            this.router.navigate(["/auth"]);
          }
        });
    }
    catch (ex) {
      throw ex;
    }
  }

  authorizeUser(): void {
    try {
      this.subSink.sink =
        this.imagenRootSrv
          .getAuthorizationLink()
          .subscribe(
            (data: AuthorizeURLResponse) => {
              window.location.href = data.AuthURL;
            },
            (error) => {
              throw error;
            }
          );
    }
    catch (ex) {
      throw ex;
    }
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
