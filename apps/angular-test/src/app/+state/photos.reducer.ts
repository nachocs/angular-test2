import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as PhotosActions from './photos.actions';
import { PhotosEntity } from './photos.models';

export const PHOTOS_FEATURE_KEY = 'photos';

export interface PhotosState extends EntityState<PhotosEntity> {
  selectedId?: string | number; // which Photos record has been selected
  loaded: boolean; // has the Photos list been loaded
  error?: string | null; // last known error (if any)
}

export interface PhotosPartialState {
  readonly [PHOTOS_FEATURE_KEY]: PhotosState;
}

export const photosAdapter: EntityAdapter<PhotosEntity> =
  createEntityAdapter<PhotosEntity>();

export const initialPhotosState: PhotosState = photosAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialPhotosState,
  on(PhotosActions.initPhotos, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(PhotosActions.loadPhotosSuccess, (state, { photos }) =>
    photosAdapter.setAll(photos, { ...state, loaded: true })
  ),
  on(PhotosActions.loadPhotosFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function photosReducer(state: PhotosState | undefined, action: Action) {
  return reducer(state, action);
}
