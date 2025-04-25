/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { vendedorService } from './vendedores.service';

describe('Service: Vendedores', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [vendedorService]
    });
  });

  it('should ...', inject([vendedorService], (service: vendedorService) => {
    expect(service).toBeTruthy();
  }));
});
