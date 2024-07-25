import { TestBed } from '@angular/core/testing';

import { FeesheadService } from './feeshead.service';

describe('FeesheadService', () => {
  let service: FeesheadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeesheadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
