/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { vendedorService } from './vendedores.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('Service: Vendedores', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [vendedorService]
    });
  });

  it('should ...', inject([vendedorService], (service: vendedorService) => {
    expect(service).toBeTruthy();
  }));
});
