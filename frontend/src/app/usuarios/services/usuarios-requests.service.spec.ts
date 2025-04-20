import { TestBed } from '@angular/core/testing';

import { UsuariosRequestsService } from './usuarios-requests.service';

describe('UsuariosRequestsService', () => {
  let service: UsuariosRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
