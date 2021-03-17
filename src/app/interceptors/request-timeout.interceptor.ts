import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, timeout } from "rxjs/operators";

@Injectable()
export class RequestTimeoutInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    try {
      if (/upload/.test(req.url) && req.method === "POST") {
        //Timeout the request to allow for time
        return next.handle(req).pipe(
          timeout(30000 * 50),
          catchError((err) => throwError(err))
        );
        // (30000 * 25) (25mins) would be the global default for example
      }
      return next.handle(req);
    } catch (ex) {
      throw ex;
    }
  }
}
