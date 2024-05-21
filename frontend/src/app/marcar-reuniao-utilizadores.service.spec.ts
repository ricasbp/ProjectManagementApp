import { TestBed } from '@angular/core/testing';

import { MarcarReuniaoUtilizadoresService } from './marcar-reuniao-utilizadores.service';

describe('MarcarReuniaoUtilizadoresService', () => {
  let service: MarcarReuniaoUtilizadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarcarReuniaoUtilizadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
