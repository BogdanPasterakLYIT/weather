import { TestBed } from '@angular/core/testing';

import { TodaySiteService } from './today-site.service';

describe('TodaySiteService', () => {
  let service: TodaySiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodaySiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
