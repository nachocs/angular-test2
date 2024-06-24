import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as PhotosActions from './photos.actions';
import { PhotosEffects } from './photos.effects';

describe('PhotosEffects', () => {
  let actions: Observable<Action>;
  let effects: PhotosEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        PhotosEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(PhotosEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: PhotosActions.initPhotos() });

      const expected = hot('-a-|', {
        a: PhotosActions.loadPhotosSuccess({ photos: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
