import { TestBed } from '@angular/core/testing';

import { LoadPhotosService } from './load-photos.service';

describe('LoadPhotosService', () => {
  let service: LoadPhotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadPhotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
