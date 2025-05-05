/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlanesVentaService } from './planesVenta.service';

describe('Service: PlanesVenta', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanesVentaService]
    });
  });

  it('should ...', inject([PlanesVentaService], (service: PlanesVentaService) => {
    expect(service).toBeTruthy();
  }));
});
