import { TestBed } from '@angular/core/testing';

import { EmployeetaskService } from './employeetask.service';

describe('EmployeetaskService', () => {
  let service: EmployeetaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeetaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
