import { TestBed } from '@angular/core/testing';

import { GetAllAuthorsService } from './get-all-authors.service';

describe('GetAllAuthorsService', () => {
  let service: GetAllAuthorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllAuthorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
