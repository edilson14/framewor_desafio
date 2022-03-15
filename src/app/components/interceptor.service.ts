import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private _messageService: SnackBarService,
  ) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    })
    const newRequest = req.clone({
      headers: httpHeaders
    })
    return next.handle(newRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        this._messageService.showMessage('Algo deu Errado');
        return throwError('')
      })

    );
  }
}

