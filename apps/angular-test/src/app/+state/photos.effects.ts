import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap } from 'rxjs';
import { LoadPhotosService } from '../services/load-photos.service';
import * as PhotosActions from './photos.actions';

@Injectable()
export class PhotosEffects {
  constructor(
    private actions$: Actions,
    private service: LoadPhotosService,
    private http: HttpClient
  ) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhotosActions.initPhotos),
      switchMap(() => this.service.getAll()),
      switchMap((res: any) =>
        of(PhotosActions.loadPhotosSuccess({ photos: res }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(PhotosActions.loadPhotosFailure({ error }));
      })
    )
  );
}
