import { TestBed } from '@angular/core/testing';

import { SubCommentService } from './sub-comment.service';

describe('SubCommentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubCommentService = TestBed.get(SubCommentService);
    expect(service).toBeTruthy();
  });
});
