import { TestBed } from '@angular/core/testing';

import { MaintainceService } from './maintenance.service';

describe('MaintainceService', () => {
  let service: MaintainceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintainceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
