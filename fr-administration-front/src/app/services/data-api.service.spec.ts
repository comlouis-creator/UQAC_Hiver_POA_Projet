import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { DataApiService } from './data-api.service';

describe('DataApiService', () => {
  let service: DataApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[HttpClient, HttpHandler]
    });
    service = TestBed.inject(DataApiService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
