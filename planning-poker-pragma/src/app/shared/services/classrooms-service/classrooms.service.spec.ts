import { TestBed } from '@angular/core/testing';

import { ClassroomsService } from './classrooms.service';

describe('ClassroomsService', () => {
  let service: ClassroomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassroomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
