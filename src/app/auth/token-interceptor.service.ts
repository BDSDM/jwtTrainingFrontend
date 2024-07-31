import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('jwt');
    let modifiedReq = req;

    // Ajouter le token à l'en-tête Authorization si disponible
    if (token) {
      modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Passer la requête au handler suivant
    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error occurred:', error);
        // Vous pouvez gérer les erreurs génériques ici si nécessaire
        return throwError(error);
      })
    );
  }
}
