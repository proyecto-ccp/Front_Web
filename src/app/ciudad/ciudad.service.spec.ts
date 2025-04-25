/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CiudadService } from './ciudad.service';

describe('Service: Ciudad', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CiudadService]
    });
  });

  it('should ...', inject([CiudadService], (service: CiudadService) => {
    expect(service).toBeTruthy();
  }));
});
