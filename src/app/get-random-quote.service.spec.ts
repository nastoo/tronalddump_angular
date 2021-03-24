import { TestBed } from '@angular/core/testing';

import { GetRandomQuoteService } from './get-random-quote.service';

describe('GetRandomQuoteService', () => {
  let service: GetRandomQuoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetRandomQuoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
