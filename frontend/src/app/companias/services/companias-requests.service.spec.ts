import { TestBed } from '@angular/core/testing';

import { CompaniasRequestsService } from './companias-requests.service';

describe('CompaniasRequestsService', () => {
  let service: CompaniasRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompaniasRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
