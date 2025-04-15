/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RutaserviceService } from './rutaservice.service';

describe('Service: Rutaservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RutaserviceService]
    });
  });

  it('should ...', inject([RutaserviceService], (service: RutaserviceService) => {
    expect(service).toBeTruthy();
  }));
});
