import { TestBed } from '@angular/core/testing';

import { ChartSyncService } from './chart-sync.service';

describe('ChartSyncService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChartSyncService = TestBed.get(ChartSyncService);
    expect(service).toBeTruthy();
  });
});
