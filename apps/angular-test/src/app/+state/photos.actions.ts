import { createAction, props } from '@ngrx/store';
import { PhotosEntity } from './photos.models';

export const initPhotos = createAction('[Photos Page] Init');

export const loadPhotosSuccess = createAction(
  '[Photos/API] Load Photos Success',
  props<{ photos: PhotosEntity[] }>()
);

export const loadPhotosFailure = createAction(
  '[Photos/API] Load Photos Failure',
  props<{ error: any }>()
);
