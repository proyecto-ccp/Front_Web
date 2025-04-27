/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { CiudadService } from './ciudad.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Ciudad', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiudadService]
    });
  });

  it('should ...', inject([CiudadService], (service: CiudadService) => {
    expect(service).toBeTruthy();
  }));
});
