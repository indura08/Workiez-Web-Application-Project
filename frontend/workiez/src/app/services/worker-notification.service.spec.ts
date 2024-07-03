import { TestBed } from '@angular/core/testing';

import { WorkerNotificationService } from './worker-notification.service';

describe('WorkerNotificationService', () => {
  let service: WorkerNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkerNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
