import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpResponse,
} from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor() {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errMsg = "deu erro";
        // // Client Side Error
        if (error.error instanceof ErrorEvent) {
          errMsg = `Error: ${error.message}`;
        } else {
          errMsg = `Error Code: ${error.status},  Mensagem: ${error.error}`;
          if (error.status === 401) {
            errMsg = `${"Wrong user or password."}`;
          }
        }
        alert(errMsg);
        return throwError(error);
      })
    );
  }
}
