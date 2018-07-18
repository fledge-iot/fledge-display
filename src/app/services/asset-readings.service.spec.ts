import { TestBed, inject } from '@angular/core/testing';

import { AssetReadingsService } from './asset-readings.service';

describe('AssetReadingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssetReadingsService]
    });
  });

  it('should be created', inject([AssetReadingsService], (service: AssetReadingsService) => {
    expect(service).toBeTruthy();
  }));
});
