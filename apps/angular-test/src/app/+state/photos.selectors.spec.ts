import { PhotosEntity } from './photos.models';
import {
  PhotosPartialState,
  initialPhotosState,
  photosAdapter,
} from './photos.reducer';
import * as PhotosSelectors from './photos.selectors';

describe('Photos Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getPhotosId = (it: PhotosEntity) => it.id;
  const createPhotosEntity = (id: string, name = '') =>
    ({
      id,
      title: name || `name-${id}`,
    } as PhotosEntity);

  let state: PhotosPartialState;

  beforeEach(() => {
    state = {
      photos: photosAdapter.setAll(
        [
          createPhotosEntity('PRODUCT-AAA'),
          createPhotosEntity('PRODUCT-BBB'),
          createPhotosEntity('PRODUCT-CCC'),
        ],
        {
          ...initialPhotosState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Photos Selectors', () => {
    it('selectAllPhotos() should return the list of Photos', () => {
      const results = PhotosSelectors.selectAllPhotos(state);
      const selId = getPhotosId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = PhotosSelectors.selectEntity(state) as PhotosEntity;
      const selId = getPhotosId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectPhotosLoaded() should return the current "loaded" status', () => {
      const result = PhotosSelectors.selectPhotosLoaded(state);

      expect(result).toBe(true);
    });

    it('selectPhotosError() should return the current "error" state', () => {
      const result = PhotosSelectors.selectPhotosError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
