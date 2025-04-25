/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { ModeloService } from './modelo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Asegúrate de importar HttpClientTestingModule

describe('ModeloService', () => {
  let service: ModeloService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Asegúrate de incluir HttpClientTestingModule en el TestBed
      providers: [ModeloService]
    });
    service = TestBed.inject(ModeloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});