import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { LoadPhotosService } from './load-photos.service';

describe('LoadPhotosService', () => {
  let service: LoadPhotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        // ... other test providers
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(LoadPhotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
