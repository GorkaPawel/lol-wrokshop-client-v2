import { TestBed } from '@angular/core/testing';

import { ChampionsDataService } from './champions-data.service';

describe('ChampionsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChampionsDataService = TestBed.get(ChampionsDataService);
    expect(service).toBeTruthy();
  });
});
