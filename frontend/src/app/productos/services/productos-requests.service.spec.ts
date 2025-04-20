import { TestBed } from '@angular/core/testing';

import { ProductosRequestsService } from './productos-requests.service';

describe('ProductosRequestsService', () => {
  let service: ProductosRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
