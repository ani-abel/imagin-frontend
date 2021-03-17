import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { getToken, removeEscapeCharacters } from '../utils/shared.functions';

@Injectable()
export class AppendGoogleCodeInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    try {
      if (/google/.test(req.url)) {
        const googleToken: string = getToken();
        if (googleToken) {
          const authReq = req.clone({
            headers: new HttpHeaders({
              //?- Using delimter "***" for Bearer token is b/c of the format of google access tokens which is structured like JSON
              Authorization: `Bearer***${removeEscapeCharacters(googleToken)}`,
            }),
          });

          return next.handle(authReq);
        }
      }
      return next.handle(req);
    } catch (ex) {
      throw ex;
    }
  }
}
