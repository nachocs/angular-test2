import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

const API_URL = 'https://jsonplaceholder.typicode.com/photos';

@Injectable({
  providedIn: 'root',
})
export class LoadPhotosService {
  constructor(private http: HttpClient) {}
  handleMap(res: any) {
    return res;
  }
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
  restGet(url: string): Observable<any> {
    return this.http.get(url).pipe(
      map((res: any) => this.handleMap(res)),
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }
  getAll(): Observable<any> {
    return this.restGet(API_URL);
  }
}
