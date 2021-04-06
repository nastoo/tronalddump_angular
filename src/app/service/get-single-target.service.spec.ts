import { TestBed } from '@angular/core/testing';

import { GetSingleTargetService } from './get-single-target.service';

describe('GetSingleTargetService', () => {
  let service: GetSingleTargetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSingleTargetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
