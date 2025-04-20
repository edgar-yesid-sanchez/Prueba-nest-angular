import { TestBed } from '@angular/core/testing';

import { AlertaGlobalService } from './alerta-global.service';

describe('AlertaGlobalService', () => {
  let service: AlertaGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertaGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
