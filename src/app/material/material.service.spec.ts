/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { MaterialService } from './material.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Material', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MaterialService]
    });
  });

  it('should ...', inject([MaterialService], (service: MaterialService) => {
    expect(service).toBeTruthy();
  }));
});
