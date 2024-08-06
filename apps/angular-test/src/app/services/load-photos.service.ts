import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

const API_URL = 'https://nhan.nflow.dev.nuclent.com/v1/f/conversation';

const POST_MSG_URL = 'https://nhan.nflow.dev.nuclent.com/v1/f/addMessage';

@Injectable({
  providedIn: 'root',
})
export class LoadPhotosService {
  constructor(private http: HttpClient) {}
  handleMap(res: any) {
    return res.messages.map((x: any) => ({ ...x, ...{ id: x.guid } }));
  }
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
  restPost(url: string, body: any): Observable<any> {
    return this.http.post(url, body).pipe(
      map((res: any) => this.handleMap(res)),
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }
  getAll(): Observable<any> {
    return this.restPost(API_URL, null);
  }
  postMessage(message: string): Observable<any> {
    return this.http.post(POST_MSG_URL, { message }).pipe(
      catchError((err) => {
        return this.handleError(err);
      })
    );
  }
}
