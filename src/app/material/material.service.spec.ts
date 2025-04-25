/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { MaterialService } from './material.service';

describe('Service: Material', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialService]
    });
  });

  it('should ...', inject([MaterialService], (service: MaterialService) => {
    expect(service).toBeTruthy();
  }));
});
