/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { MedidaService } from './medida.service';

describe('Service: Medida', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedidaService]
    });
  });

  it('should ...', inject([MedidaService], (service: MedidaService) => {
    expect(service).toBeTruthy();
  }));
});
